import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const CategoryFilter = ({categories, selectedCategory, onSelectCategory}) => {
  return (
    <View style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.button,
            selectedCategory === category && styles.selectedButton,
          ]}
          onPress={() => onSelectCategory(category)}>
          <Text style={styles.text}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#ffa500',
  },
  text: {
    color: '#333',
  },
});

export default CategoryFilter;
