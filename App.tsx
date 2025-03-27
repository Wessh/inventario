/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider, MD3LightTheme, IconButton} from 'react-native-paper';
import {Home} from './src/screens/Home';
import {Settings} from './src/screens/Settings';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {openDatabase, getNomeAplicativo} from './src/services/database';
import { View, ActivityIndicator, Text } from 'react-native';
import { loadingStyles } from './src/styles/loading.styles';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1976D2',
    secondary: '#03DAC6',
    background: '#F5F5F5',
  },
};

const SettingsButton = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <IconButton
      icon="cog"
      iconColor={theme.colors.onPrimary}
      size={24}
      onPress={() => navigation.navigate('Settings')}
    />
  );
};


const App = () => {
  const [appName, setAppName] = useState('Inventário');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect iniciado');

    const initializeDb = async () => {
      console.log('initializeDb função iniciada');
      try {
        console.log('Tentando abrir banco de dados...');
        const dbInstance = await openDatabase();
        console.log('Banco de dados aberto com sucesso', dbInstance ? 'DB existe' : 'DB null');

        if (!dbInstance) {
          throw new Error('Banco de dados não foi inicializado corretamente');
        }

        console.log('Buscando nome do aplicativo...');
        const nome = await getNomeAplicativo();
        console.log('Nome retornado:', nome);

        setAppName(typeof nome === 'string' ? nome : 'Inventário');
      } catch (error) {
        console.error('Erro detalhado:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    initializeDb();
  }, []);

  console.log('Estado atual:', { isLoading, appName, error });

  if (isLoading) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size="large" color="#1976D2" />
        {error && (
          <Text style={loadingStyles.errorText}>{error}</Text>
        )}
      </View>
    );
  }

  console.log('Renderizando app completo');

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home" // Alterado para uma rota fixa
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.onPrimary,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: appName, // Usando appName apenas no título
                headerRight: () => <SettingsButton />,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                title: 'Configurações',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
