import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Text, View } from 'react-native'
import { FlatList } from 'react-native';
import { Colors } from '../../assets/styles';
import Loader from '../../components/Loader';
import MyHeader from '../../components/MyHeader';
import LiveClassCategory from './LiveClassCategory';
import CompletedCourses from './CompletedCourses';
import CurrentCourses from './CurrentCourses';
import MyStatusBar from '../../components/MyStatusBar';
import * as CourseActions from '../../redux/actions/courseActions'

const MyCourses = ({ isLoading, route, dispatch, currentLiveCourse }) => {
  const [activeFilter, setActiveFilter] = useState(1);

  useEffect(() => {
    dispatch(CourseActions.onCurrentLiveCourseHistory())
    dispatch(CourseActions.onCompletedLiveCourseHistory())
  }, [])

  // console.log("currentLiveCourse =====>>>>", currentLiveCourse)

  const filterData = [
    { id: 1, title: 'Current Course' },
    { id: 2, title: 'Completed Course' },
  ];

  const updateState = (newState) => {
    setActiveFilter(newState.activeFilter);
  };

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
      <Loader visible={isLoading} />
      <MyHeader title={`My Courses`} />

      <LiveClassCategory
        filterData={filterData}
        updateState={updateState}
        activeFilter={activeFilter}
      />
      <FlatList ListHeaderComponent={
        <>
          {activeFilter == 1 && <CurrentCourses />}
          {activeFilter == 2 && <CompletedCourses />}
        </>
      }
      />
    </View>
  )
}

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  currentLiveCourse: state.courses.currentLiveCourse,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses)
