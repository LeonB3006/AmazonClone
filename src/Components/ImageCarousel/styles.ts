import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
  },
  image: {
    height: 250,
    resizeMode: 'contain',
    margin: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    backgroundColor: '#fff',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
