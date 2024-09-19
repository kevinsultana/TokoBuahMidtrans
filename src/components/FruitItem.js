import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FruitItem = ({fruit, onPress, onPressAddCart}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <TouchableOpacity onPress={onPressAddCart}>
          <Icon name="cart" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <Image source={{uri: fruit.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{fruit.name}</Text>
        <Text style={styles.price}>Rp {fruit.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
});

export default FruitItem;
