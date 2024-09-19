import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {CartContext} from '../context/CartContext';
import fruitsData from '../data/Fruits'; // If fruits are imported directly from a data file
import CartIcon from '../components/CartIcon';
import {useNavigation} from '@react-navigation/native';

const ProductDetailsScreen = ({route}) => {
  const {fruitId} = route.params;
  const {addToCart} = useContext(CartContext); // Add only cart-related logic
  const fruits = fruitsData; // Ensure fruits are available (from context, file, or API)
  const navigation = useNavigation();

  // Check if fruits is undefined or not an array
  if (!Array.isArray(fruits)) {
    console.error('Fruits data is not available or is not an array.');
    return <Text>Error: Fruits data is not available.</Text>;
  }

  const fruit = fruits.find(f => f.id === fruitId);

  // Check if fruit is undefined (fruitId might not exist)
  if (!fruit) {
    return <Text>Error: Fruit not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'flex-end'}}>
        <CartIcon onPress={() => navigation.navigate('Cart')} />
      </View>
      <Image source={{uri: fruit.image}} style={styles.image} />
      <Text style={styles.name}>{fruit.name}</Text>
      <Text style={styles.description}>{fruit.description}</Text>
      <Text style={styles.price}>Rp. {fruit.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => addToCart(fruit)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
  },
  button: {
    backgroundColor: '#ffa500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
