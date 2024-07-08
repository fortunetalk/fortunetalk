import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MyHeader from '../../components/MyHeader';
import Video from '../../components/Courses/Video';
import { Colors, Fonts, Sizes } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';

const ClassDetails = ({ navigation, route }) => {
 
  const demoData = {
    video: 'https://example.com/demo-video.mp4',
    course_name: 'React Native Course',
    description: 'This is a demo description of the React Native course. It covers the basics and advanced topics.',
    course_content: 'Introduction to React Native, Components, State and Props, Navigation, Networking, and more.',
    is_live: 1, 
  };

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
            {durationInfo()}
            {courseTitleInfo()}
            {courseDescriptionInfo()}
            {classInfo()}
            {learningInfo()}
          </>
        }
      />
    </View>
  );

  function learningInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2 }}>
        <Text style={{ ...Fonts.black16RobotoRegular, marginBottom: Sizes.fixPadding }}>Course Content</Text>
        <Text
          style={{
            ...Fonts.gray12RobotoMedium,
            flex: 1,
          }}>
          {demoData?.course_content}
        </Text>
      </View>
    );
  }

  function classInfo() {
    const on_live = async () => {
     
    }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={demoData?.is_live == 0}
        onPress={on_live}
        style={{ marginVertical: Sizes.fixPadding }}
      >
        <LinearGradient
          colors={demoData?.is_live == 0 ? [Colors.grayLight, Colors.grayDark] : [Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding * 1.5 }}>
          <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
            Join the Live Demo Class Now
          </Text>
        </LinearGradient>
      </TouchableOpacity>
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
    return <MyHeader title={'Demo Class Details'} navigation={navigation} />;
  }
}

export default ClassDetails