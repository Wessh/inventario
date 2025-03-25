/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider, MD3LightTheme, IconButton} from 'react-native-paper';
import {Home} from './src/screens/Home';
import {Settings} from './src/screens/Settings';

const Stack = createNativeStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1976D2',
    secondary: '#03DAC6',
    background: '#F5F5F5',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.onPrimary,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => (
                <IconButton
                  icon="cog"
                  iconColor={theme.colors.onPrimary}
                  size={24}
                  onPress={() => {}}
                  style={{marginRight: 8}}
                />
              ),
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
