import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-paper';
import {styles} from '../styles/home.styles';

export const Settings = () => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text variant="headlineMedium">Configurações</Text>
      </View>
    </SafeAreaView>
  );
};
