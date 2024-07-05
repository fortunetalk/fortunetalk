import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Text, View } from 'react-native'
import { Image, ImageBackground } from 'react-native';
import NoDataFound from '../../components/NoDataFound';
import { FlatList, TouchableOpacity } from 'react-native';
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../../components/MyStatusBar';
import Loader from '../../components/Loader';
import MyHeader from '../../components/MyHeader';
import CourseCategory from './CourseCategory';

const TeachersList = ({ isLoading }) => {
    const [activeFilter, setActiveFilter] = useState(1);

    const demoClassData = [
        {
            id: 1,
            course_name: 'Introduction to Tarot',
            description: '05 September',
        },
        {
            id: 2,
            course_name: 'Advanced Tarot Techniques',
            description: '05 September',
        },
        {
            id: 3,
            course_name: 'Advanced Tarot Techniques',
            description: '05 September',
        },
    ];

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
            <MyHeader title={"Teachers List"} />

            <CourseCategory
                filterData={filterData}
                updateState={updateState}
                activeFilter={activeFilter}
            />
            <FlatList ListHeaderComponent={<>{demoClassData && tarotTeachersInfo()}</>} />
        </View>
    )

    function tarotTeachersInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        borderRadius: Sizes.fixPadding,
                        backgroundColor: Colors.whiteDark,
                        marginBottom: Sizes.fixPadding * 1.5,
                        elevation: 5
                    }}>
                    <ImageBackground
                        style={{
                            flex: 0,
                            height: SCREEN_WIDTH * 0.4,
                            borderTopLeftRadius: Sizes.fixPadding,
                            borderTopRightRadius: Sizes.fixPadding,
                            overflow: 'hidden'
                        }}
                        source={require("../../assets/images/banner_2.jpeg")}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                            <Text style={{ color: Colors.white, paddingLeft: 10, flex: 1 }}>Master your Psichic Ability and Learn to Give Accurate</Text>
                            <LinearGradient
                                colors={["#FFFFFF", "#D9D9D9"]}
                                style={{
                                    backgroundColor: Colors.white,
                                    borderBottomLeftRadius: 100,
                                    width: 55,
                                    height: 45
                                }}
                            >
                                <Text style={{ paddingTop: 10, paddingLeft: 20 }} >Info</Text>
                            </LinearGradient>
                        </View>

                    </ImageBackground>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: Sizes.fixPadding,
                            alignItems: "center",
                            backgroundColor: Colors.primaryLight,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                backgroundColor: Colors.primaryLight,
                                gap: 5
                            }}>
                            <Image source={require("../../assets/images/user4.jpg")}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 1000
                                }}
                            />
                            <View>
                                <Text numberOfLines={2} style={{ ...Fonts.black14InterMedium, color: Colors.white, fontSize: 12 }}>
                                    {item?.course_name}
                                </Text>
                                <Text numberOfLines={4} style={{ ...Fonts.gray12RobotoRegular, marginBottom: Sizes.fixPadding, color: Colors.white }}>
                                    {item?.description}
                                </Text>
                            </View>
                        </View>

                        <View>
                            <Text style={{
                                ...Fonts.white18RobotMedium,
                                textAlign: 'center',
                                color: Colors.white,
                                fontSize: 12,
                                paddingBottom: 5
                            }}>
                                7 pm (Evening)
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{
                                    flex: 0,
                                    backgroundColor: Colors.white,
                                    borderRadius: 20,
                                    paddingVertical: Sizes.fixPadding * 0.3,
                                    paddingHorizontal: Sizes.fixPadding * 0.9,
                                }}>
                                <Text style={{
                                    ...Fonts.white18RobotMedium,
                                    textAlign: 'center',
                                    color: Colors.primaryLight,
                                    fontSize: 12
                                }}>
                                    Connect
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        };
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 1.5,
                    marginTop: Sizes.fixPadding,
                    marginBottom: 100
                }}>
                <FlatList
                    data={demoClassData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<NoDataFound />}
                />
            </View>
        );
    }
}

// export default TeachersList

const mapStateToProps = state => ({
    isLoading: state.settings.isLoading,
    courseList: state.courses.courseList,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TeachersList)
