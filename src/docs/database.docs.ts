/**
 * @fileoverview Documentação do serviço de banco de dados
 * Contém a documentação detalhada de todas as operações do banco de dados SQLite
 */

/**
 * Variáveis globais:
 * @property {SQLiteDatabase} db - Instância global do banco de dados
 */

/**
 * Funções do banco de dados:
 */

/**
 * @function openDatabase
 * @async
 * @description Inicializa e abre a conexão com o banco de dados SQLite.
 * Cria as tabelas necessárias se não existirem.
 * @returns {Promise<SQLiteDatabase>} Instância do banco de dados
 */

/**
 * @function getNomeAplicativo
 * @async
 * @description Recupera o nome do aplicativo da tabela de configurações
 * @returns {Promise<string>} Nome do aplicativo
 */

/**
 * @function updateConfig
 * @async
 * @description Atualiza o nome do aplicativo na tabela de configurações
 * @param {string} nome_aplicativo - Novo nome do aplicativo
 * @returns {Promise<any>} Resultado da operação
 */

/**
 * @function addItem
 * @async
 * @description Adiciona um novo item na tabela de inventário
 * @param {Item} item - Item a ser adicionado
 * @returns {Promise<boolean>} Indica se a operação foi bem-sucedida
 */

/**
 * @function getItems
 * @async
 * @description Recupera todos os itens do inventário
 * @returns {Promise<Item[]>} Lista de itens
 */

/**
 * @function deleteItem
 * @async
 * @description Remove um item do inventário pelo ID
 * @param {number} id - ID do item a ser removido
 * @returns {Promise<boolean>} Indica se a operação foi bem-sucedida
 */

/**
 * @function updateItem
 * @async
 * @description Atualiza um item existente no inventário
 * @param {Item} item - Item com os dados atualizados
 * @returns {Promise<boolean>} Indica se a operação foi bem-sucedida
 */

/**
 * @function findSimilarItem
 * @async
 * @description Busca um item similar baseado no nome, marca e categoria
 * Ignora diferenças de maiúsculas/minúsculas e espaços extras
 * @param {string} nome - Nome do item
 * @param {string} marca - Marca do item
 * @param {string} categoria - Categoria do item
 * @returns {Promise<Item | null>} Item encontrado ou null
 */

/**
 * @function closeDatabase
 * @async
 * @description Fecha a conexão com o banco de dados
 * @returns {Promise<void>}
 */

/**
 * @function getDb
 * @description Retorna a instância atual do banco de dados
 * @returns {SQLiteDatabase} Instância do banco de dados
 */

/**
 * Estrutura do banco de dados:
 *
 * Tabela: inventario
 * - id (INTEGER PRIMARY KEY AUTOINCREMENT)
 * - nome (TEXT)
 * - marca (TEXT)
 * - categoria (TEXT)
 * - quantidade (INTEGER)
 *
 * Tabela: configuracoes
 * - id (INTEGER PRIMARY KEY AUTOINCREMENT)
 * - nome_aplicativo (TEXT)
 */
