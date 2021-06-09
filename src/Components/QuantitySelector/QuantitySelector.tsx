import React from 'react';
import {Pressable, View, Text} from 'react-native';
import styles from './styles';

const QuantitySelector = ({quantity, setQuantity}) => {
  const onMinus = () => {
    setQuantity(Math.max(0,quantity - 1));
  };

  const onPlus = () => {
      setQuantity(quantity + 1);

  };

  return (
    <View style={styles.root}>
      <Pressable onPress={onMinus} style={styles.button}>
        <Text style={styles.buttonText}> - </Text>
      </Pressable>

      <Text style={styles.quantity}> {quantity} </Text>

      <Pressable onPress={onPlus} style={styles.button}>
        <Text style={styles.buttonText}> + </Text>
      </Pressable>
    </View>
  );
};

export default QuantitySelector;
