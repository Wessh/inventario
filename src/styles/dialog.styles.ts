import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  closeButton: {
    fontSize: 24,
    color: '#757575',
    padding: 4,
  },
  modalBody: {
    gap: 16,
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#212121',
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
    backgroundColor: '#f6f6f6',
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  quantidadeButtonText: {
    fontSize: 24,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  quantidadeInput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 40,
    marginHorizontal: 16,
    backgroundColor: 'transparent',
    color: '#212121',
  },
  saveButton: {
    backgroundColor: '#1976D2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  searchInput: {
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  customItem: {
    backgroundColor: '#f0f0f0',
  },
  customItemLabel: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
});
