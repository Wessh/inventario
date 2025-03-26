import React from 'react';
import {View, Modal, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalBody: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  quantidadeContainer: {
    marginBottom: 16,
  },
  quantidadeLabel: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 8,
  },
  quantidadeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
  },
  quantidadeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  quantidadeButtonDisabled: {
    backgroundColor: '#f5f5f5',
  },
  quantidadeButtonText: {
    fontSize: 24,
    color: '#1976D2',
  },
  quantidadeButtonTextDisabled: {
    color: '#BDBDBD',
  },
  quantidadeInput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 40,
    marginHorizontal: 16,
    color: '#1976D2',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  buttonPrimary: {
    backgroundColor: '#1976D2',
  },
  buttonText: {
    fontSize: 16,
    color: '#424242',
  },
  buttonTextPrimary: {
    color: '#fff',
  },
});
