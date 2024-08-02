import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import React, { useEffect, useState } from 'react';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import * as CartActions from '../../../redux/actions/cartActions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../../assets/styles';

const Cart = ({ navigation, isLoading, cartDetails, dispatch }) => {
  const [state, setState] = useState({
    cartData: null,
  });
  const { cartData } = state;

  useEffect(() => {
    updateState({ cartData: cartDetails?.items })
  }, [cartDetails])

  useEffect(() => {
    dispatch(CartActions.onCartDetails())
  }, [])

  const updateState = data => setState({ ...state, ...data });

  console.log("cartData", cartData)

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <MyHeader title={"Your Cart"} />
      <Loader visible={isLoading} />
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
              size={25}
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
      const newList = cartData.filter(item => item?._id != id);
      if (newList.length == 0) {
        navigation.goBack();
      } else {
        updateState({ cartData: newList });
      }
    } else {
      const newList = cartData.map(item => {
        if (item?._id == id) {
          const updatedItem = {
            ...item,
            quantity:
              type == 'remove'
                ? item.quantity > 1
                  ? item.quantity - 1
                  : item.quantity
                : item.quantity + 1,
          };
          return updatedItem;
        }
        return item;
      });
      updateState({ cartData: newList });
    }
  }

  function cartDataInfo() {
    const renderItem = ({ item, index }) => {

      // console.log("item =====>>>>" , item)
      // console.log("item =====>>>>" , item?.quantity)

      return (
        <View style={[styles.row, styles.itemContainer]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item?.productId?.image }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <View
            style={{
              marginLeft: Sizes.fixPadding,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{ ...Fonts.black16RobotoRegular, color: Colors.blackLight }}>
              {item?.productId.title}
            </Text>
            <Text style={{ ...Fonts.black18RobotoRegular }}>₹{item.productId.price}</Text>
            <View
              style={[
                styles.row,
                { width: SCREEN_WIDTH * 0.25, justifyContent: 'space-between' },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  updateItemCount({ id: item?._id, type: 'remove', qty: item?.quantity })
                }
                hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: Colors.gray,
                  borderRadius: Sizes.fixPadding,
                  ...styles.center,
                }}>
                <Text style={{
                  ...Fonts.white16RobotoMedium,
                  lineHeight: 16
                }}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{ ...Fonts.black18RobotoRegular, color: Colors.blackLight }}>{item?.quantity}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  updateItemCount({ id: item?._id, type: 'add', qty: item?.quantity })
                }
                hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: Colors.primaryLight,
                  borderRadius: Sizes.fixPadding,
                  ...styles.center,
                }}>
                <Text style={{
                  ...Fonts.white16RobotoMedium,
                  lineHeight: 17
                }}>
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
};


const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  cartDetails: state.cart.cartDetails,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

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
