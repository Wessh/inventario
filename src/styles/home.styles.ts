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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center',
  },
  headerRight: {
    marginRight: 15,
  },
  headerIcon: {
    fontSize: 24,
  },
});
