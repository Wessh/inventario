import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

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

export const updateConfig = async (nome_aplicativo: string) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('UPDATE configuracoes SET nome_aplicativo = ? WHERE id = 1;', [nome_aplicativo], (_, results) => {
        resolve(results);
      });
    });
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
export const getDb = () => {
  return db;
};
