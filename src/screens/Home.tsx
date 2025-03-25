import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Surface, Searchbar, useTheme, Divider, FAB} from 'react-native-paper';
import {styles} from '../styles/home.styles';
import {ItemCard} from '../components/ItemCard';

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Item = {
  id: string;
  nome: string;
  marca: string;
  categoria: string;
  quantidade: number;
};

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
  const [itens] = useState<Item[]>(itensIniciais);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Inventário',
    });
  }, [navigation]);

  const renderItem = ({item}: {item: Item}) => <ItemCard item={item} />;

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
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {}}
        onLongPress={() => {}}
      />
    </SafeAreaView>
  );
};
