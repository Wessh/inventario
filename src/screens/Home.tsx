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



const itensIniciais: Item[] = [
  {id: '1', nome: 'Notebook Dell', marca: 'Dell', categoria: 'Eletrônicos', quantidade: 5},
  {id: '2', nome: 'Mouse Wireless', marca: 'Logitech', categoria: 'Periféricos', quantidade: 12},
  {id: '3', nome: 'Monitor 24"', marca: 'LG', categoria: 'Eletrônicos', quantidade: 8},
  {id: '4', nome: 'Teclado Mecânico', marca: 'Razer', categoria: 'Periféricos', quantidade: 15},
  {id: '5', nome: 'Impressora', marca: 'HP', categoria: 'Impressão', quantidade: 3},
];

const EmptyListComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>Não possui itens registrados</Text>
  </View>
);

export const Home = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>(itensIniciais);
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

  useEffect(() => {
    //To-Do: Carregar itens do banco de dados
  },[]);

  const handleAdicionarItem = (novoItem: Omit<Item, 'id'>) => {
    const novoId = (items.length + 1).toString();
    setItems([...items, {...novoItem, id: novoId}]);
    setAddDialogVisible(false);
  };

  const handleEditarItem = (itemEditado: Item) => {
    setItems(items.map(item => (item.id === itemEditado.id ? itemEditado : item)));
    setEditDialogVisible(false);
    setSelectedItem(null);
  };

  const handleExcluirItem = (item: Item) => {
    setItems(items.filter(i => i.id !== item.id));
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
            keyExtractor={item => item.id}
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
