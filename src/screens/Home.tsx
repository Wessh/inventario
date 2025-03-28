/**
 * @fileoverview Tela principal do aplicativo de inventário
 * Para documentação detalhada, veja: ../docs/Home.docs.ts
 */
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Surface, Searchbar, useTheme, Divider, FAB} from 'react-native-paper';
import {styles} from '../styles/home.styles';
import {ItemCard} from '../components/ItemCard';
import {AddItemDialog} from '../components/AddItemDialog';
import {EditItemDialog} from '../components/EditItemDialog';
import {FilterDialog} from '../components/FilterDialog';
import {ActiveFilters} from '../components/ActiveFilters';
import {Item} from '../types/item';
import {getItems, addItem, updateItem, deleteItem, findSimilarItem} from '../services/database'; // Adicione este import

const EmptyListComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>Não possui itens registrados</Text>
  </View>
);

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
 * Carrega os itens do banco de dados.
 * @async
 * @function carregarItens
 * @returns {Promise<void>}
 */

/**
 * Adiciona um novo item ao inventário.
 * Se encontrar um item similar, oferece opção de somar quantidades.
 * @async
 * @function handleAdicionarItem
 * @param {Omit<Item, 'id'>} novoItem - Dados do novo item
 */

/**
 * Atualiza um item existente no inventário.
 * @async
 * @function handleEditarItem
 * @param {Item} itemEditado - Item com dados atualizados
 */

/**
 * Exclui um item do inventário após confirmação.
 * @async
 * @function handleExcluirItem
 * @param {Item} item - Item a ser excluído
 */

/**
 * Abre o diálogo de edição com o item selecionado.
 * @function handleAbrirEdicao
 * @param {Item} item - Item a ser editado
 */

/**
 * Aplica novos filtros à lista de itens.
 * @function handleAplicarFiltros
 * @param {Object} novosFiltros - Novos filtros a serem aplicados
 */

/**
 * Remove um filtro específico.
 * @function handleRemoverFiltro
 * @param {'categoria' | 'marca' | 'quantidade'} filterType - Tipo do filtro a ser removido
 */

/**
 * Retorna lista de categorias únicas dos itens.
 * @function getCategorias
 * @returns {string[]} Lista de categorias
 */

/**
 * Retorna lista de marcas únicas dos itens.
 * @function getMarcas
 * @returns {string[]} Lista de marcas
 */

/**
 * Filtra os itens baseado na pesquisa e filtros ativos.
 * @function getItemsFiltrados
 * @returns {Item[]} Lista de itens filtrados
 */

/**
 * Renderiza um item da lista.
 * @function renderItem
 * @param {Object} params - Parâmetros do item
 * @param {Item} params.item - Item a ser renderizado
 * @returns {JSX.Element} Componente ItemCard
 */
