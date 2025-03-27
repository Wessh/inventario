import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Item } from '../types/item';

let db: SQLiteDatabase;

export const openDatabase = async (): Promise<SQLiteDatabase> => {
  console.log('[DB] Iniciando abertura do banco de dados');

  if (db) {
    console.log('[DB] Banco de dados já está aberto');
    return db;
  }

  return new Promise((resolve, reject) => {
    try {
      console.log('[DB] Tentando abrir banco de dados SQLite');
      SQLite.enablePromise(true);

      SQLite.openDatabase(
        {
          name: 'inventario.db',
          location: 'default',
        },
        (database: SQLiteDatabase) => {
          console.log('[DB] Callback de sucesso - banco aberto');
          db = database;

          database.transaction(
            (tx) => {
              console.log('[DB] Criando tabelas...');
              // Tabela inventario
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS inventario (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, marca TEXT, categoria TEXT, quantidade INTEGER);'
              );
              // Tabela configuracoes
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS configuracoes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome_aplicativo TEXT);'
              );
              // Inserir valor padrão
              tx.executeSql(
                "INSERT OR IGNORE INTO configuracoes (id, nome_aplicativo) VALUES (1, 'Inventário');"
              );
            },
            (error) => {
              console.error('[DB] Erro na transação:', error);
              reject(error);
            },
            () => {
              console.log('[DB] Transação completada com sucesso');
              resolve(database);
            }
          );
        },
        (error) => {
          console.error('[DB] Erro ao abrir banco:', error);
          reject(error);
        }
      );
    } catch (error) {
      console.error('[DB] Erro geral:', error);
      reject(error);
    }
  });
};

export const getNomeAplicativo = async () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT nome_aplicativo FROM configuracoes WHERE id = 1;', [], (_, results) => {
        console.log(`${results.rows.item(0).nome_aplicativo}`);
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
