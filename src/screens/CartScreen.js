import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {Gap} from '../components';
import {addToCart, removeFromCart} from '../store/cartSlice';
import axios from 'axios';

export default function CartScreen({navigation}) {
  const {item, totalPrice} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const checkoutTransaction = async () => {
    setLoading(true);
    try {
      const orderId = `YOUR-ORDERID-${new Date().getTime()}`;
      const response = await axios.post(
        'https://app.sandbox.midtrans.com/snap/v1/transactions',
        {
          transaction_details: {
            order_id: orderId,
            gross_amount: totalPrice,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: 'budi',
            last_name: 'pratama',
            email: 'budi.pra@example.com',
            phone: '08111222333',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization:
              'Basic U0ItTWlkLXNlcnZlci1ERFZ1Qm95aGNUakNqSk1oVTZYQV93U2U6',
          },
        },
      );
      setLoading(false);
      // console.log('SUCCESS:', response.data);
      navigation.navigate('Checkout', {
        transaction_url: response.data.redirect_url,
        order_id: orderId,
      });
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log('RESPONSE ERROR:', error.response?.data);
      } else console.log('SYNTAX ERROR:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* header and goback button */}
      <View style={{flexDirection: 'row', margin: 20, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={40} color={'black'} />
        </TouchableOpacity>
        <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
          Your Cart
        </Text>
      </View>

      {/* list of cart */}
      <FlatList
        ListEmptyComponent={
          <Text
            style={{color: 'gray', textAlign: 'center', marginVertical: 20}}>
            Your Cart is empty, add some of Fruit
          </Text>
        }
        data={item}
        renderItem={({item}) => {
          return (
            <View style={{marginHorizontal: 20, marginVertical: 10}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ProductDetails', {fruit: item})
                    }>
                    <View
                      style={{
                        backgroundColor: item.color,
                        width: 75,
                        height: 75,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={item.image}
                        style={{width: 60, height: 60}}
                      />
                    </View>
                  </Pressable>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={{color: 'black', fontWeight: '700', fontSize: 16}}>
                      {item.name}
                    </Text>
                    <Text style={{color: 'black', fontSize: 14}}>
                      Rp {item.price_per_unit.toLocaleString()}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart(item))}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 10,
                      backgroundColor: '#ffc14d',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name={item.amount == 1 ? 'trash-can' : 'minus'}
                      color={'black'}
                      size={20}
                    />
                  </TouchableOpacity>

                  <Gap width={10} />

                  <Text style={{color: 'black', fontSize: 15}}>
                    {item.amount}
                  </Text>

                  <Gap width={10} />

                  <TouchableOpacity
                    onPress={() => dispatch(addToCart(item))}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 10,
                      backgroundColor: '#ffc14d',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="plus" color={'black'} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* footer total price*/}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        <Text style={{color: 'black', fontSize: 16}}>Total Price: </Text>
        <Text style={{fontWeight: '700', color: 'black', fontSize: 16}}>
          Rp {totalPrice.toLocaleString()}
        </Text>
      </View>

      {/* footer checkout btn */}
      <TouchableOpacity
        disabled={item.length === 0}
        onPress={checkoutTransaction}
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: 'orange',
          marginHorizontal: 20,
          marginBottom: 20,
          elevation: 5,
          width: 350,
          paddingVertical: 10,
          borderRadius: 20,
          maxWidth: 420,
        }}>
        {loading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={{color: 'white'}}>Checkout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
