import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Item } from '../types/item';

let db: SQLiteDatabase;

export const openDatabase = async (): Promise<SQLiteDatabase> => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase(
      { name: 'inventario.db', location: 'default' },
      (database) => {
        db = database;
        db.transaction((tx) => {
          console.log('Tabela inventario criada com sucesso!');
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS inventario (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              nome TEXT,
              quantidade INTEGER
            );`,
            [],
            () => console.log('Tabela inventario criada com sucesso!'),
            (_, error) => console.error('Erro ao criar tabela inventario:', error)
          );

          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS configuracoes (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              nome_aplicativo TEXT
            );`,
            [],
            () => console.log('Tabela configuracoes criada com sucesso!'),
            (_, error) => console.error('Erro ao criar tabela configuracoes:', error)
          );

          tx.executeSql(
            `INSERT INTO configuracoes (nome_aplicativo) 
              SELECT 'Inventário'
              WHERE NOT EXISTS (SELECT 1 FROM configuracoes WHERE id = 1);`,
            [],
            () => console.log('Dados inseridos em configuracoes com sucesso!'),
            (_, error) => console.error('Erro ao inserir dados em configuracoes:', error)
          );

          tx.executeSql(
            'SELECT * FROM configuracoes;',
            [],
            (_, results) => {
              if (results.rows.length > 0) {
                console.log(results.rows.item(0).nome_aplicativo);
              }
              resolve(db);
            },
            (_, error) => {
              console.error('Erro ao selecionar dados de configuracoes:', error);
              reject(error);
            }
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

//Carrega todos os itens da tabela inventario
export const getItens = async () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM inventario;', [], (_, results) => {
        resolve(results);
      });
    });
  });
};

//Adiciona um item na tabela inventario
export const addItem = async (item: Item) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO inventario (nome, quantidade) VALUES (?, ?);', [item.nome, item.quantidade], (_, results) => {
        resolve(results);
      });
    });
  });
  };

//Atualiza um item na tabela inventario
export const updateItem = async (item: Item) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('UPDATE inventario SET nome = ?, quantidade = ? WHERE id = ?;', [item.nome, item.quantidade, item.id], (_, results) => {
        resolve(results);
      });
    });
  });
};

//Exclui um item da tabela inventario
export const deleteItem = async (id: number) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM inventario WHERE id = ?;', [id], (_, results) => {
        resolve(results);
      });
    });
  });
};

//Retorna o banco de dados
export const getDb = () => {
  return db;
};
