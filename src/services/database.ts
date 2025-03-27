import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Item } from '../types/item';

let db: SQLiteDatabase;

export const openDatabase = async (): Promise<SQLiteDatabase> => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase(
      { name: 'inventario.db', location: 'default' },
      (database) => {
        db = database;
        console.log('Conexão com o banco de dados estabelecida com sucesso!');

        db.transaction((tx) => {
          console.log('Tabela inventario, Ok!');
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS inventario (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              nome TEXT,
              marca TEXT,
              categoria TEXT,
              quantidade INTEGER
            );`,
            [],
            () => console.log('Tabela inventario, Ok!'),
            (_, error) => console.error('Erro ao criar tabela inventario:', error)
          );

          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS configuracoes (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              nome_aplicativo TEXT
            );`,
            [],
            () => console.log('Tabela configuracoes, Ok!'),
            (_, error) => console.error('Erro ao criar tabela configuracoes:', error)
          );

          tx.executeSql(
            `INSERT INTO configuracoes (nome_aplicativo) 
              SELECT 'Inventário'
              WHERE NOT EXISTS (SELECT 1 FROM configuracoes WHERE id = 1);`,
            [],
            () => console.log('Dados em configuracoes, Ok!'),
            (_, error) => console.error('Erro ao inserir dados em configuracoes:', error)
          );

        });
      },
      (error) => {
        console.error('Erro ao abrir o banco de dados:', error);
        reject(error);
      }
    );
  });
};

export const getNomeAplicativo = async () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT nome_aplicativo FROM configuracoes WHERE id = 1;', [], (_, results) => {
        resolve(results.rows.item(0).nome_aplicativo);
      });
    });
  });
};

export const updateConfig = async (nome_aplicativo: string) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('UPDATE configuracoes SET nome_aplicativo = ? WHERE id = 1;', [nome_aplicativo], (_, results) => {
        resolve(results);
      });
    });
  });
};

//Adiciona um item na tabela inventario
export const addItem = async (item: Item) => {
  console.log('Adicionando item:', item);
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO inventario (nome, marca, categoria, quantidade) VALUES (?, ?, ?, ?);',
          [item.nome, item.marca, item.categoria, item.quantidade],
          (_, results) => {
            console.log('Item adicionado com sucesso! ID:', results.insertId);
          },
          (_, error) => {
            console.error('Erro ao adicionar item:', error);
            console.log('Detalhes do erro:', error.message);
            throw error;
          }
        );
      },
      (error) => {
        console.error('Erro na transação ao adicionar item:', error);
        reject(error);
      },
      () => {
        console.log('Transação concluída com sucesso ao adicionar item');
        resolve(true);
      }
    );
  });
};

export const closeDatabase = async () => {
  await db.close();
};

//Retorna o banco de dados
export const getDb = () => {
  return db;
};
