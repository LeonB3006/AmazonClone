/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/FontAwesome';

import Router from './navigation/Router';
import Amplify from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';

import {StripeProvider} from '@stripe/stripe-react-native';

import config from './src/aws-exports';
Amplify.configure(config);

const myIcon = <Icon name="rocket" size={30} color="#900" />;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StripeProvider publishableKey="pk_test_51J0IUkBsvZ5SKAgtmKTwTiQ68bBp0OlzE1oUTfnvWwO7mVmKN4aI94xg6NYDK0XI8FL8bNkh6TP7W8Ua6MO6MdLV0002bibJCu">
        <Router />
      </StripeProvider>
    </View>
  );
};

export default withAuthenticator(App);
