import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {styles} from '../styles/dialog.styles';
import {Item} from '../types/item';
import {addItem} from '../services/database';

type AddItemDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  onAdd: (item: Omit<Item, 'id'>) => void;
};

export const AddItemDialog = ({
  visible,
  onDismiss,
  //onAdd,
}: AddItemDialogProps) => {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('1');

  const handleSalvar = async () => {
    if (!nome.trim() || !marca.trim() || !categoria.trim()) {
      return;
    }
/*
    onAdd({
      nome: nome.trim(),
      marca: marca.trim(),
      categoria: categoria.trim(),
      quantidade: parseInt(quantidade, 10),
    });*/

    const newItem: Omit<Item, 'id'> = {
      nome: nome.trim(),
      marca: marca.trim(),
      categoria: categoria.trim(),
      quantidade: parseInt(quantidade, 10),
    };

    try {
      await addItem(newItem);
      console.log('Item adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }

    // Limpar campos após adicionar
    setNome('');
    setMarca('');
    setCategoria('');
    setQuantidade('1');
  };

  const handleAumentarQuantidade = () => {
    setQuantidade(prev => (parseInt(prev, 10) + 1).toString());
  };

  const handleDiminuirQuantidade = () => {
    setQuantidade(prev => {
      const newValue = parseInt(prev, 10) - 1;
      return newValue > 0 ? newValue.toString() : '1';
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar Item</Text>
            <TouchableOpacity onPress={onDismiss}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              style={styles.input}
              placeholder="Nome do item"
              value={nome}
              onChangeText={setNome}
              placeholderTextColor="#757575"
            />
            <TextInput
              style={styles.input}
              placeholder="Marca"
              value={marca}
              onChangeText={setMarca}
              placeholderTextColor="#757575"
            />
            <TextInput
              style={styles.input}
              placeholder="Categoria"
              value={categoria}
              onChangeText={setCategoria}
              placeholderTextColor="#757575"
            />
            <View style={styles.quantidadeContainer}>
              <Text style={styles.quantidadeLabel}>Quantidade</Text>
              <View style={styles.quantidadeControls}>
                <TouchableOpacity
                  style={styles.quantidadeButton}
                  onPress={handleDiminuirQuantidade}>
                  <Text style={styles.quantidadeButtonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.quantidadeInput}
                  value={quantidade}
                  onChangeText={setQuantidade}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.quantidadeButton}
                  onPress={handleAumentarQuantidade}>
                  <Text style={styles.quantidadeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.saveButton,
                (!nome.trim() || !marca.trim() || !categoria.trim()) &&
                  styles.saveButtonDisabled,
              ]}
              onPress={handleSalvar}
              disabled={!nome.trim() || !marca.trim() || !categoria.trim()}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
