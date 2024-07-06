import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Text, View } from 'react-native'
import Loader from '../../components/Loader';
import { Image, ImageBackground } from 'react-native';
import NoDataFound from '../../components/NoDataFound';
import { FlatList, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../assets/styles';
import * as Courses from '../../redux/actions/courseActions'
import { classifyTime } from '../../utils/tools';

const TeachersList = ({ isLoading, demoClass, dispatch, courseId }) => {
    useEffect(() => {
        if (!demoClass) {
            dispatch(Courses.getDemoClass({ courseId }))
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <Loader visible={isLoading} />
            <FlatList ListHeaderComponent={
                <>{
                    demoClass && demoClassInfo()
                }</>}
            />
        </View>
    )

    function demoClassInfo() {
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
                        source={{ uri: item?.image }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                            <Text style={{ color: Colors.white, paddingLeft: 10, flex: 1 }}>{item?.className}</Text>
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
                            <Image source={{uri:item?.astrologerId?.profileImage}}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 1000
                                }}
                            />
                            <View>
                                <Text numberOfLines={2} style={{ ...Fonts.black14InterMedium, color: Colors.white, fontSize: 12 }}>
                                    {item?.astrologerId?.displayName}
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
                                {item.time} {classifyTime(item.time)}
                            </Text>
                            <View
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
                            </View>
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
                    data={demoClass}
                    renderItem={renderItem}
                    keyExtractor={item => item?._id}
                    ListEmptyComponent={<NoDataFound />}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.settings.isLoading,
    demoClass: state.courses.demoClass,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TeachersList)
