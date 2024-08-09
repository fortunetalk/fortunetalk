import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import MyHeader from '../../components/MyHeader';
import CourseRegistration from './CourseRegistration';
import Video from '../../components/Courses/Video';
import { classifyTimeNoon } from '../../utils/tools';
import MyStatusBar from '../../components/MyStatusBar';
import { navigate } from '../../utils/navigationServices';
import { Colors, Fonts, Sizes } from '../../assets/styles';
import * as CourseActions from '../../redux/actions/courseActions'
import Loader from '../../components/Loader';

const ClassOverview = ({
  route,
  customerData,
  demoClassBooked,
  dispatch,
  singleDemoClass,
  isLoading
}) => {
  const previousPagedata = route.params
  const [state, setState] = useState({
    name: customerData?.customerName,
    phoneNumber: customerData?.phoneNumber,
    modalVisible: false,
  })
  const { name, phoneNumber, modalVisible } = state

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  useEffect(() => {
    dispatch(CourseActions.onGetSingleDemoClass({
      classId: previousPagedata.id,
    }))
    dispatch(CourseActions.demoClassBooked({
      demoClassId: previousPagedata.id,
      customerId: customerData?._id,
    }))
  }, [])

  const onClick = () => {
    if (previousPagedata?.isRegister) {
      if (!demoClassBooked) {
        updateState({ modalVisible: true })
      } else {
        navigate("classDetails", {
          id: singleDemoClass?._id,
          title: previousPagedata.title,
        })
      }
    } else {
      navigate("classDetails", {
        id: singleDemoClass?._id,
        title: previousPagedata.title,
      })
    }
  }

  const handleRegistration = () => {
    if (name.length < 1) {
      Alert.alert("Name Required")
    } else if (phoneNumber.length < 9) {
      Alert.alert("Phone Number Required")
    } else {
      if (!demoClassBooked) {
        dispatch(CourseActions.bookdemoClass({
          customerName: name,
          mobileNumber: phoneNumber,
          astrologerId: singleDemoClass?.astrologerId?._id,
          demoClassId: singleDemoClass?._id,
          courseId: singleDemoClass?.courseId?._id,
          customerId: customerData?._id,
          navigateUrl: "classDetails"
        }))
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bodyColor
      }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <MyHeader title={`Demo Class`} />
      {singleDemoClass && <FlatList
        ListHeaderComponent={
          <>
            <Video uri={singleDemoClass?.video} />
            {courseTitleInfo()}
            {courseDescriptionInfo()}
            {demoClassDatesInfo()}
            {learningInfo()}
          </>
        }
      />}
      {demoClassDetailsInfo()}

      <CourseRegistration
        visible={modalVisible}
        onClose={() => updateState({ modalVisible: false })}
        handleRegistration={handleRegistration}
        updateState={updateState}
        name={name}
        phoneNumber={phoneNumber}
      />

    </View>
  );

  function demoClassDetailsInfo() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClick}
        style={{
          margin: Sizes.fixPadding * 2,
          paddingVertical: Sizes.fixPadding,
          backgroundColor: Colors.primaryLight,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: Sizes.fixPadding * 1.5,
        }}>
        <Text style={{ ...Fonts.white14RobotoMedium }}>Demo Details</Text>
      </TouchableOpacity>
    );
  }

  function learningInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding }}>
        <Text
          style={{
            ...Fonts.black16RobotoRegular,
            marginBottom: Sizes.fixPadding,
          }}>
          What will you learn from this Course ?
        </Text>
        <Text style={{ color: Colors.blackLight }} >{singleDemoClass?.courseContent}</Text>
      </View>
    );
  }

  function demoClassDatesInfo() {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Colors.grayLight,
          paddingVertical: Sizes.fixPadding,
          alignItems: 'center',
        }}>
        <Text style={{ ...Fonts.gray14RobotoRegular }}>
          {singleDemoClass?.className} will be Conducted on
        </Text>
        <Text style={{ ...Fonts.gray14RobotoMedium, color: Colors.red_a }}>
          {`${moment(singleDemoClass?.date).format('Do MMMM YYYY')} (${singleDemoClass?.time || "-"} ${classifyTimeNoon(singleDemoClass?.time) || "-"})`}
        </Text>
      </View>
    );
  }

  function courseDescriptionInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginTop: Sizes.fixPadding * 0.5,
        }}>
        <Text style={{ ...Fonts.gray12RobotoRegular }}>
          {singleDemoClass?.description}
        </Text>
      </View>
    );
  }

  function courseTitleInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginTop: Sizes.fixPadding * 0.5,
        }}>
        <Text style={{ ...Fonts.black16RobotoRegular }}>
          {singleDemoClass?.className}
        </Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  customerData: state.customer.customerData,
  demoClassBooked: state.courses.demoClassBooked,
  registerDemoclass: state.courses.registerDemoclass,
  singleDemoClass: state.courses.singleDemoClass
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ClassOverview)
