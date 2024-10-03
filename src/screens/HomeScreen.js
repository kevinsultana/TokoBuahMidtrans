import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {selectCategory} from '../store/fruitSlice';
import {FruitData} from '../data';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  // Get selected category and fruits to display from Redux state
  const {selectedCategory, fruitsToDisplay} = useSelector(
    state => state.fruits,
  );

  const handleCategorySelect = category => {
    dispatch(selectCategory(category));
  };

  const renderFruits = () => {
    return (
      <FlatList
        data={fruitsToDisplay}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.5,
              }}>
              <View style={{width: 50, height: 2, backgroundColor: 'black'}} />
              <Image
                source={require('../assets/png/basket.png')}
                style={{
                  width: 50,
                  height: 50,
                  marginHorizontal: 10,
                }}
              />
              <View style={{width: 50, height: 2, backgroundColor: 'black'}} />
            </View>
          );
        }}
        numColumns={2}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{...styles.fruitCard, backgroundColor: `${item.color}`}}
            onPress={() =>
              navigation.navigate('ProductDetails', {fruit: item})
            }>
            <Image
              source={item.image}
              style={{width: 100, height: 100, borderRadius: 10}}
            />
            <Text style={styles.fruitName}>{item.name}</Text>
            <Text style={styles.fruitPrice}>
              Rp {item.price_per_unit.toLocaleString()}
            </Text>
            <TouchableOpacity style={styles.cartButton}>
              <Icon name="cart" size={20} color={'white'} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.fruitListContainer}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={require('../assets/png/app_logo.png')}
            style={styles.logo}
          />
          <TouchableOpacity>
            <Icon name="cart" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 10}}>
          <Text style={styles.seasonalText}>Seasonal</Text>
          <Text style={styles.title}>Fresh Fruit from the Root</Text>
        </View>
      </View>

      {/* Category Filter */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'All' && styles.selectedCategory,
            ]}
            onPress={() => handleCategorySelect('All')}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === 'All' && styles.selectedCategoryText,
              ]}>
              All
            </Text>
          </TouchableOpacity>

          {/* Map over FruitData to render the rest of the categories */}
          {FruitData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === item.category && styles.selectedCategory,
              ]}
              onPress={() => handleCategorySelect(item.category)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.category &&
                    styles.selectedCategoryText,
                ]}>
                {item.category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Fruits Grid */}
      <View style={styles.fruitListWrapper}>{renderFruits()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  headerContent: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  seasonalText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  categoryContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryButton: {
    marginRight: 10,
    backgroundColor: '#ffe4b3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedCategory: {
    backgroundColor: '#fcbf49',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  selectedCategoryText: {
    color: 'white',
  },
  fruitListWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  fruitListContainer: {
    paddingBottom: 20,
  },
  fruitCard: {
    flex: 1,
    margin: 10,
    // backgroundColor: `${item.color}`,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fruitName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  fruitPrice: {
    color: 'white',
    fontSize: 14,
  },
  cartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff7043',
    padding: 5,
    borderRadius: 20,
  },
});
