import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    width: 100,
    justifyContent: 'space-between',
  },
  button: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7e7e7',
  },
  buttonText: {
    fontSize: 19,
  },
  quantity: {
    color: '#007eb9',
  },
});

export default styles;
