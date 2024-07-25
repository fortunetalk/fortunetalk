import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  BackHandler,
} from 'react-native';
import moment from 'moment';
import React, { useEffect } from 'react';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusBar';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../../assets/styles';

const ProductSuccessBooking = ({ navigation }) => {

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <View style={{ flex: 1 }}>
        <MyHeader title={"Booking Successful"} />
        <FlatList
          ListHeaderComponent={
            <>
              {successFullImageInfo()}
              {paymentDetailsInfo()}
              {trackOrderButtonInfo()}
            </>
          }
        />
      </View>
    </View>
  );

  function trackOrderButtonInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('productTracking')}
        style={{
          alignSelf: 'center',
          backgroundColor: Colors.whiteDark,
          paddingVertical: Sizes.fixPadding * 0.5,
          paddingHorizontal: Sizes.fixPadding * 3,
          borderRadius: 1000,
        }}>
        <Text style={{ ...Fonts.primaryDark16RobotoMedium }}>
          Track Your order
        </Text>
      </TouchableOpacity>
    );
  }

  function paymentDetailsInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginTop: Sizes.fixPadding,
          backgroundColor: Colors.grayD,
          borderRadius: Sizes.fixPadding,
          elevation: 8,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowColor: Colors.blackLight,
          padding: Sizes.fixPadding,
          marginBottom: Sizes.fixPadding * 2,
        }}>
        <Text
          style={{
            ...Fonts.black18RobotoRegular,
            color: Colors.blackLight,
            textAlign: 'center',
            marginTop: Sizes.fixPadding,
          }}>
          Payment Details
        </Text>
        <Text
          style={{
            ...Fonts.primaryLight15RobotoMedium,
            textAlign: 'center',
            marginVertical: Sizes.fixPadding * 2,
          }}>
          Transaction Number: 420
        </Text>
        <View style={styles.rowContainer}>
          <Text style={{ ...Fonts.gray14RobotoRegular }}>Total Paid</Text>
          <Text style={{ ...Fonts.gray14RobotoRegular }}>₹ 200</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ ...Fonts.gray14RobotoRegular }}>Paid by</Text>
          <Text style={{ ...Fonts.gray14RobotoRegular }}>Razorpay</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ ...Fonts.gray14RobotoRegular }}>Date</Text>
          <Text style={{ ...Fonts.gray14RobotoRegular }}>
            {moment(new Date()).format('DD MMM YYYY, hh:mm A')}
          </Text>
        </View>
      </View>
    );
  }

  function successFullImageInfo() {
    return (
      <View style={{ height: SCREEN_HEIGHT * 0.3 }}>
        <ImageBackground
          source={require('../../../assets/gifs/celebration.gif')}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/gifs/booking_successful.gif')}
            style={{ width: '30%', height: '40%', resizeMode: 'contain' }}
          />
        </ImageBackground>
      </View>
    );
  }
};

export default ProductSuccessBooking;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding * 1.3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
  },
  textContainer: {
    width: SCREEN_WIDTH,
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    padding: Sizes.fixPadding * 1.3,
    zIndex: -1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
    marginBottom: Sizes.fixPadding * 2,
  },
});
