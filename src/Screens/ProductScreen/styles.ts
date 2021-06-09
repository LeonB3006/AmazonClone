import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: '#fff',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 10,
      lineHeight: 20,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default styles;
