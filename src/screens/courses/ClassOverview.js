import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import MyHeader from '../../components/MyHeader';
import Video from '../../components/Courses/Video';
import { Colors, Fonts, Sizes } from '../../assets/styles';
import { navigate } from '../../utils/navigationServices';
import { classifyTimeNoon } from '../../utils/tools';

const ClassOverview = ({ route }) => {
  const previousPagedata = route.params
  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.bodyColor
    }}>
      {header()}
      <FlatList
        ListHeaderComponent={
          <>
            {liveVedioInfo()}
            {courseTitleInfo()}
            {courseDescriptionInfo()}
            {demoClassDatesInfo()}
            {learningInfo()}
          </>
        }
      />
      {demoClassDetailsInfo()}
    </View>
  );

  function demoClassDetailsInfo() {
    const onClick = () => {
      navigate("classDetails", {
        class: previousPagedata.classData,
        title: previousPagedata.title,
      })
    }
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
        <Text style={{ ...Fonts.white14RobotoMedium }}>{previousPagedata.title} Details</Text>
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

  function liveVedioInfo() {
    return (
      <Video uri={previousPagedata.classData?.video} />
    );
  }

  function header() {
    return <MyHeader title={`${previousPagedata.title} Class`} />
  }
};


export default ClassOverview

const styles = StyleSheet.create({
  dots: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.gray,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 0.5,
  },
});
