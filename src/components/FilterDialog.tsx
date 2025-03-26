import React, {useState} from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {styles} from '../styles/filterDialog.styles';

type FilterDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  onApply: (filters: {
    categoria?: string;
    marca?: string;
    quantidade?: {
      valor: number;
      operador: 'maior' | 'menor';
    };
  }) => void;
  categorias: string[];
  marcas: string[];
};

export const FilterDialog = ({
  visible,
  onDismiss,
  onApply,
  categorias,
  marcas,
}: FilterDialogProps) => {
  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [operadorQuantidade, setOperadorQuantidade] = useState<'maior' | 'menor'>(
    'maior',
  );

  const handleApply = () => {
    const filters: {
      categoria?: string;
      marca?: string;
      quantidade?: {
        valor: number;
        operador: 'maior' | 'menor';
      };
    } = {};

    if (categoria) {
      filters.categoria = categoria;
    }

    if (marca) {
      filters.marca = marca;
    }

    if (quantidade) {
      filters.quantidade = {
        valor: Number(quantidade),
        operador: operadorQuantidade,
      };
    }

    onApply(filters);
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      transparent
      animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtrar Itens</Text>
          <View style={styles.modalBody}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.categoriaContainer}>
              {categorias.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoriaButton,
                    categoria === cat && styles.categoriaButtonSelected,
                  ]}
                  onPress={() => setCategoria(cat)}>
                  <Text
                    style={[
                      styles.categoriaButtonText,
                      categoria === cat && styles.categoriaButtonTextSelected,
                    ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Marca</Text>
            <View style={styles.marcaContainer}>
              {marcas.map(m => (
                <TouchableOpacity
                  key={m}
                  style={[
                    styles.marcaButton,
                    marca === m && styles.marcaButtonSelected,
                  ]}
                  onPress={() => setMarca(m)}>
                  <Text
                    style={[
                      styles.marcaButtonText,
                      marca === m && styles.marcaButtonTextSelected,
                    ]}>
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Quantidade</Text>
            <View style={styles.quantidadeContainer}>
              <View style={styles.quantidadeInputContainer}>
                <TextInput
                  mode="outlined"
                  keyboardType="numeric"
                  value={quantidade}
                  onChangeText={setQuantidade}
                  placeholder="Digite a quantidade"
                  style={styles.quantidadeInput}
                />
                <View style={styles.operadorContainer}>
                  <TouchableOpacity
                    style={[
                      styles.operadorButton,
                      operadorQuantidade === 'maior' &&
                        styles.operadorButtonSelected,
                    ]}
                    onPress={() => setOperadorQuantidade('maior')}>
                    <Text
                      style={[
                        styles.operadorButtonText,
                        operadorQuantidade === 'maior' &&
                          styles.operadorButtonTextSelected,
                      ]}>
                      Maior que
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.operadorButton,
                      operadorQuantidade === 'menor' &&
                        styles.operadorButtonSelected,
                    ]}
                    onPress={() => setOperadorQuantidade('menor')}>
                    <Text
                      style={[
                        styles.operadorButtonText,
                        operadorQuantidade === 'menor' &&
                          styles.operadorButtonTextSelected,
                      ]}>
                      Menor que
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.modalFooter}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              style={styles.cancelButton}>
              Cancelar
            </Button>
            <Button mode="contained" onPress={handleApply}>
              Aplicar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
