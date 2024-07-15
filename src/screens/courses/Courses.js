import React, { useState } from 'react'
import { connect } from 'react-redux';
import { View } from 'react-native'
import { FlatList } from 'react-native';
import { Colors } from '../../assets/styles';
import MyStatusBar from '../../components/MyStatusBar';
import Loader from '../../components/Loader';
import MyHeader from '../../components/MyHeader';
import CourseCategory from './CourseCategory';
import DemoClass from './demo/DemoClass';
import LiveClass from './live/LiveClass';
import TeachersList from './TeachersList';
import Workshop from './workshop/Workshop';

const Courses = ({ isLoading, route }) => {
    const previousPagedata = route.params
    const [activeFilter, setActiveFilter] = useState(1);
    const filterData = [
        { id: 1, title: 'Demo Class' },
        { id: 2, title: 'Live Class' },
        { id: 3, title: 'Workshop' },
        { id: 4, title: 'Teachers List' },
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
            <MyHeader title={`${previousPagedata.course?.title}`} />

            <CourseCategory
                filterData={filterData}
                updateState={updateState}
                activeFilter={activeFilter}
            />
            <FlatList ListHeaderComponent={
                <>
                    {activeFilter == 1 && <DemoClass
                        courseId={previousPagedata.course?._id}
                        courseData={previousPagedata.course} />}
                    {activeFilter == 2 && <LiveClass
                        courseId={previousPagedata.course?._id}
                        courseData={previousPagedata.course}
                    />}
                    {activeFilter == 3 && <Workshop
                        courseId={previousPagedata.course?._id}
                        courseData={previousPagedata.course}
                    />}
                    {activeFilter == 4 && <TeachersList
                        courseId={previousPagedata.course?._id}
                        courseData={previousPagedata.course}
                    />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