export const Home = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]); // Inicialize com array vazio
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [filters, setFilters] = useState<{
    categoria?: string;
    marca?: string;
    quantidade?: {
      valor: number;
      operador: 'maior' | 'menor';
    };
  }>({});

  const carregarItens = async () => {
    try {
      console.log('Carregando itens do banco de dados...');
      const itensCarregados = await getItems();
      console.log('Itens carregados:', itensCarregados);
      setItems(itensCarregados as Item[]);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    }
  };

  useEffect(() => {
    carregarItens();
  }, []);

  const handleAdicionarItem = async (novoItem: Omit<Item, 'id'>) => {
    try {
      // Verifica se já existe um item similar
      const itemExistente = await findSimilarItem(
        novoItem.nome,
        novoItem.marca,
        novoItem.categoria
      );

      if (itemExistente) {
        Alert.alert(
          'Item Existente',
          `Já existe um item "${itemExistente.nome}" com a mesma marca e categoria. Deseja somar a quantidade?`,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Somar',
              onPress: async () => {
                const itemAtualizado: Item = {
                  ...itemExistente,
                  quantidade: itemExistente.quantidade + novoItem.quantidade,
                };

                await updateItem(itemAtualizado);
                await carregarItens();
                setAddDialogVisible(false);
              },
            },
          ]
        );
        return;
      }

      // Se não existe item similar, adiciona normalmente
      await addItem(novoItem);
      await carregarItens();
      setAddDialogVisible(false);
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o item');
    }
  };

  const handleEditarItem = async (itemEditado: Item) => {
    try {
      await updateItem(itemEditado);
      await carregarItens(); // Reusa a mesma função de carregar itens
      setEditDialogVisible(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Erro ao editar item:', error);
    }
  };

  const handleExcluirItem = async (item: Item) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir o item "${item.nome}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!item.id) {
                throw new Error('Item sem ID válido');
              }

              console.log('Iniciando exclusão do item:', item.id);
              await deleteItem(item.id);
              console.log('Item excluído com sucesso');

              await carregarItens();
            } catch (error) {
              console.error('Erro ao excluir item:', error);
              Alert.alert('Erro', 'Não foi possível excluir o item');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleAbrirEdicao = (item: Item) => {
    setSelectedItem(item);
    setEditDialogVisible(true);
  };

  const handleAplicarFiltros = (novosFiltros: typeof filters) => {
    setFilters(novosFiltros);
  };

  const handleRemoverFiltro = (filterType: 'categoria' | 'marca' | 'quantidade') => {
    setFilters(prev => {
      const newFilters = {...prev};
      delete newFilters[filterType];
      return newFilters;
    });
  };

  const getCategorias = () => {
    return Array.from(new Set(items.map(item => item.categoria)));
  };

  const getMarcas = () => {
    return Array.from(new Set(items.map(item => item.marca)));
  };

  const getItemsFiltrados = () => {
    return items.filter(item => {
      // Aplicar busca por texto
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          item.nome.toLowerCase().includes(searchLower) ||
          item.marca.toLowerCase().includes(searchLower) ||
          item.categoria.toLowerCase().includes(searchLower);

        if (!matchesSearch) {
          return false;
        }
      }

      // Aplicar filtros existentes
      if (filters.categoria && item.categoria !== filters.categoria) {
        return false;
      }
      if (filters.marca && item.marca !== filters.marca) {
        return false;
      }
      if (filters.quantidade) {
        const {valor, operador} = filters.quantidade;
        if (operador === 'maior' && item.quantidade <= valor) {
          return false;
        }
        if (operador === 'menor' && item.quantidade >= valor) {
          return false;
        }
      }
      return true;
    });
  };

  const renderItem = ({item}: {item: Item}) => (
    <ItemCard
      item={item}
      onPress={handleAbrirEdicao}
      onDelete={handleExcluirItem}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <Searchbar
            placeholder="Pesquisar item"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor={theme.colors.primary}
            placeholderTextColor="#757575"
          />
          <IconButton
            icon="filter-variant"
            iconColor={theme.colors.primary}
            size={24}
            onPress={() => setFilterDialogVisible(true)}
            style={styles.filterButton}
          />
        </View>
        <ActiveFilters filters={filters} onRemoveFilter={handleRemoverFiltro} />
      </View>
      <View style={styles.content}>
        <Surface style={styles.card} elevation={2}>
          <FlatList
            data={getItemsFiltrados()}
            renderItem={renderItem}
            keyExtractor={item => item.id?.toString() || ''}
            ItemSeparatorComponent={() => <Divider />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={EmptyListComponent}
          />
        </Surface>
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setAddDialogVisible(true)}
      />
      <AddItemDialog
        visible={addDialogVisible}
        onDismiss={() => setAddDialogVisible(false)}
        onAdd={handleAdicionarItem}
      />
      <EditItemDialog
        visible={editDialogVisible}
        onDismiss={() => {
          setEditDialogVisible(false);
          setSelectedItem(null);
        }}
        onEdit={handleEditarItem}
        item={selectedItem}
      />
      <FilterDialog
        visible={filterDialogVisible}
        onDismiss={() => setFilterDialogVisible(false)}
        onApply={handleAplicarFiltros}
        categorias={getCategorias()}
        marcas={getMarcas()}
      />
    </SafeAreaView>
  );
};
