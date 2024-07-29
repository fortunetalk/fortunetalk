import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Modal } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import * as Courses from '../../../redux/actions/courseActions';
import { Colors, Fonts, Sizes, SCREEN_WIDTH } from '../../../assets/styles';

const CourseBookingDetails = ({ navigation, route, dispatch }) => {
  const [state, setState] = useState({
    showPayment: false,
    successVisible: false,
    paymentData: route.params?.data,
    gstAmount: null,
    totalAmount: null,
    halfAmount: null,
  });

  const { successVisible, paymentData, gstAmount, totalAmount, halfAmount } = state;
  // console.log("payment data", paymentData)

  useEffect(() => {
    if (paymentData?.price) {
      const gst = ((parseFloat(paymentData.price) * 18) / 100).toFixed(2);
      const total = (parseFloat(paymentData.price) + parseFloat(gst)).toFixed(2);
      const half = (parseFloat(total) / 2).toFixed(2);

      setState(prevState => ({
        ...prevState,
        gstAmount: gst,
        totalAmount: total,
        halfAmount: half,
      }));
    }
  }, [paymentData]);

  // console.log("half_amount ===>>>" , half_amount())
  // console.log("total_amount ===>>>" , total_amount())

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const handleFullPayment = () => {
    if (!halfAmount) {
      Alert.alert("Amount Required")
    } else {
      dispatch(Courses.onCoursesPayment({ amount: totalAmount, liveClassId: paymentData?._id }))
    }
  }

  const handleHalfPayment = () => {
    if (!halfAmount) {
      Alert.alert("Amount Required")
    } else {
      dispatch(Courses.onCoursesPayment({ amount: halfAmount, liveClassId: paymentData?._id }))
    }
  }

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
              {paymentData?.image && bannerInfo()}
              {remediesInfo()}
              {billDetailsInfo()}
              {continueHalfPaymentButtonInfo()}
              {continueFullPaymentButtonInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />
        {successModalInfo()}
      </View>
    </View>
  );

  function successModalInfo() {
    const on_go_to_history = () => {
      if (paymentData?.type == 'paid_pdf') {
        navigation.pop(5);
      } else {
        updateState({ successVisible: false });
        navigation.pop(5);
        navigation.navigate('myCourses')
      }
    };
    return (
      <Modal visible={successVisible} dismissable={false}>
        <View
          style={{
            backgroundColor: Colors.white,
            marginHorizontal: Sizes.fixPadding * 2,
            borderRadius: Sizes.fixPadding,
            padding: Sizes.fixPadding * 1.5,
          }}>
          <Text
            style={{
              ...Fonts.primaryLight18RobotoMedium,
              color: Colors.green_a,
              textAlign: 'center',
            }}>
            Booking Successfull !!!
          </Text>

          <View
            style={{
              backgroundColor: Colors.whiteDark,
              paddingVertical: Sizes.fixPadding,
              paddingHorizontal: Sizes.fixPadding * 1.2,
              borderRadius: Sizes.fixPadding,
              marginTop: Sizes.fixPadding,
            }}>
            {paymentData?.image && (
              <Image
                source={{ uri: paymentData?.image }}
                style={{
                  width: '100%',
                  height: 130,
                  borderRadius: Sizes.fixPadding,
                }}
              />
            )}

            <Text
              style={{
                ...Fonts.primaryLight15RobotoMedium,
                textAlign: 'center',
                marginVertical: Sizes.fixPadding,
              }}>
              {paymentData?.title}
            </Text>
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: Colors.white,
                elevation: 5,
                shadowColor: Colors.blackLight,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                paddingHorizontal: Sizes.fixPadding,
                paddingVertical: Sizes.fixPadding * 0.8,
                borderRadius: Sizes.fixPadding,
              }}>
              <Text style={{ ...Fonts.gray16RobotoMedium }}>
                Paid Amount - ₹ {totalAmount}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                marginVertical: Sizes.fixPadding * 1.5,
                borderBottomColor: Colors.grayLight,
              }}
            />
            <View
              style={[
                styles.row,
                {
                  alignSelf: 'center',
                },
              ]}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 1000,
                  elevation: 5,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  borderWidth: 1.5,
                  borderColor: Colors.white,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{ uri: paymentData?.astroImage }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <Text
                style={{
                  ...Fonts.black16RobotoMedium,
                  marginLeft: Sizes.fixPadding,
                }}>
                {paymentData?.astroName}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => on_go_to_history()}
            style={{
              width: '70%',
              alignSelf: 'center',
              marginTop: Sizes.fixPadding * 1.5,
            }}>
            <LinearGradient
              colors={[Colors.primaryLight, Colors.primaryDark]}
              style={{
                width: '100%',
                paddingVertical: Sizes.fixPadding * 1.5,
                borderRadius: 1000,
              }}>
              <Text style={{ ...Fonts.white14RobotoMedium, textAlign: 'center' }}>
                {paymentData?.type == 'paid_pdf'
                  ? 'Download PDF'
                  : 'Go To My Course'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  function continueHalfPaymentButtonInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleHalfPayment()}
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginVertical: Sizes.fixPadding,
          borderRadius: Sizes.fixPadding * 1.4,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center', fontSize: 14 }}>
            Pay Half Payment
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function continueFullPaymentButtonInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleFullPayment()}
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginVertical: Sizes.fixPadding,
          borderRadius: Sizes.fixPadding * 1.4,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center', fontSize: 14 }}>
            Pay Full Payment
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
          <Text style={{ ...Fonts.black16RobotoMedium, fontWeight: "800" }}>
            ₹ {parseFloat(paymentData?.price).toFixed(2)}
          </Text>
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
          <Text style={{ ...Fonts.black16RobotoRegular }}>GST @ 18%</Text>
          <Text style={{ ...Fonts.black16RobotoRegular }}>₹ {gstAmount}</Text>
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
          <Text style={{ ...Fonts.black16RobotoRegular, fontWeight: "800" }}>
            ₹ {totalAmount}
          </Text>
        </View>
      </View>
    );
  }

  function remediesInfo() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 1.5,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <Text style={{ ...Fonts.primaryLight18RobotoMedium }}>
          {paymentData?.className}
        </Text>
        <Text
          style={{
            ...Fonts.gray14RobotoMedium,
            fontSize: 13,
            marginVertical: Sizes.fixPadding * 0.7,
          }}>
          {paymentData?.description}
        </Text>
      </View>
    );
  }

  function bannerInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 1.5,
          height: SCREEN_WIDTH * 0.55,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
          marginVertical: Sizes.fixPadding * 1,
        }}>
        <Image
          source={{ uri: paymentData?.image }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    );
  }

};

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CourseBookingDetails);


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
