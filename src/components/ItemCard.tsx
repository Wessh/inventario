import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/home.styles';
import {Item} from '../types/item';

type ItemCardProps = {
  item: Item;
  onPress: (item: Item) => void;
};

export const ItemCard = ({item, onPress}: ItemCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.nome}</Text>
          <Text style={styles.itemDetails}>
            {item.marca} • {item.categoria}
          </Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.quantidade}>{item.quantidade}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
