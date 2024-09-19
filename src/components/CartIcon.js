import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {CartContext} from '../context/CartContext';

const CartIcon = ({onPress}) => {
  const {cart} = useContext(CartContext);

  // Calculate total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Icon name="shopping-cart" color="#FFA500" size={30} onPress={onPress} />
      {totalItems > 0 && (
        <Badge
          value={totalItems}
          status="success"
          containerStyle={styles.badgeContainer}
          textStyle={styles.badgeText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   position: 'relative',
  // },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartIcon;
