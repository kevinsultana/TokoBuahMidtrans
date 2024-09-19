import React, {useContext} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {CartContext} from '../context/CartContext';
import {Gap} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CartScreen = () => {
  const {cart, updateQuantity, removeFromCart} = useContext(CartContext);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({item}) => (
          <View style={styles.cartItem}>
            <View style={{flex: 1}}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.price}>Rp {item.price}</Text>
            <Gap width={10} />
            <View style={styles.quantityContainer}>
              {item.quantity === 1 ? (
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Gap width={25} />
                  <Icon name="trash-can" size={20} color={'black'} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: Rp {totalAmount}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: 16,
  },
  removeButton: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: '#ffa500',
    padding: 15,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CartScreen;
