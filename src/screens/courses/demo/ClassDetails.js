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
import moment from 'moment';

const ClassDetails = ({ route }) => {
  const previousPagedata = route.params
  const currentDate = moment().format('YYYY-MM-DD');
  const classDate = moment(previousPagedata.class.date).format('YYYY-MM-DD');
  const isToday = currentDate === classDate;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bodyColor
      }}>
      <MyHeader title={`${previousPagedata.title} Class Details`} />
      <FlatList
        ListHeaderComponent={
          <>
            <Video uri={previousPagedata.class?.video} />
            <View
              style={{
                marginHorizontal: Sizes.fixPadding * 2,
                marginTop: Sizes.fixPadding * 0.5,
              }}>
              <Text style={{ ...Fonts.black16RobotoRegular }}>
                {previousPagedata.class?.className}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: Sizes.fixPadding * 2,
                marginTop: Sizes.fixPadding * 0.5,
              }}>
              <Text style={{ ...Fonts.gray12RobotoRegular }}>
                {previousPagedata.class?.description}
              </Text>
            </View>
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
        disabled={!isToday}
      >
        <LinearGradient
          colors={!isToday ? [Colors.grayLight, Colors.grayDark] : [Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding * 1.5 }}>
          <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
            Join the Live {previousPagedata.title} Class Now
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default ClassDetails