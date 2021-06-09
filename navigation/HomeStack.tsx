import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../src/Screens/HomeScreen/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ProductScreen from '../src/Screens/ProductScreen/ProductScreen';
import HomeHeader from '../src/Components/HomeHeader/HomeHeader';

const Stack = createStackNavigator();

const HomeStack = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (
          <HomeHeader
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ),
      }}>
      <Stack.Screen
        name="homeScreen"
        options={{
          title: 'Home',
        }}>
        {() => <HomeScreen searchValue={searchValue} />}
      </Stack.Screen>
      <Stack.Screen component={ProductScreen} name="productScreen" />
    </Stack.Navigator>
  );
};

export default HomeStack;
