/**
 * @fileoverview Documentação do componente Home
 * Contém a documentação detalhada de todos os componentes, estados e funções da tela Home
 */

/**
 * Componente principal da tela Home do aplicativo de inventário.
 * Gerencia a lista de itens, filtros, pesquisa e operações CRUD.
 *
 * @component Home
 */

/**
 * Estados do componente:
 * @property {string} searchQuery - Texto de pesquisa
 * @property {Item[]} items - Lista de itens do inventário
 * @property {boolean} addDialogVisible - Controla visibilidade do diálogo de adição
 * @property {boolean} editDialogVisible - Controla visibilidade do diálogo de edição
 * @property {boolean} filterDialogVisible - Controla visibilidade do diálogo de filtros
 * @property {Item|null} selectedItem - Item selecionado para edição
 * @property {Object} filters - Filtros ativos
 */

/**
 * Funções do componente:
 */

/**
 * @function carregarItens
 * @async
 * @description Carrega os itens do banco de dados.
 * @returns {Promise<void>}
 */

/**
 * @function handleAdicionarItem
 * @async
 * @description Adiciona um novo item ao inventário. Se encontrar um item similar,
 * oferece opção de somar quantidades.
 * @param {Omit<Item, 'id'>} novoItem - Dados do novo item
 */

/**
 * @function handleEditarItem
 * @async
 * @description Atualiza um item existente no inventário.
 * @param {Item} itemEditado - Item com dados atualizados
 */

/**
 * @function handleExcluirItem
 * @async
 * @description Exclui um item do inventário após confirmação.
 * @param {Item} item - Item a ser excluído
 */

/**
 * @function handleAbrirEdicao
 * @description Abre o diálogo de edição com o item selecionado.
 * @param {Item} item - Item a ser editado
 */

/**
 * @function handleAplicarFiltros
 * @description Aplica novos filtros à lista de itens.
 * @param {Object} novosFiltros - Novos filtros a serem aplicados
 */

/**
 * @function handleRemoverFiltro
 * @description Remove um filtro específico.
 * @param {'categoria' | 'marca' | 'quantidade'} filterType - Tipo do filtro a ser removido
 */

/**
 * @function getCategorias
 * @description Retorna lista de categorias únicas dos itens.
 * @returns {string[]} Lista de categorias
 */

/**
 * @function getMarcas
 * @description Retorna lista de marcas únicas dos itens.
 * @returns {string[]} Lista de marcas
 */

/**
 * @function getItemsFiltrados
 * @description Filtra os itens baseado na pesquisa e filtros ativos.
 * @returns {Item[]} Lista de itens filtrados
 */

/**
 * @function renderItem
 * @description Renderiza um item da lista.
 * @param {Object} params - Parâmetros do item
 * @param {Item} params.item - Item a ser renderizado
 * @returns {JSX.Element} Componente ItemCard
 */
