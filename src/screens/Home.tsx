import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Surface, Searchbar, useTheme, Divider, FAB} from 'react-native-paper';
import {styles} from '../styles/home.styles';
import {ItemCard} from '../components/ItemCard';
import {AddItemDialog} from '../components/AddItemDialog';
import {EditItemDialog} from '../components/EditItemDialog';
import {Item} from '../types/item';

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const itensIniciais: Item[] = [
  {id: '1', nome: 'Notebook Dell', marca: 'Dell', categoria: 'Eletrônicos', quantidade: 5},
  {id: '2', nome: 'Mouse Wireless', marca: 'Logitech', categoria: 'Periféricos', quantidade: 12},
  {id: '3', nome: 'Monitor 24"', marca: 'LG', categoria: 'Eletrônicos', quantidade: 8},
  {id: '4', nome: 'Teclado Mecânico', marca: 'Razer', categoria: 'Periféricos', quantidade: 15},
  {id: '5', nome: 'Impressora', marca: 'HP', categoria: 'Impressão', quantidade: 3},
];

export const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [itens, setItens] = useState<Item[]>(itensIniciais);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<Item | null>(null);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Inventário',
    });
  }, [navigation]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const showEditDialog = (item: Item) => {
    setItemSelecionado(item);
    setEditVisible(true);
  };
  const hideEditDialog = () => {
    setItemSelecionado(null);
    setEditVisible(false);
  };

  const handleAdicionarItem = (novoItem: Omit<Item, 'id'>) => {
    const novoId = (itens.length + 1).toString();
    setItens([...itens, {...novoItem, id: novoId}]);
    hideDialog();
  };

  const handleEditarItem = (itemEditado: Item) => {
    setItens(itens.map(item => (item.id === itemEditado.id ? itemEditado : item)));
    hideEditDialog();
  };

  const handleExcluirItem = (item: Item) => {
    setItens(itens.filter(i => i.id !== item.id));
  };

  const renderItem = ({item}: {item: Item}) => (
    <ItemCard
      item={item}
      onPress={showEditDialog}
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
            onPress={() => {}}
            style={styles.filterButton}
          />
        </View>
      </View>
      <View style={styles.content}>
        <Surface style={styles.card} elevation={2}>
          <FlatList
            data={itens}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Divider />}
            contentContainerStyle={styles.listContent}
          />
        </Surface>
      </View>
      <AddItemDialog
        visible={visible}
        onDismiss={hideDialog}
        onAdd={handleAdicionarItem}
      />
      <EditItemDialog
        visible={editVisible}
        onDismiss={hideEditDialog}
        onEdit={handleEditarItem}
        item={itemSelecionado}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showDialog}
      />
    </SafeAreaView>
  );
};
