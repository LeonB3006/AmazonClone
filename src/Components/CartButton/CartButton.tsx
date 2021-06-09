import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface CartButtonProps {
  text: string;
  onPress: () => void;
  containerStyles?: object;
}

const CartButton = ({text, onPress, containerStyles}: CartButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, containerStyles]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e47911',
    marginVertical: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#91420b',
  },
  text: {
    fontSize: 16,
  },
});
export default CartButton;
