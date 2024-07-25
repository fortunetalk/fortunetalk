import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Loader from '../../../components/Loader';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusBar';
import StepIndicator from 'react-native-step-indicator';
import { labels } from '../../../config/data';
import { Colors, Fonts, Sizes } from '../../../assets/styles';

const ProductTracking = ({ navigation }) => {
  const [state, setState] = useState({
    reviewModalVisible: false,
    productData: [],
    isLoading: false,
    ratingStar: 1,
    reviewMessage: '',
    statusData: null,
  });

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const {
    isLoading,
    statusData
  } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <View style={{ flex: 1 }}>
        <MyHeader title={"Tracker order"} />
        <FlatList
          ListHeaderComponent={
            <>
              {trackingInfo()}
              {messageInfo()}
              {ratingInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />
      </View>
    </View>
  );

  function ratingInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("rateProduct")}
        style={{
          alignSelf: 'center',
          backgroundColor: Colors.whiteDark,
          paddingVertical: Sizes.fixPadding * 0.5,
          paddingHorizontal: Sizes.fixPadding,
          borderRadius: 1000,
          marginVertical: Sizes.fixPadding * 1.5,
        }}>
        <Text style={{ ...Fonts.primaryDark16RobotoMedium }}>
          Rate this product now
        </Text>
      </TouchableOpacity>
    );
  }

  function messageInfo() {
    return (
      <Text style={{ ...Fonts.primaryDark16RobotoMedium, textAlign: 'center' }}>
        Hope you like our Product !!
      </Text>
    );
  }

  function trackingInfo() {
    const renderLabel = ({ position, stepStatus, label, currentPosition }) => {
      return (
        <View
          style={{
            flex: 0,
            width: '98%',
          }}>
          <Text style={{ ...Fonts.gray14RobotoMedium, color: Colors.blackLight }}>
            {label.title}
          </Text>
          {label.date && (
            <Text style={{ ...Fonts.gray12RobotoMedium }}>{label.date}</Text>
          )}
          {label.sub_title && (
            <Text
              style={{ ...Fonts.gray12RobotoMedium, color: Colors.blackLight }}>
              {label.sub_title}
            </Text>
          )}
          {label.sub_date && (
            <Text style={{ ...Fonts.black12RobotoRegular }}>
              {label.sub_date}
            </Text>
          )}
        </View>
      );
    };
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2,
          backgroundColor: Colors.grayD,
          elevation: 8,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          paddingHorizontal: Sizes.fixPadding * 2,
          height: 700,
          borderRadius: Sizes.fixPadding,
          shadowColor: Colors.blackLight,
        }}>
        <StepIndicator
          direction="vertical"
          customStyles={styles.customStyles}
          currentPosition={statusData?.status}
          labels={labels}
          renderLabel={renderLabel}
        />
      </View>
    );
  }
};

export default ProductTracking;

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
  customStyles: {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
    labelAlign: 'flex-start',
  },
});
