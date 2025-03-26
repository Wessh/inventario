import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#212121',
  },
  modalBody: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 8,
  },
  categoriaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoriaButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  categoriaButtonSelected: {
    backgroundColor: '#E3F2FD',
  },
  categoriaButtonText: {
    color: '#757575',
  },
  categoriaButtonTextSelected: {
    color: '#1976D2',
  },
  marcaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  marcaButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  marcaButtonSelected: {
    backgroundColor: '#E3F2FD',
  },
  marcaButtonText: {
    color: '#757575',
  },
  marcaButtonTextSelected: {
    color: '#1976D2',
  },
  quantidadeContainer: {
    gap: 8,
  },
  quantidadeInputContainer: {
    gap: 8,
  },
  quantidadeInput: {
    backgroundColor: 'white',
  },
  operadorContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  operadorButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  operadorButtonSelected: {
    backgroundColor: '#E3F2FD',
  },
  operadorButtonText: {
    color: '#757575',
  },
  operadorButtonTextSelected: {
    color: '#1976D2',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  cancelButton: {
    borderColor: '#757575',
  },
});
