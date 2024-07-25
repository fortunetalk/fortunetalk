import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../../utils/navigationServices';
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../../assets/styles';

const BookingPoojaDetails = ({route }) => {

  console.log("route =====>>>", route.params?.pooja)

  const [state, setState] = useState({
    paginationIndex: 0,
    showPayment: false,
    successVisible: false,
    poojaData: route.params.pooja,
    suggestedBy: '',
    poojaType: "Booking Details"
  });

  function gst_amount() {
    return (
      (parseFloat(poojaData?.price) * 18.0) / 100).toFixed(2)
  }

  function total_amount() {
    return (
      parseFloat(parseFloat(poojaData?.price) + (parseFloat(poojaData?.price) * 18.0) / 100).toFixed(2)
    );
  }

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const { paginationIndex, showPayment, successVisible, poojaData, suggestedBy, poojaType } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <View style={{ flex: 1 }}>
        <MyHeader title={"Booking Details"} />
        <FlatList
          ListHeaderComponent={
            <>
              {bannerInfo()}
              {addressInfo()}
              {billDetailsInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />
        {continueButtonInfo()}
      </View>
    </View>
  );

  function continueButtonInfo() {
    const on_payment = async () => {
      navigate("successfulybooked")
    }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={on_payment}
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginVertical: Sizes.fixPadding,
          borderRadius: Sizes.fixPadding * 1.4,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
            Continue for Payment
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }


  function billDetailsInfo() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 1.5,
        }}>
        <View
          style={[
            styles.row,
            { justifyContent: 'space-between', marginBottom: Sizes.fixPadding },
          ]}>
          <Text style={{ ...Fonts.black16RobotoRegular }}>Subtotal</Text>
          <Text style={{ ...Fonts.black16RobotoMedium }}>
            ₹ {poojaData?.price}
          </Text>
        </View>
        <View
          style={[
            styles.row,
            { justifyContent: 'space-between', marginBottom: Sizes.fixPadding },
          ]}>
          <Text style={{ ...Fonts.black16RobotoRegular }}>Delivery Charge</Text>
          <Text style={{ ...Fonts.black16RobotoRegular }}>Free</Text>
        </View>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              paddingBottom: Sizes.fixPadding,
              marginBottom: Sizes.fixPadding,
              borderBottomWidth: 1,
              borderColor: Colors.grayLight,
            },
          ]}>
          <Text style={{ ...Fonts.black16RobotoRegular }}>GST @ 18.0%</Text>
          <Text style={{ ...Fonts.black16RobotoRegular }}>₹ {gst_amount()}</Text>
        </View>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              marginBottom: Sizes.fixPadding,
            },
          ]}>
          <Text style={{ ...Fonts.black16RobotoRegular }}>Total</Text>
          <Text style={{ ...Fonts.black16RobotoRegular }}>
            ₹ {total_amount()}
          </Text>
        </View>
      </View>
    );
  }

  function addressInfo() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 1.5,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Text style={{ ...Fonts.black16RobotoMedium }}>Address</Text>
          <TouchableOpacity>
            <Ionicons
              name="pencil-sharp"
              color={Colors.primaryDark}
              size={20}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            ...Fonts.gray14RobotoRegular,
            marginVertical: Sizes.fixPadding * 0.7,
          }}>
          GC76+79C, Blossom County, Sector 90, Noida, Uttar Pradesh 201305
        </Text>
      </View>
    );
  }


  function bannerInfo() {
    return (
      <>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 1.5,
            height: SCREEN_WIDTH * 0.55,
            marginVertical: Sizes.fixPadding * 1,
          }}>
          <Image
            source={require("../../../assets/images/astro.jpg")}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: Sizes.fixPadding * 2,
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: Sizes.fixPadding * 1,
            paddingHorizontal: Sizes.fixPadding * 2,
            borderBottomWidth: 1,
            borderBottomColor: Colors.grayLight,
          }}
        >
          <Text style={{ color: Colors.primaryDark, fontSize: 16, fontWeight: "600" }} >Jal Abhishek Pooja</Text>
          <Text style={{ color: Colors.grayC, fontSize: 14 }}>Jal Abhishek Pooja Jal Abhishek Pooja Jal Abhishek Pooja</Text>
        </View>
      </>
    );
  }
};

export default BookingPoojaDetails;

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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
    paddingVertical: Sizes.fixPadding,
  },
  paginationDot: {
    width: 12,
    height: 2,
    borderRadius: 5,
    margin: 5,
  },
});
