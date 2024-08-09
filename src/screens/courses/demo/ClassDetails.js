import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import MyHeader from '../../../components/MyHeader';
import Video from '../../../components/Courses/Video';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Sizes } from '../../../assets/styles';
import * as CourseActions from '../../../redux/actions/courseActions'

const ClassDetails = ({ route, singleDemoClass, customerData, dispatch }) => {
  const previousPagedata = route.params

  const currentDate = moment().format('YYYY-MM-DD');
  const classDate = moment(singleDemoClass?.date).format('YYYY-MM-DD');
  const isToday = currentDate === classDate;

  useEffect(() => {
    dispatch(CourseActions.onGetSingleDemoClass({
      classId: previousPagedata.id,
    }))
  }, [])

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
            <Video uri={singleDemoClass?.video} />
            <View
              style={{
                marginHorizontal: Sizes.fixPadding * 2,
                marginTop: Sizes.fixPadding * 0.5,
              }}>
              <Text style={{ ...Fonts.black16RobotoRegular }}>
                {singleDemoClass?.className}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: Sizes.fixPadding * 2,
                marginTop: Sizes.fixPadding * 0.5,
              }}>
              <Text style={{ ...Fonts.gray12RobotoRegular }}>
                {singleDemoClass?.description}
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
          {singleDemoClass.courseContent}
        </Text>
      </View>
    );
  }

  function classInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Linking.openURL(singleDemoClass?.googleMeet)}
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

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  customerData: state.customer.customerData,
  singleDemoClass: state.courses.singleDemoClass
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetails)
