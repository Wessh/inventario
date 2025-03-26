import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {styles} from '../styles/itemCard.styles';
import {Item} from '../types/item';

type ItemCardProps = {
  item: Item;
  onPress: (item: Item) => void;
  onDelete: (item: Item) => void;
};

export const ItemCard = ({item, onPress, onDelete}: ItemCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.quantidadeContainer}>
          <Text style={styles.quantidade}>{item.quantidade}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.nome}</Text>
          <Text style={styles.itemDetails}>
            {item.marca} • {item.categoria}
          </Text>
        </View>
        <View style={styles.itemRight}>
          <View style={styles.actionsContainer}>
            <IconButton
              icon="pencil"
              size={20}
              iconColor="#4CAF50"
              onPress={() => onPress(item)}
              style={styles.actionButton}
            />
            <IconButton
              icon="delete"
              size={20}
              iconColor="#FF5252"
              onPress={() => onDelete(item)}
              style={styles.actionButton}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
