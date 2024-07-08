import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Video from '../../../components/Courses/Video';
import { Colors, Fonts, Sizes } from '../../../assets/styles';
import { check_current_day } from '../../../utils/tools';

const CurrentCoursesDetails = ({ navigation, route, userData }) => {
  
  const [liveData] = useState({
    "course_name": "React Native Development",
    "description": "This course covers all aspects of React Native development.",
    "video": "https://example.com/video.mp4",
    "course_live_tbl": [
      {
        "start_date": "2024-07-08",
        "start_time": "10:00 AM",
        "class_name": "Introduction to React Native",
        "description": "An introductory session to React Native.",
        "time_session_duration": 60,
        "status": 0,
        "time": 45,
        "is_live": 1,
        "unique_id": "12345"
      },
      {
        "start_date": "2024-07-09",
        "start_time": "11:00 AM",
        "class_name": "React Native Components",
        "description": "A session on React Native components.",
        "time_session_duration": 90,
        "status": 1,
        "time": 90,
        "is_live": 0,
        "unique_id": "12346"
      }
    ]
  }
  );

  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.bodyColor
    }}>
      <FlatList
        ListHeaderComponent={
          <>
            {liveVedioInfo()}
            {courseTitleInfo()}
            {courseDescriptionInfo()}
            {classInfo()}
            {questionPaperDownloadInfo()}
          </>
        }
      />
    </View>
  );

  function questionPaperDownloadInfo() {

    const handleNext = ()=>{

    }

    return (
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primaryDark]}
        style={{
          width: '90%',
          borderRadius: Sizes.fixPadding * 1.3,
          alignSelf: 'center',
          marginVertical: Sizes.fixPadding,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          onPress={() => handleNext()}
          activeOpacity={0.8}
          style={{ flex: 0, paddingVertical: Sizes.fixPadding * 0.8 }}>
          <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center', fontSize:16 }}>
            Download Certificate
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  function classInfo() {
    const renderItem = ({ item, index }) => {
      console.log(item)
      const isToday = check_current_day({ date: item.start_date });
      return (
        <>
          <View
            style={{
              paddingVertical: Sizes.fixPadding,
              paddingHorizontal: Sizes.fixPadding * 2,
              borderBottomWidth: 1,
              borderBottomColor: Colors.grayLight,
            }}>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{ ...Fonts.primaryLight14RobotoMedium }}>
                  Class {index + 1}
                  {item.status != 1 && (
                    <Text style={{ ...Fonts.gray12RobotoMedium }}>
                      {'  '}({item.time_session_duration} min)
                    </Text>
                  )}
                </Text>
                <Text style={{ ...Fonts.gray16RobotoMedium, fontSize: 15 }}>
                  {item.class_name}
                </Text>
              </View>
              {item.status == 1 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      ...Fonts.gray11RobotoRegular,
                      marginRight: Sizes.fixPadding * 0.2,
                    }}>
                    Completed
                  </Text>
                  <Ionicons
                    name="checkmark-circle"
                    color={Colors.blackLight}
                    size={20}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons
                    name="play-circle"
                    color={Colors.primaryLight}
                    size={22}
                  />
                  <Text
                    style={{ ...Fonts.primaryLight14RobotoMedium, fontSize: 12 }}>
                    Join
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Text
              style={{
                ...Fonts.gray12RobotoMedium,
                marginTop: Sizes.fixPadding * 0.6,
              }}>
              {item.description}
            </Text>
            <View style={{ alignSelf: 'flex-end' }}>
              {item.status == 1 ? (
                <Text style={{ ...Fonts.gray12RobotoRegular }}>
                  ({item.time} min Video){' '}
                  <Text style={{ color: Colors.primaryLight, fontSize: 11 }}>
                    Watch Again <MaterialIcons name="refresh" />
                  </Text>
                </Text>
              ) : (
                <Text style={{ ...Fonts.primaryDark11InterMedium }}>
                  Next Session at {moment(item?.start_date).format('DD MMMM')} ({moment(item?.start_time).format('hh A')})
                </Text>
              )}
            </View>
          </View>
          {item.status != 1 && isToday && (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={item?.is_live == 0}
              onPress={() => navigation.navigate('liveNow', {
                liveID: liveData?.unique_id,
                userID: userData?.id,
                userName: userData?.username,
              })}>
              <LinearGradient
                colors={item?.is_live == 0 ? [Colors.grayLight, Colors.gray] : [Colors.primaryLight, Colors.primaryDark]}
                style={{ paddingVertical: Sizes.fixPadding * 1.5 }}>
                <Text
                  style={{ ...Fonts.white18RobotMedium, textAlign: 'center' }}>
                  Connect to Class {index + 1} Now
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </>
      );
    };
    return (
      <FlatList data={liveData?.course_live_tbl} renderItem={renderItem} />
    );
  }

  function courseDescriptionInfo() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 2,
          paddingTop: Sizes.fixPadding,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <Text style={{ ...Fonts.gray12RobotoRegular }}>
          {liveData?.description}
        </Text>
      </View>
    );
  }

  function courseTitleInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2,
          marginTop: Sizes.fixPadding * 2,
        }}>
        <Text style={{ ...Fonts.primaryLight14RobotoRegular }}>
          {liveData?.course_name}
        </Text>
      </View>
    );
  }

  function liveVedioInfo() {
    return <Video uri={liveData?.video} />;
  }
};

const mapStateToProps = state => ({
  // userData: state.user.userData,
  // wallet: state.user.wallet,
});

export default connect(mapStateToProps, null)(CurrentCoursesDetails);
