import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../Components/QuantitySelector/QuantitySelector';
import CartButton from '../../Components/CartButton/CartButton';
import ImageCarousel from '../../Components/ImageCarousel/ImageCarousel';
import {DataStore} from 'aws-amplify';
import {CartProduct, Product} from '../../models';
import {Auth} from 'aws-amplify';


const ProductScreen = () => {
  const [selectedOption, setSelectedOption] =
    useState<undefined | string>(undefined);
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState<Product | undefined>(undefined);

    const navigation = useNavigation();


    const addToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: product.id,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart');
  };

  const buyNow = () => {};

  const route = useRoute();

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct); // same as .then(result => setProducts(result))
  }, []);

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <Text style={styles.title}> {product.title} </Text>

      <ImageCarousel images={product.images} />

      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => {
          setSelectedOption(itemValue);
        }}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option}>
            {' '}
          </Picker.Item>
        ))}
      </Picker>

      <Text style={styles.price}>
        from ${product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
        )}
      </Text>

      <Text style={styles.description}>{product.description}</Text>

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      <CartButton text="Add to Cart" onPress={addToCart} />
      <CartButton
        text="Buy Now"
        onPress={buyNow}
        containerStyles={{backgroundColor: 'yellow'}}
      />
    </ScrollView>
  );
};

export default ProductScreen;
