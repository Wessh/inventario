/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Surface, Searchbar, useTheme, Divider, FAB} from 'react-native-paper';
import {styles} from '../styles/home.styles';
import {ItemCard} from '../components/ItemCard';
import {AddItemDialog} from '../components/AddItemDialog';
import {EditItemDialog} from '../components/EditItemDialog';
import {FilterDialog} from '../components/FilterDialog';
import {ActiveFilters} from '../components/ActiveFilters';
import {Item} from '../types/item';
import {getItems, addItem, updateItem, deleteItem} from '../services/database'; // Adicione este import

const EmptyListComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>Não possui itens registrados</Text>
  </View>
);

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
      await addItem(novoItem);
      await carregarItens(); // Recarrega a lista após adicionar
      setAddDialogVisible(false);
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
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
    try {
      if (item.id !== undefined) {
        await deleteItem(item.id);
      } else {
        console.error('Erro: O item não possui um ID válido.');
      }
      const itensAtualizados = await getItems();
      setItems(itensAtualizados as Item[]);
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
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
