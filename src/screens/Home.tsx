import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Surface, Searchbar, useTheme, Divider, FAB, Portal, Dialog, TextInput, Button, Text} from 'react-native-paper';
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
  const [itens, setItens] = useState<Item[]>(itensIniciais);
  const [visible, setVisible] = useState(false);
  const [novoItem, setNovoItem] = useState<Omit<Item, 'id'>>({
    nome: '',
    marca: '',
    categoria: '',
    quantidade: 0,
  });

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Inventário',
    });
  }, [navigation]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleAdicionarItem = () => {
    if (novoItem.nome && novoItem.marca && novoItem.categoria && novoItem.quantidade > 0) {
      const novoId = (itens.length + 1).toString();
      setItens([...itens, {...novoItem, id: novoId}]);
      setNovoItem({
        nome: '',
        marca: '',
        categoria: '',
        quantidade: 0,
      });
      hideDialog();
    }
  };

  const incrementarQuantidade = () => {
    setNovoItem({...novoItem, quantidade: novoItem.quantidade + 1});
  };

  const decrementarQuantidade = () => {
    if (novoItem.quantidade > 0) {
      setNovoItem({...novoItem, quantidade: novoItem.quantidade - 1});
    }
  };

  const handleQuantidadeChange = (text: string) => {
    const numero = parseInt(text) || 0;
    if (numero >= 0) {
      setNovoItem({...novoItem, quantidade: numero});
    }
  };

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
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Adicionar Novo Item</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nome"
              value={novoItem.nome}
              onChangeText={text => setNovoItem({...novoItem, nome: text})}
              style={styles.dialogInput}
            />
            <TextInput
              label="Marca"
              value={novoItem.marca}
              onChangeText={text => setNovoItem({...novoItem, marca: text})}
              style={styles.dialogInput}
            />
            <TextInput
              label="Categoria"
              value={novoItem.categoria}
              onChangeText={text => setNovoItem({...novoItem, categoria: text})}
              style={styles.dialogInput}
            />
            <View style={styles.quantidadeContainer}>
              <Text style={styles.quantidadeLabel}>Quantidade</Text>
              <View style={[styles.quantidadeControls, {backgroundColor: theme.colors.surfaceVariant}]}>
                <IconButton
                  icon="minus"
                  size={24}
                  onPress={decrementarQuantidade}
                  disabled={novoItem.quantidade === 0}
                  style={[styles.quantidadeButton, {backgroundColor: theme.colors.surface}]}
                  iconColor={novoItem.quantidade === 0 ? theme.colors.onSurfaceDisabled : theme.colors.primary}
                />
                <TextInput
                  value={novoItem.quantidade.toString()}
                  onChangeText={handleQuantidadeChange}
                  keyboardType="numeric"
                  style={[styles.quantidadeInput, {color: theme.colors.primary}]}
                  dense
                  mode="flat"
                  underlineStyle={{display: 'none'}}
                />
                <IconButton
                  icon="plus"
                  size={24}
                  onPress={incrementarQuantidade}
                  style={[styles.quantidadeButton, {backgroundColor: theme.colors.surface}]}
                  iconColor={theme.colors.primary}
                />
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button onPress={handleAdicionarItem}>Adicionar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showDialog}
      />
    </SafeAreaView>
  );
};
