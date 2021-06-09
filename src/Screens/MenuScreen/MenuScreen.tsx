import React from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import {Auth} from 'aws-amplify';
import CartButton from '../../Components/CartButton/CartButton';

const MenuScreen = () => {
  const onLogOut = () => {
    Auth.signOut();
  };

  return (
    <SafeAreaView>
      <CartButton text="SignOut" onPress={onLogOut} />
    </SafeAreaView>
  );
};

export default MenuScreen;
