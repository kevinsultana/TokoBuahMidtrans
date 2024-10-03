import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../components';

export default function ProductDetailScreen({route, navigation}) {
  // Get the fruit data passed via navigation
  const {fruit} = route.params;

  return (
    <View style={styles.container}>
      {/* navigation and cart */}
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" color={'black'} size={40} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="cart" color={'black'} size={40} />
        </TouchableOpacity>
      </View>

      {/* iimage */}
      <Image source={fruit.image} style={styles.image} />

      <Gap height={20} />

      {/* details title */}
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{fruit.name}</Text>
        </View>

        <Gap height={20} />

        {/* rating and stock */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="star" color={'#FFD700'} size={20} />
            <Icon name="star" color={'#FFD700'} size={20} />
            <Icon name="star" color={'#FFD700'} size={20} />
            <Icon name="star" color={'#FFD700'} size={20} />
            <Icon name="star" color={'#FFD700'} size={20} />
          </View>
          <Text style={styles.stock}>Stock: 20</Text>
        </View>

        <Gap height={20} />

        {/* description */}
        <View style={{flex: 1}}>
          <Text style={styles.description}>{fruit.description}</Text>
        </View>

        {/* price and addtocart */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.price}>
            Rp {fruit.price_per_unit.toLocaleString()}
          </Text>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: fruit.color,
                width: 250,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="cart-plus" color={'white'} size={25} />
              <Gap width={10} />
              <Text style={{color: 'white', fontWeight: '700', fontSize: 20}}>
                Add to Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {color: 'black'},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsContainer: {
    elevation: 5,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  stock: {
    fontSize: 16,
    color: 'black',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
    // textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  cartButton: {
    backgroundColor: '#7A42F4',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  cartButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
