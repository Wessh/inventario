import React, {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Surface, TextInput, Button} from 'react-native-paper';
import {styles} from '../styles/home.styles';

export const Settings = () => {
  const [appTitle, setAppTitle] = useState('Inventário');

  const handleSaveTitle = () => {
    // TODO: Implementar a lógica para salvar o título
    console.log('Novo título:', appTitle);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Surface style={styles.card} elevation={2}>
          <Text variant="titleLarge" style={styles.settingsTitle}>
            Configurações do App
          </Text>
          <View style={styles.settingsContent}>
            <Text variant="bodyLarge" style={styles.settingsLabel}>
              Título do App
            </Text>
            <TextInput
              mode="outlined"
              value={appTitle}
              onChangeText={setAppTitle}
              style={styles.settingsInput}
              placeholder="Digite o título do app"
            />
            <Button
              mode="contained"
              onPress={handleSaveTitle}
              style={styles.saveButton}>
              Salvar
            </Button>
          </View>
        </Surface>
      </View>
    </SafeAreaView>
  );
};
