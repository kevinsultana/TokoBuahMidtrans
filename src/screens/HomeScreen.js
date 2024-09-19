import React, {useContext, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import FruitItem from '../components/FruitItem';
import CategoryFilter from '../components/CategoryFilter';
import Header from '../components/Header';
import fruits from '../data/Fruits';
import {useNavigation} from '@react-navigation/native';
import {CartContext} from '../context/CartContext';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();

  const filteredFruits =
    selectedCategory === 'All'
      ? fruits
      : fruits.filter(fruit => fruit.category === selectedCategory);

  const {addToCart} = useContext(CartContext); // Add only cart-related logic

  return (
    <View style={styles.container}>
      <Header />
      <CategoryFilter
        categories={['All', 'Apples', 'Mangoes', 'Grapes', 'Guava']}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ScrollView contentContainerStyle={styles.grid}>
        {filteredFruits.map(fruit => (
          <FruitItem
            key={fruit.id}
            fruit={fruit}
            onPress={() =>
              navigation.navigate('ProductDetails', {fruitId: fruit.id})
            }
            onPressAddCart={fruit => addToCart(fruit.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  grid: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
});

export default HomeScreen;
