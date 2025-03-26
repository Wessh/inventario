import SQLite from 'react-native-sqlite-storage';

// Habilitar o SQLite
SQLite.enablePromise(true);

// Configuração do banco de dados
const database_name = 'Inventario.db';
const database_version = '1.0';
const database_displayname = 'Inventario SQLite Database';
const database_size = 200000;

const dbConfig = {
  name: database_name,
  version: database_version,
  displayName: database_displayname,
  size: database_size,
};

// Função para verificar e criar a tabela inventory
export const createTables = async (db: SQLite.SQLiteDatabase) => {
  try {
    // Criar tabela inventory
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS inventory (
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        marca TEXT NOT NULL,
        categoria TEXT NOT NULL,
        quantidade INTEGER NOT NULL
      )
    `);
    console.log('Tabela inventory verificada/criada com sucesso');

    // Criar tabela app_settings
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS app_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        app_name TEXT NOT NULL
      )
    `);
    console.log('Tabela app_settings verificada/criada com sucesso');
  } catch (error) {
    console.error('Erro ao verificar/criar tabelas:', error);
    throw error;
  }
};

// Função para abrir a conexão com o banco de dados
export const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabase(dbConfig);
    console.log('Conexão com o banco de dados estabelecida com sucesso');
    await createTables(db);
    return db;
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
    throw error;
  }
};

// Função para fechar a conexão com o banco de dados
export const closeDatabase = async (db: SQLite.SQLiteDatabase) => {
  try {
    await db.close();
    console.log('Conexão com o banco de dados fechada com sucesso');
  } catch (error) {
    console.error('Erro ao fechar o banco de dados:', error);
    throw error;
  }
};
