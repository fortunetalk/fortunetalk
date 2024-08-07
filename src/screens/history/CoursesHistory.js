import React from 'react'
import { View, FlatList } from 'react-native'
import { Colors, Sizes } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import MyHeader from '../../components/MyHeader'
import HistoryTab from './components/HistoryTab'
import NoDataFound from '../../components/NoDataFound'

const CoursesHistory = ({ route }) => {
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    marginVertical: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2
                }}
                onPress={() => navigate("currentCoursesDetails", { course: item })}
            >
                <View style={styles.button}>
                    <Text style={{
                        ...Fonts.black16RobotoMedium,
                        fontSize: 14,
                        color: Colors.blackLight,
                    }}>{item?.liveId?.className}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Courses History'} />
            <HistoryTab activeTab={route.params.type} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[]}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: Sizes.fixPadding * 2 }}
                    ListEmptyComponent={<NoDataFound />}
                />
            </View>
        </View>
    )
}

export default CoursesHistory