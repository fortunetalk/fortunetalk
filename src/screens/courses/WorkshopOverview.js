import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  import React from 'react';
  import MyHeader from '../../components/MyHeader';
  import moment from 'moment';
  import Video from '../../components/Courses/Video';
  import { Colors, Fonts, Sizes } from '../../assets/styles';
  import { navigate } from '../../utils/navigationServices';
  
  const WorkshopOverview = ({ navigation, route }) => {
  
    const demoData = {
      video: 'https://example.com/demo-video.mp4',
      course_name: 'React Native Course',
      description: 'This is a demo description of the React Native course. It covers the basics and advanced topics.',
      student_course: [
        { value: 'Introduction to React Native' },
        { value: 'Understanding Components' },
        { value: 'State and Props' },
        { value: 'Navigation' },
        { value: 'Networking' },
      ],
      demo_start_date: '2024-07-07T00:00:00Z', // ISO 8601 format date
      demo_start_time: '2024-07-07T19:00:00Z', // ISO 8601 format time
    };
  
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {liveVedioInfo()}
              {durationInfo()}
              {courseTitleInfo()}
              {courseDescriptionInfo()}
              {demoClassDatesInfo()}
            </>
          }
        />
        {demoClassDetailsInfo()}
      </View>
    );
  
    function demoClassDetailsInfo() {
      const onClick = () => {
        navigate("classDetails")
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
          <Text style={{ ...Fonts.white14RobotoMedium }}>Book Now</Text>
        </TouchableOpacity>
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
            Demo Class will be Conducted on
          </Text>
          <Text style={{ ...Fonts.gray14RobotoMedium, color: Colors.red_a }}>
            {`${moment(demoData?.demo_start_date).format(
              'Do MMMM YYYY',
            )} (${moment(demoData?.demo_start_time).format('hh:mm A')})`}{' '}
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
            {demoData?.description}
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
            {demoData?.course_name}
          </Text>
        </View>
      );
    }
  
    function durationInfo() {
      return (
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2,
            marginTop: Sizes.fixPadding,
          }}>
          <Text style={{ ...Fonts.gray14RobotoRegular }}>19.00 min Video</Text>
        </View>
      );
    }
  
    function liveVedioInfo() {
      return (
        <Video uri={demoData?.video} />
      );
    }
  
    function header() {
      return <MyHeader title={'Demo Class'} navigation={navigation} />;
    }
  };
  
  
  export default WorkshopOverview
  
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
  