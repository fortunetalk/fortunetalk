import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import React, { useEffect, useState } from 'react';
import NoDataFound from '../../components/NoDataFound';
import { Colors, SCREEN_WIDTH, Fonts, Sizes } from '../../assets/styles';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { navigate } from '../../utils/navigationServices';

const CompletedCourses = ({ completedLiveCourse }) => {
  const [state, setState] = useState({
    isLoading: false,
    courseData: null,
  });

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  useEffect(() => {
    updateState({ courseData: completedLiveCourse })
  }, [completedLiveCourse])

  const { isLoading, courseData } = state;

  // console.log("getCompletedLiveCourse  ====>>>", courseData)

  const renderItem = ({ item, index }) => {
    // console.log("item ====>>>>", item)
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          marginVertical: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2
        }}
        onPress={() => navigate("completedCoursesDetails", { course: item })}
      >
        <View style={styles.button}>
          <Text style={{
            ...Fonts.black16RobotoMedium,
            fontSize: 14,
            color: Colors.blackLight,
          }}>{item?.className}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.subButton}>
          <Text style={{ ...Fonts.white16RobotoMedium }}>Get Your Cirtificate</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <Loader visible={isLoading} />
      {courseData && (
        <FlatList
          data={courseData}
          renderItem={renderItem}
          contentContainerStyle={{ padding: Sizes.fixPadding * 2 }}
          ListEmptyComponent={<NoDataFound />}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  completedLiveCourse: state.courses.completedLiveCourse,
});

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CompletedCourses);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F8F8F8',
    padding: Sizes.fixPadding * 1.5,
    borderRadius: Sizes.fixPadding,
    elevation: 8,
    shadowColor: Colors.blackLight,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    zIndex: 1,
  },
  subButton: {
    flex: 0,
    width: SCREEN_WIDTH * 0.6,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    backgroundColor: Colors.primaryLight,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding * 2,
    bottom: Sizes.fixPadding,
    zIndex: -1,
    elevation: 8,
    shadowColor: Colors.blackLight,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
});
