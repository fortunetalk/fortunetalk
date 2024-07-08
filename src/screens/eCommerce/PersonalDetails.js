import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Input } from '@rneui/themed';
import React, { useState } from 'react';
import Loader from '../../components/Loader';
import MyHeader from '../../components/MyHeader';
import MyStatusBar from '../../components/MyStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Notifications from '../../utils/notifiactionManager';
import { Colors, Fonts, Sizes } from '../../assets/styles';

const PersonalDetails = ({ navigation, route, userData }) => {
  const [state, setState] = useState({
    cartData: [],
    name: "Durgesh",
    emailId: "Durgesh",
    phoneNumber: "8052941488",
    address: "Noida sector 90",
    landmark: '',
    city: '',
    countryState: '',
    pincode: '',
    showPayment: false,
    amount: route?.params?.amount,
    isLoading: false
  });

  const validation = () => {
    if (name.length == 0) {
      Notifications('Please enter your name.');
      return false;
    } else if (emailId.length == 0) {
      Notifications('Please enter your email address.');
      return false;
    } else if (phoneNumber.length == 0) {
      Notifications('Please enter your phone number.');
      return false;
    } else if (phoneNumber.length != 10) {
      Notifications('Please enter your correct phone number.');
      return false;
    } else if (address.length == 0) {
      Notifications('Please enter your address.');
      return false;
    } else if (landmark.length == 0) {
      Notifications('Please enter your landmark.');
      return false;
    } else if (city.length == 0) {
      Notifications('Please enter your city.');
      return false;
    } else if (countryState.length == 0) {
      Notifications('Please enter your state.');
      return false;
    } else if (pincode.length == 0) {
      Notifications('Please enter your pincode.');
      return false;
    } else {
      return true;
    }
  };

  const request_permission = async () => {
  };

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const {
    name,
    emailId,
    phoneNumber,
    address,
    landmark,
    city,
    countryState,
    pincode,
    showPayment,
    amount,
    cartData,
    isLoading
  } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <View style={{ flex: 1 }}>
        <MyHeader title={"Details"} />
        <FlatList
          ListHeaderComponent={
            <>
              {titleInfo()}
              {nameFieldInfo()}
              {emailFieldInfo()}
              {phoneFieldInfo()}
              {addressFieldInfo()}
              {landMarkFieldInfo()}
              {cityAndStateField()}
              {pincodeInfo()}
              {currentLocationInfo()}
              {continueButtonInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />
      </View>
    </View>
  );

  function continueButtonInfo() {
    const on_payment = () => {
      navigation.navigate("productSuccessBooking")
    };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => on_payment()}
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginVertical: Sizes.fixPadding * 1.5,
          borderRadius: 1000,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding * 1 }}>
          <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
            Proceed for Payment
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function currentLocationInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => request_permission()}
        style={[styles.row, { alignSelf: 'center' }]}>
        <MaterialCommunityIcons
          name="crosshairs-gps"
          color={Colors.primaryLight}
          size={26}
        />
        <Text
          style={{
            ...Fonts.primaryLight18RobotoMedium,
            marginLeft: Sizes.fixPadding,
          }}>
          Current Location
        </Text>
      </TouchableOpacity>
    );
  }

  function pincodeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginBottom: Sizes.fixPadding * 1.5,
        }}>
        <Input
          value={pincode}
          placeholder="Pincode"
          placeholderTextColor={Colors.gray}
          onChangeText={text => updateState({ pincode: text })}
          keyboardType="phone-pad"
          inputStyle={styles.inputStyle}
          containerStyle={[styles.containerStyle, { width: '47%' }]}
          inputContainerStyle={styles.inputContainerStyle}
        />
      </View>
    );
  }

  function cityAndStateField() {
    return (
      <View
        style={[
          styles.row,
          {
            marginHorizontal: Sizes.fixPadding * 2,
            justifyContent: 'space-between',
            marginBottom: Sizes.fixPadding * 1.5,
          },
        ]}>
        <Input
          value={city}
          placeholder="City"
          placeholderTextColor={Colors.gray}
          onChangeText={text => updateState({ city: text })}
          inputStyle={styles.inputStyle}
          containerStyle={[styles.containerStyle, { width: '47%' }]}
          inputContainerStyle={styles.inputContainerStyle}
        />
        <Input
          value={countryState}
          placeholder="State"
          placeholderTextColor={Colors.gray}
          onChangeText={text => updateState({ countryState: text })}
          inputStyle={styles.inputStyle}
          containerStyle={[styles.containerStyle, { width: '47%' }]}
          inputContainerStyle={styles.inputContainerStyle}
        />
      </View>
    );
  }

  function landMarkFieldInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginBottom: Sizes.fixPadding * 1.5,
        }}>
        <Input
          value={landmark}
          placeholder="Landmark"
          placeholderTextColor={Colors.gray}
          onChangeText={text => updateState({ landmark: text })}
          inputStyle={styles.inputStyle}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
        />
      </View>
    );
  }

  function addressFieldInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginBottom: Sizes.fixPadding * 1.5,
        }}>
        <Input
          value={address}
          placeholder="Address"
          placeholderTextColor={Colors.gray}
          onChangeText={text => updateState({ address: text })}
          inputStyle={styles.inputStyle}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
        />
      </View>
    );
  }

  function phoneFieldInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginBottom: Sizes.fixPadding * 1.5,
        }}>
        <Input
          value={phoneNumber}
          placeholder="Phone No."
          maxLength={10}
          placeholderTextColor={Colors.gray}
          keyboardType="phone-pad"
          onChangeText={text => updateState({ phoneNumber: text })}
          inputStyle={styles.inputStyle}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
        />
      </View>
    );
  }

  function emailFieldInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginBottom: Sizes.fixPadding * 1.5,
        }}>
        <Input
          value={emailId}
          placeholder="Email ID"
          placeholderTextColor={Colors.gray}
          inputStyle={styles.inputStyle}
          keyboardType="email-address"
          onChangeText={text => updateState({ emailId: text })}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
        />
      </View>
    );
  }

  function nameFieldInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginBottom: Sizes.fixPadding * 1.5,
        }}>
        <Input
          value={name}
          placeholder="Name"
          placeholderTextColor={Colors.gray}
          onChangeText={text => updateState({ name: text })}
          inputStyle={styles.inputStyle}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
        />
      </View>
    );
  }

  function titleInfo() {
    return (
      <Text
        style={{
          ...Fonts.black18RobotoRegular,
          color: Colors.red,
          textAlign: 'center',
          marginBottom: Sizes.fixPadding,
        }}>
        Enter the details
      </Text>
    );
  }
};

export default PersonalDetails;

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
  inputStyle: {
    ...Fonts.black14InterMedium,
  },
  containerStyle: {
    backgroundColor: Colors.whiteDark,
    borderRadius: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding * 1,
    height: 60,
  },
  inputContainerStyle: {
    marginBottom: 0,
    paddingBottom: 0,
    height: 40,
    borderBottomColor: Colors.gray + '80',
  },
});
