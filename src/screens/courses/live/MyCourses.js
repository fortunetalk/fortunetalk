import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Text, View } from 'react-native'
import { FlatList } from 'react-native';
import { Colors } from '../../../assets/styles';
import MyStatusBar from '../../../components/MyStatusBar';
import Loader from '../../../components/Loader';
import MyHeader from '../../../components/MyHeader';
import LiveClassCategory from './LiveClassCategory';
import CurrentCoursesDetails from './CurrentCoursesDetails';

const MyCourses = ({ isLoading, route }) => {
  const [activeFilter, setActiveFilter] = useState(1);
  const previousPagedata = route.params
  const filterData = [
    { id: 1, title: 'Current Course' },
    { id: 2, title: 'Completed Course' },
  ];

  const updateState = (newState) => {
    setActiveFilter(newState.activeFilter);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <MyHeader title={`${previousPagedata.title} Class`} />

      <LiveClassCategory
        filterData={filterData}
        updateState={updateState}
        activeFilter={activeFilter}
      />
      <FlatList ListHeaderComponent={
        <>
          {activeFilter == 1 && <CurrentCoursesDetails classData={previousPagedata.classData} />}
          {activeFilter == 2 && <Text>durgeh</Text>}
        </>
      }
      />
    </View>
  )
}

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  courseList: state.courses.courseList,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses)
