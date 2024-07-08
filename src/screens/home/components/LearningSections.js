import { connect } from 'react-redux';
import React, { useEffect } from 'react'
import * as CourseActions from '../../../redux/actions/courseActions'
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { navigate } from '../../../utils/navigationServices';

const LearningSections = ({ courseList, dispatch, isLoading }) => {

  useEffect(() => {
    if (!courseList) {
      dispatch(CourseActions.getCourseList())
    }
  }, [])

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() => navigation.navigate('tarotTeachers', {data: item})}
        style={{
          width: SCREEN_WIDTH * 0.55,
          marginLeft: Sizes.fixPadding * 1.5,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
          borderWidth: 0,
          borderColor: Colors.primaryLight,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          marginBottom: Sizes.fixPadding * 1.5,
          shadowColor: Colors.black,
          backgroundColor: Colors.white,
        }}>
        <Image
          source={{ uri: item?.image }}
          style={{
            width: '100%',
            height: SCREEN_WIDTH * 0.3,
            borderTopLeftRadius: Sizes.fixPadding,
            borderTopRightRadius: Sizes.fixPadding,
          }}
        />
        <Text
          style={{
            ...Fonts.black14RobotoRegular,
            textAlign: 'center',
            paddingVertical: Sizes.fixPadding * 0.5,
          }}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Learning Section</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate('learn')}>
          <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={courseList}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  courseList: state.courses.courseList,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(LearningSections)

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});