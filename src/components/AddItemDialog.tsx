import React from 'react';
import {View, Modal, TextInput, TouchableOpacity, Text} from 'react-native';
import {styles} from '../styles/addItemDialog.styles';

type Item = {
  id: string;
  nome: string;
  marca: string;
  categoria: string;
  quantidade: number;
};

type AddItemDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  onAdd: (item: Omit<Item, 'id'>) => void;
};

export const AddItemDialog = ({visible, onDismiss, onAdd}: AddItemDialogProps) => {
  const [novoItem, setNovoItem] = React.useState<Omit<Item, 'id'>>({
    nome: '',
    marca: '',
    categoria: '',
    quantidade: 0,
  });

  const incrementarQuantidade = () => {
    setNovoItem({...novoItem, quantidade: novoItem.quantidade + 1});
  };

  const decrementarQuantidade = () => {
    if (novoItem.quantidade > 0) {
      setNovoItem({...novoItem, quantidade: novoItem.quantidade - 1});
    }
  };

  const handleQuantidadeChange = (text: string) => {
    const numero = parseInt(text) || 0;
    if (numero >= 0) {
      setNovoItem({...novoItem, quantidade: numero});
    }
  };

  const handleAdd = () => {
    if (novoItem.nome && novoItem.marca && novoItem.categoria && novoItem.quantidade > 0) {
      onAdd(novoItem);
      setNovoItem({
        nome: '',
        marca: '',
        categoria: '',
        quantidade: 0,
      });
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Adicionar Novo Item</Text>
          <View style={styles.modalBody}>
            <TextInput
              placeholder="Nome"
              value={novoItem.nome}
              onChangeText={text => setNovoItem({...novoItem, nome: text})}
              style={styles.input}
            />
            <TextInput
              placeholder="Marca"
              value={novoItem.marca}
              onChangeText={text => setNovoItem({...novoItem, marca: text})}
              style={styles.input}
            />
            <TextInput
              placeholder="Categoria"
              value={novoItem.categoria}
              onChangeText={text => setNovoItem({...novoItem, categoria: text})}
              style={styles.input}
            />
            <View style={styles.quantidadeContainer}>
              <Text style={styles.quantidadeLabel}>Quantidade</Text>
              <View style={styles.quantidadeControls}>
                <TouchableOpacity
                  onPress={decrementarQuantidade}
                  disabled={novoItem.quantidade === 0}
                  style={[
                    styles.quantidadeButton,
                    novoItem.quantidade === 0 && styles.quantidadeButtonDisabled,
                  ]}
                >
                  <Text style={[
                    styles.quantidadeButtonText,
                    novoItem.quantidade === 0 && styles.quantidadeButtonTextDisabled,
                  ]}>-</Text>
                </TouchableOpacity>
                <TextInput
                  value={novoItem.quantidade.toString()}
                  onChangeText={handleQuantidadeChange}
                  keyboardType="numeric"
                  style={styles.quantidadeInput}
                />
                <TouchableOpacity
                  onPress={incrementarQuantidade}
                  style={styles.quantidadeButton}
                >
                  <Text style={styles.quantidadeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onDismiss} style={styles.button}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd} style={[styles.button, styles.buttonPrimary]}>
              <Text style={[styles.buttonText, styles.buttonTextPrimary]}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
