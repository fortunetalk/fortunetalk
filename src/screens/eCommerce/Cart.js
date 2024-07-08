import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import MyStatusBar from '../../components/MyStatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../assets/styles';

const Cart = ({ navigation }) => {
  const [state, setState] = useState({
    cartData: [
      {
        id: '1',
        title: 'Astro Product 1',
        star: 4.5,
        number_of_review: 10,
        dicount_price: 299,
        qty: 1,
      },
      {
        id: '2',
        title: 'Astro Product 2',
        star: 4.0,
        number_of_review: 8,
        dicount_price: 399,
        qty: 2,
      },
    ],
  });

  const updateState = data => setState({ ...state, ...data });

  const { cartData } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      {header()}
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {cartDataInfo()}
              {addressInfo()}
              {billInfo()}
              {finalPriceInfo()}
              {continueButtonInfo()}
            </>
          }
        />
      </View>
    </View>
  );

  function continueButtonInfo() {

    const on_payment = async () => {
      navigation.navigate("personalDetails")
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={on_payment}
        style={{
          marginHorizontal: Sizes.fixPadding * 3,
          marginVertical: Sizes.fixPadding,
          borderRadius: Sizes.fixPadding * 1.5,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
            Continue for Payment
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function getTotalPrice() {
    let x = 0;
    cartData.map(item => {
      x = parseFloat(item.dicount_price) * parseInt(item.qty) + x;
    });
    return x;
  }

  function getExtraPrice() {
    let totalPrice = getTotalPrice();
    return (totalPrice * 3) / 100;
  }

  function finalPriceInfo() {
    return (
      <View
        style={[
          styles.row,
          {
            justifyContent: 'space-between',
            marginBottom: Sizes.fixPadding,
            margin: Sizes.fixPadding * 2,
          },
        ]}>
        <Text style={{ ...Fonts.black16RobotoRegular }}>Total</Text>
        <Text style={{ ...Fonts.black16RobotoMedium }}>
          ₹ 5686
        </Text>
      </View>
    );
  }

  function billInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          paddingVertical: Sizes.fixPadding * 1.5,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <View
          style={[
            styles.row,
            { justifyContent: 'space-between', marginBottom: Sizes.fixPadding },
          ]}>
          <Text style={{ ...Fonts.black16RobotoRegular }}>Subtotal</Text>
          <Text style={{ ...Fonts.black16RobotoMedium }}>
            ₹ 569
          </Text>
        </View>
        <View
          style={[
            styles.row,
            { justifyContent: 'space-between', marginBottom: Sizes.fixPadding },
          ]}>
          <Text style={{ ...Fonts.black16RobotoRegular }}>Delivery Charge</Text>
          <Text style={{ ...Fonts.black16RobotoMedium }}>Free</Text>
        </View>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Text style={{ ...Fonts.black16RobotoRegular }}>GST @ 3.0%</Text>
          <Text style={{ ...Fonts.black16RobotoMedium }}>
            ₹ 50
          </Text>
        </View>
      </View>
    );
  }

  function addressInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          paddingBottom: Sizes.fixPadding * 1.5,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Text style={{ ...Fonts.black16RobotoMedium }}>Address</Text>
          <TouchableOpacity>
            <Ionicons
              name="pencil-outline"
              color={Colors.primaryDark}
              size={14}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            ...Fonts.gray14RobotoRegular,
            marginTop: Sizes.fixPadding * 0.8,
          }}>
          GC76+79C, Blossom County, Sector 90, Noida, Uttar Pradesh 201305
        </Text>
      </View>
    );
  }

  async function updateItemCount({ id, type, qty }) {
    if (type == 'remove' && qty == 1) {
      const newList = cartData.filter(item => item.id != id);
      if (newList.length == 0) {
        await AsyncStorage.removeItem('eCommerceCart');
        navigation.goBack();
      } else {
        await AsyncStorage.setItem('eCommerceCart', JSON.stringify(newList));
        updateState({ cartData: newList });
      }
    } else {
      const newList = cartData.map(item => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            qty:
              type == 'remove'
                ? item.qty > 1
                  ? item.qty - 1
                  : item.qty
                : item.qty + 1,
          };
          return updatedItem;
        }
        return item;
      });

      await AsyncStorage.setItem('eCommerceCart', JSON.stringify(newList));
      updateState({ cartData: newList });
    }
  }

  function cartDataInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <View style={[styles.row, styles.itemContainer]}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/astro.jpg")}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <View
            style={{
              marginLeft: Sizes.fixPadding,
              flexDirection: 'column',
              height: SCREEN_WIDTH * 0.32,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{ ...Fonts.black16RobotoRegular, color: Colors.blackLight }}>
              {item.title}
            </Text>
            <View style={[styles.row]}>
              <Ionicons name="star" color={Colors.primaryDark} size={14} />
              <Text style={{ ...Fonts.gray12RobotoRegular }}>
                {item.star} ({item?.number_of_review} Reviews)
              </Text>
            </View>
            <Text style={{ ...Fonts.black18RobotoRegular }}>₹{item.dicount_price}</Text>
            <View
              style={[
                styles.row,
                { width: SCREEN_WIDTH * 0.25, justifyContent: 'space-between' },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  updateItemCount({ id: item.id, type: 'remove', qty: item.qty })
                }
                hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: Colors.gray,
                  borderRadius: Sizes.fixPadding,
                  ...styles.center,
                }}>
                <Text style={{ ...Fonts.white16RobotoMedium, lineHeight: 20 }}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{ ...Fonts.black18RobotoRegular }}>{item.qty}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  updateItemCount({ id: item.id, type: 'add', qty: item.qty })
                }
                hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: Colors.primaryLight,
                  borderRadius: Sizes.fixPadding,
                  ...styles.center,
                }}>
                <Text style={{ ...Fonts.white16RobotoMedium, lineHeight: 20 }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
    return (
      <View style={{ marginVertical: Sizes.fixPadding * 2 }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2,
            ...Fonts.black18RobotoMedium,
          }}>
          Order List
        </Text>
        <FlatList
          data={cartData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }

  function header() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 1.5,
          ...styles.row,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', zIndex: 99, padding: Sizes.fixPadding * 1.5 }}>
          <AntDesign
            name="leftcircleo"
            color={Colors.primaryLight}
            size={Sizes.fixPadding * 2.2}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.primaryLight15RobotoMedium,
            textAlign: 'center',
            flex: 1,
          }}>
          Your Cart
        </Text>
      </View>
    );
  }
};

export default Cart;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.32,
    borderRadius: Sizes.fixPadding,
    overflow: 'hidden',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowColor: Colors.blackLight,
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
});
