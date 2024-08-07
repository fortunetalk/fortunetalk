import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import MyHeader from '../../components/MyHeader'
import HistoryTab from './components/HistoryTab'
import NoDataFound from '../../components/NoDataFound'
import MyStatusBar from '../../components/MyStatusBar'
import { Colors, Sizes, Fonts } from '../../assets/styles'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import * as historyAction from '../../redux/actions/historyActions'

const CoursesHistory = ({ route, dispatch, courseHistory, customerData }) => {

    useEffect(() => {
        dispatch(historyAction.onCourseHistory())
    }, [])

    console.log("courseHistory  =====>>>>", courseHistory)

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    marginVertical: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2
                }}
            >
                <View style={styles.button}>
                    <Text style={{
                        ...Fonts.black16RobotoMedium,
                        fontSize: 14,
                        color: Colors.blackLight,
                    }}>{item?.liveId?.className}</Text>

                    <View style={{ justifyContent: "space-between", flexDirection: "row" }} >
                        <Text style={{
                            ...Fonts.black16RobotoMedium,
                            fontSize: 14,
                            color: Colors.blackLight,
                        }}>Amount</Text>
                        <Text style={{
                            ...Fonts.black16RobotoMedium,
                            fontSize: 14,
                            color: Colors.greenDark,
                        }}>₹ {item?.liveClassPrice}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Courses History'} />
            <HistoryTab activeTab={route.params.type} />
            <View style={{ flex: 1 }}>
                {courseHistory &&
                    <FlatList
                        data={courseHistory}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: Sizes.fixPadding * 2 }}
                        ListEmptyComponent={<NoDataFound />}
                    />
                }
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    courseHistory: state.history.courseHistory,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CoursesHistory)

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
    }
});
