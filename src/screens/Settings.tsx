import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Surface, TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles/home.styles';
import {getNomeAplicativo, updateConfig} from '../services/database';
import RNRestart from 'react-native-restart';

export const Settings = () => {
  const navigation = useNavigation();
  const [appTitle, setAppTitle] = useState('Inventário');

  useEffect(() => {
    getNomeAplicativo().then((nome) => {
      setAppTitle(nome as string);
    });
  }, []);

  const handleSaveTitle = async () => {
    try {
      await updateConfig(appTitle);
      console.log('Novo título salvo:', appTitle);

      Alert.alert(
        'Configurações Salvas',
        'Deseja reiniciar o aplicativo agora para aplicar as alterações?',
        [
          {
            text: 'Não',
            style: 'cancel',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'Sim',
            onPress: () => {
              // Reinicia o aplicativo
              RNRestart.Restart();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      Alert.alert(
        'Erro',
        'Não foi possível salvar as configurações.',
        [{text: 'OK'}]
      );
    }
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
