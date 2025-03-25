import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    elevation: 0,
    marginRight: 8,
  },
  searchInput: {
    fontSize: 16,
  },
  filterButton: {
    margin: 0,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  text: {
    textAlign: 'center',
  },
  headerRight: {
    marginRight: 8,
  },
  headerIcon: {
    margin: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  // Estilos da tela de configurações
  settingsTitle: {
    marginBottom: 24,
    color: '#1976D2',
  },
  settingsContent: {
    gap: 16,
  },
  settingsLabel: {
    color: '#424242',
  },
  settingsInput: {
    backgroundColor: '#fff',
  },
  saveButton: {
    marginTop: 8,
  },
  // Estilos do diálogo
  dialogInput: {
    marginBottom: 16,
  },
  // Estilos do contador de quantidade
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
    borderRadius: 8,
    padding: 4,
  },
  quantidadeButton: {
    margin: 0,
    borderRadius: 20,
    elevation: 2,
  },
  quantidadeInput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 40,
    marginHorizontal: 16,
    backgroundColor: 'transparent',
  },
});
