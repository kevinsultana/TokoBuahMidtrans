import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CartIcon from './CartIcon';
import {Image} from 'react-native-elements';
import Gap from './Gap';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: 50, height: 50}}
        />
        <CartIcon onPress={() => navigation.navigate('Cart')} />
      </View>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Text style={styles.title}>Seasonal</Text>
        <Text style={styles.title}>Fresh Fruit from the Root</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
