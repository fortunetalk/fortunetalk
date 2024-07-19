import { connect } from 'react-redux';
import { regex } from '../../config/data.js';
import Loader from '../../components/Loader';
import CountryPicker from 'rn-country-picker';
import { Divider, Input } from '@rneui/themed';
import { Settings } from 'react-native-fbsdk-next';
import MyStatusBar from '../../components/MyStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import React, { createRef, useEffect, useState } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/styles.js'
import * as AuthActions from '../../redux/actions/authActions.js'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

Settings.initializeSDK('1403757197218563');

const Login = ({ dispatch, isLoading }) => {
  const [state, setState] = useState({
    callingCode: '91',
    cca2: 'IN',
    phoneNumber: '',
    errorMessage: '',
  });

  const inputRef = createRef();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data }
      return newData
    })
  }

  const { callingCode, cca2, phoneNumber, errorMessage, } = state;

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primaryDark]}
        style={{ flex: 1 }}>
        {skipInfo()}
        {imageInfo()}
        <View style={styles.bottomContainer}>
          <KeyboardAwareScrollView style={{ flex: 1 }}>
            {topTitleInfo()}
            {phoneInput()}
            {termsPrivacyInfo()}
            {submiteButtonInfo()}
            {orContinueInfo()}
            {socialLoginInfo()}
          </KeyboardAwareScrollView>
          {bottomViewInfo()}
        </View>
      </LinearGradient>
    </View>
  );

  function bottomViewInfo() {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginBottom: Sizes.fixPadding * 1.5,
        }}>
        <View style={{ flex: 0.3, alignItems: 'center' }}>
          <Image
            source={require('../../assets/icons/verified_user.png')}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ ...Fonts.gray14RobotoRegular, textAlign: 'center' }}>
            Verified Genuine{'\n'}Astrologers
          </Text>
        </View>
        <Divider orientation="vertical" />
        <View style={{ flex: 0.3, alignItems: 'center' }}>
          <Image
            source={require('../../assets/icons/private_lock.png')}
            style={{ width: 25, height: 25 }}
          />
          <Text style={{ ...Fonts.gray14RobotoRegular, textAlign: 'center' }}>
            100%{'\n'}Private
          </Text>
        </View>
      </View>
    );
  }

  function socialLoginInfo() {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: Sizes.fixPadding * 2,
          marginVertical: Sizes.fixPadding * 2,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => dispatch(AuthActions.onFacebookLogin())}
          style={{
            ...styles.socialButton,
            backgroundColor: Colors.blueFacebook,
          }}>
          <Image
            source={require('../../assets/icons/facebook_login.png')}
            style={{
              width: Sizes.fixPadding * 2.5,
              height: Sizes.fixPadding * 2.5,
            }}
          />
          <Text
            style={{
              ...Fonts._13RobotoMedium,
              color: Colors.white,
              marginLeft: Sizes.fixPadding,
            }}>
            Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => dispatch(AuthActions.onGoogleLogin())}
          style={{
            ...styles.socialButton,
            backgroundColor: Colors.white,
            borderWidth: 0.5,
            borderColor: Colors.gray,
          }}>
          <Image
            source={require('../../assets/icons/google_logo.png')}
            style={{
              width: Sizes.fixPadding * 2.5,
              height: Sizes.fixPadding * 2.5,
            }}
          />
          <Text
            style={{
              ...Fonts._13RobotoMedium,
              color: Colors.blackLight,
              marginLeft: Sizes.fixPadding,
            }}>
            Google
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function orContinueInfo() {
    return (
      <Text style={{ ...Fonts._15InterRegular, color: Colors.blackLight, textAlign: 'center' }}>
        Or Continue With
      </Text>
    );
  }

  function submiteButtonInfo() {
    const onSubmit = () => {
      if (phoneNumber.length == 0) {
        updateState({ errorMessage: 'Please enter a phone number' })
        return
      } else if (!regex.phoneNumber.test(phoneNumber)) {
        updateState({ errorMessage: 'Invalid phone number' })
        return
      } else {
        dispatch(AuthActions.onLogin({ phoneNumber, callingCode }))
      }
    }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onSubmit()}
        style={{
          width: '65%',
          marginBottom: Sizes.fixPadding * 2,
          marginTop: Sizes.fixPadding * 0.8,
          alignSelf: 'center',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{
            width: '100%',
            paddingVertical: Sizes.fixPadding,
            borderRadius: Sizes.fixPadding * 1.5,
          }}>
          <Text style={{ ...Fonts._15RobotMedium, color: Colors.white, textAlign: 'center' }}>
            Send OTP
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function termsPrivacyInfo() {
    return (
      <Text
        style={{
          ...Fonts._11InterRegular,
          fontSize: 10,
          color: Colors.blackLight,
          textAlign: 'center',
          marginHorizontal: Sizes.fixPadding,
        }}>
        By continue you agree to our Terms of use & Privacy Policy
      </Text>
    );
  }

  function phoneInput() {
    const onChangeText = text => {
      updateState({ phoneNumber: text, errorMessage: '' });
    };
    return (
      <Input
        ref={inputRef}
        placeholder="Enter Mobile No."
        keyboardType="number-pad"
        maxLength={10}
        onChangeText={text => onChangeText(text)}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{ ...Fonts.black14RobotoRegular }}
        errorMessage={errorMessage}
        errorStyle={{ textAlign: 'center' }}
        leftIcon={
          <View style={styles.flagContainer}>
            <CountryPicker
              animationType='slide'
              countryCode={callingCode}
              pickerTitleStyle={styles.pickerTitleStyle}
              pickerContainerStyle={styles.pickerStyle}
              dropDownIconStyle={{ width: 0 }}
              countryFlagStyle={{
                borderRadius: 4,
                width: 30,
                height: 20,
                resizeMode: 'cover',
                overflow: 'hidden'
              }}
              containerButtonStyle={{}}
              selectedValue={text => {
                console.log(text);
                updateState({ callingCode: text.callingCode, cca2: text.cca2 })
              }}
            />
          </View>
        }
      />
    );
  }

  function topTitleInfo() {
    return (
      <Text
        style={{
          ...Fonts._15RobotMedium,
          color: Colors.primaryLight,
          textAlign: 'center',
        }}>
        Get Started With Fortune Talk!
      </Text>
    );
  }

  function imageInfo() {
    return (
      <View style={{ flex: 0.35 }}>
        <Image
          source={require('../../assets/images/transparent_logo.png')}
          style={{
            width: '40%',
            height: '100%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </View>
    );
  }

  function skipInfo() {
    const on_skip = async () => {
      await AsyncStorage.setItem(
        'isRegister',
        JSON.stringify({ type: 'login', value: false }),
      );
      // go_home();
    };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={on_skip}
        style={{
          flex: 0,
          alignSelf: 'flex-end',
          marginHorizontal: Sizes.fixPadding * 2,
          marginVertical: Sizes.fixPadding
        }}>
        <Text style={{ ...Fonts.white14RobotoRegular }}>Skip</Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 0.65,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Sizes.fixPadding * 7,
    paddingTop: Sizes.fixPadding * 2,
  },
  inputContainer: {
    marginHorizontal: Sizes.fixPadding * 3,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    borderRadius: Sizes.fixPadding * 2,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: 0,
    marginTop: Sizes.fixPadding * 2,
    overflow: 'hidden'
  },
  flagContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: Colors.grayLight,
  },
  socialButton: {
    flex: 0,
    width: '42%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 0.5,
    borderRadius: Sizes.fixPadding,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleText: {
    color: '#000',
    fontSize: 25,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  pickerStyle: {
    height: 40,
    width: 50,
    marginVertical: 10,
    borderRadius: 0,
    borderWidth: 0,
    fontSize: 16,
    color: "#000",
  },
  selectedCountryTextStyle: {
    color: '#000',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    // paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
  },
});
