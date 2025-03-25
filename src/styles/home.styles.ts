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
    padding: 12,
    paddingBottom: 0,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
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
    right: 8,
    bottom: 8,
  },
});
