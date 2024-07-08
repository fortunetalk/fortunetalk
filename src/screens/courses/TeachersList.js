import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Text, View } from 'react-native'
import Loader from '../../components/Loader';
import { Image } from 'react-native';
import NoDataFound from '../../components/NoDataFound';
import { FlatList, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes } from '../../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars';
import * as Courses from '../../redux/actions/courseActions';

const TeachersList = ({ isLoading, teachersList, dispatch, courseId }) => {
    const [ratingStar, setRatingStar] = useState(3);

    const demoClassData = [
        {
            id: 1,
            course_name: 'Durgesh Chaudhary',
        },
        {
            id: 1,
            course_name: 'Durgesh Chaudhary',
        },
        {
            id: 1,
            course_name: 'Durgesh Chaudhary',
        },
    ];

    const handleNext = () => {

    }

    useEffect(() => {
        dispatch(Courses.getTeachersList({ courseId }))
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <Loader visible={isLoading} />
            <FlatList ListHeaderComponent={
                <>{
                    demoClassData && tarotTeachersInfo()
                }</>}
            />
        </View>
    )

    function tarotTeachersInfo() {
        const renderItem = ({ item }) => {
            return (
                <View
                    style={{
                        borderRadius: Sizes.fixPadding,
                        backgroundColor: Colors.whiteDark,
                        marginBottom: Sizes.fixPadding * 1.5,
                        elevation: 5
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingLeft: Sizes.fixPadding,
                            paddingTop: Sizes.fixPadding,
                            alignItems: "center",
                            borderRadius: 10,
                        }}>

                        <Image source={require("../../assets/images/user4.jpg")}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 1000
                            }}
                        />
                        <View>
                            <Text
                                numberOfLines={2}
                                style={{
                                    ...Fonts.black14InterMedium,
                                    color: Colors.black,
                                    fontSize: 12,
                                    paddingLeft: Sizes.fixPadding,
                                }}
                            >
                                {item?.course_name}
                            </Text>
                            <Stars
                                default={ratingStar}
                                count={5}
                                half={true}
                                starSize={12}
                                update={val => setRatingStar(val)}
                                fullStar={
                                    <Ionicons name={'star'} size={12} color={Colors.primaryLight} />
                                }
                                emptyStar={
                                    <Ionicons
                                        name={'star-outline'}
                                        size={12}
                                        color={Colors.primaryLight}
                                    />
                                }
                                halfStar={
                                    <Ionicons
                                        name={'star-half'}
                                        size={12}
                                        color={Colors.primaryLight}
                                    />
                                }
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            paddingTop: Sizes.fixPadding,
                            flex: 1
                        }}>
                        <Text
                            style={{
                                color: Colors.black,
                                paddingLeft: 10,
                                fontSize: 14,
                            }}>Course:</Text>
                        <Text
                            style={{
                                paddingLeft: Sizes.fixPadding * 0.3,
                                paddingBottom: Sizes.fixPadding * 0.3,
                                fontSize: 14,
                            }}>Master your Psichic </Text>
                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            paddingVertical: Sizes.fixPadding * 0.2,
                        }}>

                        <TouchableOpacity
                            onPress={() => handleNext()}
                            activeOpacity={0.8}
                            style={{
                                flex: 0,
                                paddingVertical: Sizes.fixPadding * 0.5
                            }}>
                            <Text style={{
                                ...Fonts.white18RobotMedium,
                                textAlign: 'center',
                                fontSize: 14,
                                color: Colors.primaryDark
                            }}>
                                Demo Class
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleNext()}
                            activeOpacity={0.8}
                        >
                            <Text style={{
                                ...Fonts.white18RobotMedium,
                                textAlign: 'center',
                                fontSize: 14,
                                color: Colors.primaryDark
                            }}>
                                Live Class
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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

const mapStateToProps = state => ({
    isLoading: state.settings.isLoading,
    teachersList: state.courses.teachersList,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TeachersList)
