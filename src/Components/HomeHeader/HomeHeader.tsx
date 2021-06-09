import React from 'react';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface HomeHeaderProps {
  searchValue: string;
  setSearchValue: () => void;
}
const HomeHeader = ({searchValue, setSearchValue}: HomeHeaderProps) => {
  return (
    <SafeAreaView style={{backgroundColor: '#21cde3'}}>
      <View
        style={{
          margin: 10,
          backgroundColor: '#fff',
          padding: 5,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Feather name="search" size={20} />
        <TextInput
          style={{
            height: 30,
            borderRadius: 5,
            marginLeft: 10,
          }}
          placeholder="Search..."
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;
