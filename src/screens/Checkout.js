import {
  ActivityIndicator,
  BackHandler,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../components';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {emptyTheCart} from '../store/cartSlice';

export default function Checkout({navigation, route}) {
  const {transaction_url, order_id} = route.params;
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
    if (
      transactionStatus.status == 'settlement' ||
      transactionStatus.status == 'pending'
    )
      return navigation.goBack();
  };

  const [transactionStatus, setTransactionStatus] = useState({
    status: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  async function getTransactionStatus() {
    setLoading(true);
    setModalVisible(true);
    try {
      const response = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization:
              'Basic U0ItTWlkLXNlcnZlci1ERFZ1Qm95aGNUakNqSk1oVTZYQV93U2U6',
          },
        },
      );
      // console.log(response.data);
      if (response.data.status_code == '404') return navigation.goBack();
      const transaction_status = response.data.transaction_status;
      if (transaction_status == 'pending') {
        setTransactionStatus({
          status: response.data.transaction_status,
          message:
            'Transaction is pending. Dismiss this modal or press the back button to exit this page.',
        });
      } else if (transaction_status == 'settlement') {
        setTransactionStatus({
          status: response.data.transaction_status,
          message:
            'Transaction successful! Dismiss this modal or press the back button to exit this page.',
        });
        dispatch(emptyTheCart());
      } else {
        setTransactionStatus({
          status: response.data.transaction_status,
          message: 'Something went wrong with the transaction. Cek the logs.',
        });
        console.log(response);
      }
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error response:', error.response);
      } else console.log('syntax error: ', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const backAction = () => {
      getTransactionStatus();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <TouchableOpacity onPress={() => getTransactionStatus()}>
        <Icon name="close-circle-outline" size={30} color={'black'} />
      </TouchableOpacity> */}
      <WebView style={{flex: 1}} source={{uri: transaction_url}} />
      <Modal visible={modalVisible} onRequestClose={closeModal} transparent>
        <Pressable
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: '#0000001a',
          }}
          onPress={closeModal}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '80%',
                padding: 20,
                borderRadius: 15,
                elevation: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Icon name="account-cash" size={30} color={'black'} />
                <Text style={{color: 'black'}}>Transaction</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Icon name="close-circle-outline" size={30} color={'black'} />
                </TouchableOpacity>
              </View>

              <Gap height={20} />

              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  alignItems: 'center',
                }}>
                {loading && (
                  <ActivityIndicator color={'black'} size={'large'} />
                )}
                {transactionStatus.status == 'settlement' && (
                  <Icon name="cash-check" color={'green'} size={30} />
                )}
                {transactionStatus.status == 'pending' && (
                  <Icon name="cash-fast" color={'orange'} size={30} />
                )}

                <Gap width={20} />
                <Text style={{color: 'black'}}>
                  {transactionStatus.message}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
