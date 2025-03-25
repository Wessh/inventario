import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, IconButton, Surface, Searchbar, useTheme} from 'react-native-paper';
import {styles} from '../styles/home.styles';

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Inventário',
    });
  }, [navigation]);

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
          <Text variant="headlineMedium" style={styles.text}>
            Lista de Itens
          </Text>
        </Surface>
      </View>
    </SafeAreaView>
  );
};
