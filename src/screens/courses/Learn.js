import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import Loader from '../../components/Loader';
import React, { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusBar';
import NoDataFound from '../../components/NoDataFound';
import { navigate } from '../../utils/navigationServices';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as CourseActions from '../../redux/actions/courseActions'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../assets/styles';
import MyHeader from '../../components/MyHeader';

const Learn = ({
  navigation,
  courseList,
  dispatch,
  isLoading,
}) => {

  useEffect(() => {
    if (!courseList) {
      dispatch(CourseActions.getCourseList())
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <MyHeader title={"Course"} />
      <View style={{ flex: 1 }}>
        {myCoursesInfo()}
        <FlatList
          ListHeaderComponent={
            <>
              {courseList && courseDataInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />
      </View>
    </View>
  )

  function myCoursesInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('mycourse')}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={[
            styles.row,
            { justifyContent: 'center', paddingVertical: Sizes.fixPadding },
          ]}>
          <Image
            source={require('../../assets/icons/e-learning.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text
            style={{
              ...Fonts.white18RobotMedium,
              marginLeft: Sizes.fixPadding,
              fontSize: Sizes.fixPadding * 1.4
            }}>
            My Courses
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function courseDataInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigate("Courses", { course: item })}
          style={{
            width: SCREEN_WIDTH * 0.45,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            marginBottom: Sizes.fixPadding * 1.5,
            padding: Sizes.fixPadding * 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: Sizes.fixPadding * 2,
          }}>
          <View
            style={{
              width: '100%',
              height: SCREEN_WIDTH * 0.4,
              borderTopLeftRadius: Sizes.fixPadding,
              borderTopRightRadius: Sizes.fixPadding,
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              overflow: 'hidden',
            }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>

          <LinearGradient
            colors={[Colors.whiteDark, Colors.grayLight]}
            style={{
              width: '100%',
              backgroundColor: Colors.whiteDark,
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              position: 'absolute',
              bottom: Sizes.fixPadding,
              paddingVertical: Sizes.fixPadding * 0.3,
              borderRadius: Sizes.fixPadding * 0.7,
              shadowColor: Colors.blackLight,
            }}>
            <Text
              style={[
                { ...Fonts.black14InterMedium },
                {
                  textAlign: 'center',
                  fontSize: 12,
                  color: Colors.gray
                }]}>
              {item.title}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={courseList}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-evenly' }}
          ListEmptyComponent={<NoDataFound />}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  courseList: state.courses.courseList,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Learn)

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.fixPadding * 1.5,
    paddingVertical: Sizes.fixPadding * 1.3,
    borderBottomWidth: 2,
    borderBlockColor: Colors.grayLight,
  }
});