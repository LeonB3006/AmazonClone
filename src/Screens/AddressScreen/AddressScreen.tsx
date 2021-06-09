import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import countryList from 'country-list';
import CartButton from '../../Components/CartButton/CartButton';
import {DataStore, Auth} from 'aws-amplify';
import {Order, OrderProduct, CartProduct} from '../../models';
import {useNavigation} from '@react-navigation/native';

const AddressScreen = () => {
  const countries = countryList.getData();
  const [country, setCountry] = useState(countries[0].code);
  const [fullname, setFullName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [city, setCity] = useState('');
  const navigation = useNavigation();
 

  const saveOrder = async () => {

    // get user details

    const userData = await Auth.currentAuthenticatedUser();

    // create a new order

    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,
        fullName: fullname,
        phoneNumber: phonenumber,
        country,
        city,
        address,
      }),
    );

    // fetch all cart items

    const cartItems = await DataStore.query(CartProduct, cp => {
      cp.userSub('eq', userData.attributes.sub);
    });

    // attach all items to the order

    await Promise.all(
      cartItems.map(cartItem => {
        DataStore.save(
          new OrderProduct({
            quantity: cartItem.quantity,
            option: cartItem.option,
            productID: cartItem.productID,
            orderID: newOrder.id,
          }),
        );
      }),
    );

    // delete all cart items
    await Promise.all(
      cartItems.map(cartItem => {
        DataStore.delete(cartItem);
      }),
    );

    // redirect home
    navigation.navigate('home');
  };

  const onCheckOut = () => {
    if (addressError) {
      Alert.alert('Fix all errors!');
      return;
    }
    if (!fullname) {
      Alert.alert('Please enter a Fullname!');
      return;
    }
    if (!phonenumber) {
      Alert.alert('Please enter a Phone Number!');
      return;
    }

    Alert.alert('Success!');
    saveOrder();
  };

  const validateAddress = () => {
    if (address.length < 5) {
      setAddressError('Address is too Short');
    }
  };

  return (
    <KeyboardAvoidingView
      behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <ScrollView style={styles.root}>
        <View style={styles.row}>
          <Picker selectedValue={country} onValueChange={setCountry}>
            {countries.map((country: object) => (
              <Picker.Item label={country.name} value={country.code} />
            ))}
          </Picker>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder={'Write your Full Name'}
            value={fullname}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder={'Write your Phone Number'}
            value={phonenumber}
            onChangeText={setPhonenumber}
            keyboardType={'phone-pad'}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder={'Write your Address'}
            value={address}
            onEndEditing={validateAddress}
            onChangeText={text => {
              setAddress(text);
              setAddressError('');
            }}
          />
          {!!addressError && <Text style={styles.error}>{addressError}</Text>}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder={'Write your City'}
            value={city}
            onChangeText={setCity}
          />
        </View>
        <CartButton text={'Checkout'} onPress={onCheckOut} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;
