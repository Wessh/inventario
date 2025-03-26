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
