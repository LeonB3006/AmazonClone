import React from "react";
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 5,
    backgroundColor: "#fff",
    marginVertical: 5,
    alignItems: 'center',
  },
  image: {
    height: 100,
    flex: 2,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontWeight: 'bold',
  },
  rightContainer: {
    padding: 10,
    flex: 3,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  star: {
    margin: 2,
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
});

export default styles;
