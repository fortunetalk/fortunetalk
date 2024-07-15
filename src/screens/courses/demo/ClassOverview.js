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
import MyHeader from '../../../components/MyHeader';
import CourseRegistration from '../CourseRegistration';
import Video from '../../../components/Courses/Video';
import { classifyTimeNoon } from '../../../utils/tools';
import { navigate } from '../../../utils/navigationServices';
import { Colors, Fonts, Sizes } from '../../../assets/styles';
import * as CourseActions from '../../../redux/actions/courseActions'

const ClassOverview = ({
  route,
  customerData,
  demoClassBooked,
  dispatch,
}) => {
  const previousPagedata = route.params
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
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
    dispatch(CourseActions.demoClassBooked({
      demoClassId: previousPagedata.classData?._id,
      customerId: customerData?._id,
    }))
  }, [])

  const onClick = () => {
    if (previousPagedata?.isRegister) {
      if (!demoClassBooked) {
        updateState({ modalVisible: true })
      } else {
        navigate("classDetails", {
          class: previousPagedata.classData,
          title: previousPagedata.title,
        })
      }
    } else {
      navigate("classDetails", {
        class: previousPagedata.classData,
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
          astrologerId: previousPagedata.classData?.astrologerId?._id,
          demoClassId: previousPagedata.classData?._id,
          courseId: previousPagedata.classData?.courseId?._id,
          customerId: customerData?._id,
        }))
      }
      navigate("classDetails", {
        class: previousPagedata.classData,
        title: previousPagedata.title,
      })
      updateState({ modalVisible: false })
    }
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.bodyColor
    }}>
      <MyHeader title={`Demo Class`} />
      <FlatList
        ListHeaderComponent={
          <>
            <Video uri={previousPagedata.classData?.video} />
            {courseTitleInfo()}
            {courseDescriptionInfo()}
            {demoClassDatesInfo()}
            {learningInfo()}
          </>
        }
      />
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
        <Text>{previousPagedata.classData?.courseContent}</Text>
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
          {previousPagedata.title} will be Conducted on
        </Text>
        <Text style={{ ...Fonts.gray14RobotoMedium, color: Colors.red_a }}>
          {`${moment(previousPagedata.classData?.date).format(
            'Do MMMM YYYY',
          )}  (${previousPagedata.classData?.time} ${classifyTimeNoon(previousPagedata.classData?.time)})`}
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
          {previousPagedata.classData?.description}
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
          {previousPagedata.classData?.className}
        </Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  customerData: state.customer.customerData,
  demoClassBooked: state.courses.demoClassBooked,
  registerDemoclass: state.courses.registerDemoclass
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ClassOverview)
