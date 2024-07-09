import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import MyHeader from '../../../components/MyHeader';
import Video from '../../../components/Courses/Video';
import { Colors, Fonts, Sizes } from '../../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';

const ClassDetails = ({ route }) => {
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
        <Text style={{
          ...Fonts.black16RobotoRegular,
          marginBottom: Sizes.fixPadding
        }}>Course Content</Text>
        <Text
          style={{
            ...Fonts.gray12RobotoMedium,
            flex: 1,
          }}>
          {previousPagedata.class.courseContent}
        </Text>
      </View>
    );
  }

  function classInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Linking.openURL(previousPagedata.class?.googleMeet)}
        style={{ marginVertical: Sizes.fixPadding }}
      >
        <LinearGradient
          colors={previousPagedata.class?.classStatus == 0 ? [Colors.grayLight, Colors.grayDark] : [Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding * 1.5 }}>
          <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
            Join the Live {previousPagedata.title} Class Now
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
          {previousPagedata.class?.description}
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
          {previousPagedata.class?.className}
        </Text>
      </View>
    );
  }

  function liveVedioInfo() {
    return (
      <Video uri={previousPagedata.class?.video} />
    );
  }

  function header() {
    return <MyHeader title={`${previousPagedata.title} Class Details`} />;
  }
}

export default ClassDetails