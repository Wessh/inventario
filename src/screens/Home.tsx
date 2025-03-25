import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Surface, Searchbar, useTheme, List, Divider, FAB} from 'react-native-paper';
import {styles} from '../styles/home.styles';

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
};

const itensIniciais: Item[] = [
  {id: '1', nome: 'Notebook Dell', marca: 'Dell', categoria: 'Eletrônicos'},
  {id: '2', nome: 'Mouse Wireless', marca: 'Logitech', categoria: 'Periféricos'},
  {id: '3', nome: 'Monitor 24"', marca: 'LG', categoria: 'Eletrônicos'},
  {id: '4', nome: 'Teclado Mecânico', marca: 'Razer', categoria: 'Periféricos'},
  {id: '5', nome: 'Impressora', marca: 'HP', categoria: 'Impressão'},
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

  const renderItem = ({item}: {item: Item}) => (
    <List.Item
      title={item.nome}
      description={`${item.marca} • ${item.categoria}`}
      left={props => <List.Icon {...props} icon="package-variant" />}
      right={props => <List.Icon {...props} icon="chevron-right" />}
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
