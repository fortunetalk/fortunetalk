import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import Video from '../../components/Courses/Video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts, Sizes } from '../../assets/styles';
import MyStatusBar from '../../components/MyStatusBar';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as CourseActions from '../../redux/actions/courseActions'

const CompletedCoursesDetails = ({ route, liveClassOfClass, dispatch }) => {
  // console.log("CompletedCoursesDetails ===>>>", route.params.course)
  const classData = route.params.course

  useEffect(() => {
    dispatch(CourseActions.liveClassOfClass({ liveClassId: classData?._id }));
  }, [])

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
            <Video uri={classData?.video} />
            {courseTitleInfo()}
            {courseDescriptionInfo()}
            {classInfo()}
          </>
        }
      />
      {downloadCertificateInfo()}
    </View>
  );

  function downloadCertificateInfo() {
    return (
      <TouchableOpacity style={{
        margin: Sizes.fixPadding * 2,
        paddingVertical: Sizes.fixPadding,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding * 1.5
      }}>
        <Text style={{ ...Fonts.white14RobotoMedium }}>Download Certificate</Text>
      </TouchableOpacity>
    );
  }

  function classInfo() {
    const renderItem = ({ item, index }) => {
      return (
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
                {item.class_name}
                {item.status != 1 && (
                  <Text style={{ ...Fonts.gray12RobotoMedium }}>
                    {'  '}({item.time} min)
                  </Text>
                )}
              </Text>
              <Text style={{ ...Fonts.gray16RobotoMedium, fontSize: 15 }}>
                {item.title}
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
                Next Session at 10 October (10 am)
              </Text>
            )}
          </View>
        </View>
      );
    };
    return (
      <FlatList
        data={liveClassOfClass}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
          {classData?.description}
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
          {classData?.className}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  liveClassOfClass: state.courses.liveClassOfClass,
});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(CompletedCoursesDetails);
