import {
  View,
  Text,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MyHeader from '../../../components/MyHeader';
import Video from '../../../components/Courses/Video';
import { Colors, Fonts, Sizes } from '../../../assets/styles';

const WorkshopDetails = ({ route }) => {
  const data = route.params.workshop
  console.log("route.params data", data)

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
      <MyHeader title={'Workshop Class'} />
      <FlatList
        ListHeaderComponent={
          <>
            <Video uri={data?.video} />
            {courseTitleInfo()}
            {courseDescriptionInfo()}
            {downloadPDF()}
          </>
        }
      />
      {classDetailsInfo()}
    </View>
  )

  function downloadPDF() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Linking.openURL(data?.googleMeet)}
        style={{
          paddingVertical: Sizes.fixPadding,
          backgroundColor: Colors.grayLight,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: Sizes.fixPadding * 1.5,
          margin: Sizes.fixPadding * 2,
          borderColor: Colors.grayDark,
          borderWidth: 1,
        }}>
        <Text style={{
          ...Fonts.white14RobotoMedium,
          color: Colors.primaryDark
        }}>Download PDF</Text>
      </TouchableOpacity>
    )
  }

  function classDetailsInfo() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Linking.openURL(data?.googleMeet)}
        style={{
          paddingVertical: Sizes.fixPadding * 1.5,
          backgroundColor: Colors.primaryLight,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{
          ...Fonts.white14RobotoMedium,

        }}>Join the Workshop Class Now</Text>
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
          {data?.description}
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
          {data?.workShopName}
        </Text>
      </View>
    );
  }

}

export default WorkshopDetails