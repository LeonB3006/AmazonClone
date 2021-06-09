import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ShoppingCartScreen from "../src/Screens/ShoppingCartScreen/ShoppingCartScreen";
import AddressScreen from "../src/Screens/AddressScreen/AddressScreen";

const Stack = createStackNavigator();

const ShoppingCartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={ShoppingCartScreen} name="cart" options={{
          title: 'Shopping Cart',
      }} />
      <Stack.Screen component={AddressScreen} name="addressScreen" options={{
          title: 'Address',
      }} />
    </Stack.Navigator>
  );
};

export default ShoppingCartStack;
