import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Chip, IconButton} from 'react-native-paper';
import {styles} from '../styles/activeFilters.styles';

type ActiveFiltersProps = {
  filters: {
    categoria?: string;
    marca?: string;
    quantidade?: {
      valor: number;
      operador: 'maior' | 'menor';
    };
  };
  onRemoveFilter: (filterType: 'categoria' | 'marca' | 'quantidade') => void;
};

export const ActiveFilters = ({filters, onRemoveFilter}: ActiveFiltersProps) => {
  if (!filters.categoria && !filters.marca && !filters.quantidade) {
    return null;
  }

  return (
    <View style={styles.container}>
      {filters.categoria && (
        <Chip
          onClose={() => onRemoveFilter('categoria')}
          style={styles.chip}
          textStyle={styles.chipText}>
          Categoria: {filters.categoria}
        </Chip>
      )}
      {filters.marca && (
        <Chip
          onClose={() => onRemoveFilter('marca')}
          style={styles.chip}
          textStyle={styles.chipText}>
          Marca: {filters.marca}
        </Chip>
      )}
      {filters.quantidade && (
        <Chip
          onClose={() => onRemoveFilter('quantidade')}
          style={styles.chip}
          textStyle={styles.chipText}>
          Quantidade {filters.quantidade.operador === 'maior' ? '>' : '<'}{' '}
          {filters.quantidade.valor}
        </Chip>
      )}
    </View>
  );
};
