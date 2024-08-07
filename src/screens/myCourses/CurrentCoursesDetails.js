import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import McqInstruction from './McqInstruction';
import MyHeader from '../../components/MyHeader';
import Video from '../../components/Courses/Video';
import { check_current_day } from '../../utils/tools';
import MyStatusBar from '../../components/MyStatusBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Sizes } from '../../assets/styles';
import * as CourseActions from '../../redux/actions/courseActions'
import * as MCQActions from '../../redux/actions/McqActions'
import { navigate } from '../../utils/navigationServices';

const CurrentCoursesDetails = ({
  dispatch,
  route,
  liveClassOfClass,
  getMCQ,
  customerData,
  attemptedMCQ }) => {
  const classData = route.params.course
  const [modal, setModal] = useState(false)

  console.log("attemptedMCQ =====>>>", attemptedMCQ)

  useEffect(() => {
    dispatch(CourseActions.liveClassOfClass({ liveClassId: classData?.liveId?._id }));
    dispatch(MCQActions.onGetMCQ({ liveClassId: classData?.liveId?._id }));
    dispatch(MCQActions.onAttemptedTimesMCQc({ liveClassId: classData?.liveId?._id, customerId: customerData?._id }));
  }, [])

  const handleContinue = () => {
    setModal(false)
    navigate("mcqtest")
  }

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
      <MyHeader title={"Course Details"} />
      <FlatList
        ListHeaderComponent={
          <>
            <Video uri={classData?.liveId?.video} />
            {courseTitleInfo()}
            {courseDescriptionInfo()}
            {classInfo()}
          </>
        }
      />
      {(attemptedMCQ?.entryCount && (attemptedMCQ?.entryCount < 3) ) && mcq()}
      <McqInstruction
        handleContinue={handleContinue}
        visible={modal}
        onClose={() => setModal(false)}
        questions={getMCQ?.totalQuestions}
        time={getMCQ?.totalTime}
        marks={getMCQ?.totalMarks}
      />
    </View>
  );

  function mcq() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModal(true)}
        style={{
          marginHorizontal: Sizes.fixPadding * 3,
          marginVertical: Sizes.fixPadding * 2,
          borderRadius: Sizes.fixPadding * 4,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center', fontSize: 14 }}>
            Click Here for MCQ's Test
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function classInfo() {
    const renderItem = ({ item, index }) => {
      const isToday = check_current_day({ date: item.date });
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
                  {item.status != "Active" && (
                    <Text style={{ ...Fonts.gray12RobotoMedium }}>
                      {'  '}({item.sessionTime} min)
                    </Text>
                  )}
                </Text>
                <Text style={{ ...Fonts.gray16RobotoMedium, fontSize: 15 }}>
                  {item.className}
                </Text>
              </View>
              {item.status != "Active" ? (
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
              {item.status == "Active" && (
                <Text style={{ ...Fonts.primaryDark11InterMedium }}>
                  Next Session at {moment(item?.date).format('DD MMMM')} ({moment(item?.time).format("hh:mm A")})
                </Text>
              )}
            </View>
          </View>
          {item.status == "Active" && isToday && (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={item?.status != "Active"}
              onPress={() => Linking.openURL(item?.googleMeet)}
            >
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
      <FlatList data={liveClassOfClass} renderItem={renderItem} />
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
          {classData?.liveId?.description}
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
          {classData?.liveId?.className}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  currentLiveCourse: state.courses.currentLiveCourse,
  getMCQ: state.Mcq.getMCQ,
  attemptedMCQ: state.Mcq.attemptedMCQ,
  liveClassOfClass: state.courses.liveClassOfClass,
  customerData: state.customer.customerData,

});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(CurrentCoursesDetails);

