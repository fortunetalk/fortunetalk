import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { classifyTime } from '../../../utils/tools';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import NoDataFound from '../../../components/NoDataFound';
import { navigate } from '../../../utils/navigationServices';
import * as Courses from '../../../redux/actions/courseActions';
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assets/styles';
import { Text, View, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';

const DemoClass = ({
    isLoading,
    demoClass,
    dispatch,
    courseId,
    courseData
}) => {
    
    useEffect(() => {
        dispatch(Courses.getDemoClass({ courseId }));
    }, [courseId, dispatch])

    if (demoClass && demoClass.length == 0) {
        return <NoDataFound />
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <Loader visible={isLoading} />
            <FlatList
                ListHeaderComponent={
                    <>
                        {demoClass && liveClassInfo()}
                    </>
                }
            />
        </View>
    );

    function liveClassInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 1.5,
                marginTop: Sizes.fixPadding,
                marginBottom: 100
            }}>
                <FlatList
                    data={demoClass}
                    renderItem={({ item }) => <DemoClassItem item={item} courseData={courseData} />}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
};

const DemoClassItem = ({ item, courseData }) => {
    const [countdown, setCountdown] = useState(null);
    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const classDate = new Date(item.date);
            const [hours, minutes] = item.time.split(':').map(Number);

            classDate.setHours(hours);
            classDate.setMinutes(minutes);

            const difference = classDate - now;

            if (difference > 0) {
                const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hoursLeft = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                const minutesLeft = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                const secondsLeft = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');

                if (daysLeft > 0) {
                    setCountdown(`${daysLeft} days left`);
                } else {
                    setCountdown(`${hoursLeft}:${minutesLeft}:${secondsLeft}`);
                }
            } else {
                setCountdown("00:00:00");
            }
        };

        calculateCountdown();
        const interval = setInterval(calculateCountdown, 1000);

        return () => clearInterval(interval);
    }, [item.date, item.time]);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigate("courseDetails", {
                classdetails: item,
                title: "Demo",
                courseData
            })}
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
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: Colors.white, paddingLeft: 10, flex: 1 }}>{item?.className}</Text>
                    <LinearGradient
                        colors={["#FFFFFF", "#D9D9D9"]}
                        style={{ backgroundColor: Colors.white, borderBottomLeftRadius: 100, width: 55, height: 45 }}
                    >
                        <Text style={{ paddingTop: 10, paddingLeft: 20 }} >Info</Text>
                    </LinearGradient>
                </View>
            </ImageBackground>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    backgroundColor: Colors.white,
                    width: "30%",
                    position: "absolute",
                    right: 0,
                    bottom: 65,
                    paddingVertical: Sizes.fixPadding * 1,
                    paddingRight: Sizes.fixPadding * 2,
                    paddingLeft: Sizes.fixPadding * 1,
                    borderTopLeftRadius: Sizes.fixPadding * 2
                }}>
                <Text
                    style={{
                        color: Colors.primaryLight,
                        fontWeight: "700",
                        fontSize: 14
                    }}>{countdown}</Text>
            </View>

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
                    <Image source={{ uri: item?.astrologerId?.profileImage }}
                        style={{ width: 50, height: 50, borderRadius: 1000 }}
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
                    <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center', color: Colors.white, fontSize: 12, paddingBottom: 5 }}>
                        {item.time} {classifyTime(item.time)}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ flex: 0, backgroundColor: Colors.white, borderRadius: 20, paddingVertical: Sizes.fixPadding * 0.3, paddingHorizontal: Sizes.fixPadding * 0.9 }}>
                        <Text style={{ ...Fonts.white18RobotMedium, textAlign: 'center', color: Colors.primaryLight, fontSize: 12 }}>
                            Connect
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const mapStateToProps = state => ({
    isLoading: state.settings.isLoading,
    demoClass: state.courses.demoClass
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DemoClass);
