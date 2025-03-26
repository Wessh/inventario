import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 12,
  },
  quantidadeContainer: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
  },
  quantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  itemDetails: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
    paddingLeft: 8,
  },
  actionButton: {
    margin: 0,
    padding: 0,
  },
});
