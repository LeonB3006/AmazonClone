import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Auth, DataStore} from 'aws-amplify';
import ShoppingCartProductItem from '../../Components/ShoppingCartProductItem/ShoppingCartProductItem';
import CartButton from '../../Components/CartButton/CartButton';
import {useNavigation} from '@react-navigation/native';
import {CartProduct, Product} from '../../models';

const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const navigation = useNavigation();

  const fetchCartProducts = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    ).then(setCartProducts);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }

    const fetchProducts = async () => {
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );

      setCartProducts(currentCartProducts =>
        currentCartProducts.map(cartProduct => ({
          ...cartProduct,
          product: products.find(p => p.id === cartProduct.productID),
        })),
      );
    };

    fetchProducts();
  }, [cartProducts]);

  useEffect(() => {
    const subscriptions = cartProducts.map(cp =>
      DataStore.observe(CartProduct, cp.id).subscribe(msg => {
        if (msg.opType === 'UPDATE') {
          setCartProducts(currentCartProducts =>
            currentCartProducts.map(cp => {
              if (cp.id !== msg.element.id) {
                return cp;
              }
              return {
                ...cp,
                ...msg.element,
              };
            }),
          );
        }
      }),
    );
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [cartProducts]);

  useEffect(() => {
    const subscription = DataStore.observe(CartProduct).subscribe(msg => fetchCartProducts);
    return subscription.unsubscribe();
  }, []);

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice + (product?.product?.price || 0) * product.quantity,

    0,
  );

  const checkOut = () => {
    navigation.navigate('addressScreen');
  };

  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <FlatList
        data={cartProducts}
        renderItem={({item}) => <ShoppingCartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>
              {cartProducts.length} Items Total Cost:{' '}
              <Text style={{color: '#e47911'}}> ${totalPrice.toFixed(2)} </Text>
            </Text>
            <CartButton
              text={'Proceed to Checkout'}
              onPress={checkOut}
              containerStyles={{
                backgroundColor: '#f7d110',
                borderColor: '#f7c716',
                padding: 5,
                width: '80%',
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ShoppingCartScreen;
