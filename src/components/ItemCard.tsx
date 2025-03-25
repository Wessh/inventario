import React from 'react';
import {View, Text} from 'react-native';
import {List} from 'react-native-paper';
import {styles} from '../styles/home.styles';

type Item = {
  id: string;
  nome: string;
  marca: string;
  categoria: string;
  quantidade: number;
};

type ItemCardProps = {
  item: Item;
};

export const ItemCard = ({item}: ItemCardProps) => {
  return (
    <List.Item
      title={item.nome}
      description={`${item.marca} • ${item.categoria}`}
      left={props => <List.Icon {...props} icon="package-variant" />}
      right={props => (
        <View style={styles.itemRight}>
          <Text style={styles.quantidade}>{item.quantidade}</Text>
          <List.Icon {...props} icon="chevron-right" />
        </View>
      )}
    />
  );
};
