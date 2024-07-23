import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import Loader from '../../../components/Loader';
import MyHeader from '../../../components/MyHeader';
import Video from '../../../components/Courses/Video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyStatusBar from '../../../components/MyStatusBar';
import { check_current_day } from '../../../utils/tools';
import GlobalButton from '../../../components/GlobalButton';
import * as PaymentActions from '../../../redux/actions/paymentActions'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assets/styles';

const LiveClassDetails = ({ navigation, route }) => {
    const [classData] = useState(route?.params?.classData);
    const [isLoading, setIsLoading] = useState(false);
    const CoursePayment = classData?.price - (classData?.price * classData.discount / 100)

    const go_to_live = () => {
    };

    const handlePress = () => {
        console.log("ksajhjkd")
        PaymentActions.onCoursesPayment({ amount:CoursePayment})
    }

    console.log("classData =====>>>>>", classData)

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <Loader visible={isLoading} />
            <MyHeader title={'Live Class'} navigation={navigation} />
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Video uri={classData?.video} />
                            {courseDetails()}
                            {bookNow()}
                            {classesList()}
                        </>
                    }
                />
            </View>
        </View>
    );

    function bookNow() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.5 }} >
                <GlobalButton handlePress={handlePress} ButtonName={"Book Now"} />
            </View>
        )
    }

    function courseDetails() {
        return (
            <View
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grayLight,
                }}>
                <View activeOpacity={0.9} style={styles.container}>
                    <View style={styles.subContainer}>
                        <Text
                            style={[
                                Fonts.gray14RobotoRegular,
                                {
                                    marginTop: 2,
                                    lineHeight: 20,
                                    textAlign: 'justify',
                                    color: Colors.black,
                                },
                            ]}
                        >
                            ₹ {CoursePayment}
                        </Text>
                        <Text
                            style={[
                                { ...Fonts.primaryDark16RobotoMedium },
                                {
                                    lineHeight: 25,
                                    textAlign: 'justify',
                                    textDecorationLine: "line-through",
                                },
                            ]}
                        >
                            ₹{classData?.price}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    function classesList() {
        const renderItem = ({ item, index }) => {
            const isToday = check_current_day({ date: item.start_date });
            return (
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.grayLight,
                    }}>
                    <View activeOpacity={0.9} style={styles.container}>
                        <View style={styles.subContainer}>
                            {item.status == '1' ? (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            flex: 0.7,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Text style={[{ ...Fonts.primaryDark16RobotoMedium }]}>
                                            Class {index + 1}
                                        </Text>
                                        <Text style={[Fonts.gray12RobotoMedium, { marginLeft: 10 }]}>
                                            {item.time_session_duration} min
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 0.3,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                        }}>
                                        <Text
                                            style={[
                                                { ...Fonts.gray14RobotoMedium },
                                                { lineHeight: 25, marginRight: 5, textAlign: 'right' },
                                            ]}>
                                            Completed
                                        </Text>
                                        <Ionicons name="checkmark-circle-sharp" size={15} />
                                    </View>
                                </View>
                            ) : (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            flex: 0.7,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Text style={[{ ...Fonts.primaryDark16RobotoMedium }]}>
                                            Class {index + 1}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 0.3,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                        }}>
                                        <Text style={[Fonts.gray12RobotoMedium, { marginLeft: 10 }]}>
                                            {item.time_session_duration} min
                                        </Text>
                                    </View>
                                </View>
                            )}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <View style={{ flex: 0.7 }}>
                                    <Text
                                        style={[
                                            { ...Fonts.gray16RobotoMedium },
                                            { lineHeight: 25, textAlign: 'justify' },
                                        ]}>
                                        {item.class_name}
                                    </Text>
                                </View>
                            </View>
                            <Text
                                style={[
                                    Fonts.gray14RobotoRegular,
                                    { marginTop: 2, lineHeight: 20, textAlign: 'justify' },
                                ]}>
                                {item?.description}
                            </Text>
                        </View>
                        {item.status != '1' && (
                            <View style={styles.subContainer}>
                                {isToday ? (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={[{ ...Fonts.primaryDark16RobotoMedium }]}>
                                                Join class by{' '}
                                                {moment(item?.start_time).format('hh:mm A')}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 0.4,
                                                alignItems: 'flex-end',
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => go_to_live(item)}
                                                style={{
                                                    width: '100%',
                                                    alignItems: 'center',
                                                    paddingVertical: SCREEN_WIDTH * 0.03,
                                                    borderRadius: SCREEN_WIDTH * 0.1,
                                                    backgroundColor: Colors.primaryDark,
                                                }}>
                                                <Text style={Fonts.white14RobotoMedium}>Go Live</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                        <Text
                                            style={[
                                                { ...Fonts.primaryLight15RobotoMedium },
                                                { color: Colors.red, marginTop: 10 },
                                            ]}>
                                            Next Session at{' '}
                                            {moment(item?.start_date).format('Do MMM YYYY')},{' '}
                                            {moment(item?.start_time).format('hh:mm A')}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            );
        };
        return (
            <FlatList
                data={classData?.course_live_tbl}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: 15 }}
            />
        );
    }
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, null)(LiveClassDetails);

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: SCREEN_WIDTH * 0.05,
        marginTop: 10,
    },
    subContainer: {
        borderRadius: 20,
        borderRadius: SCREEN_WIDTH * 0.04,
    },
    statusContainer: {
        borderRadius: 20,
        backgroundColor: Colors.primaryDark,
        borderRadius: SCREEN_WIDTH * 0.04,
        elevation: 3,
        paddingBottom: SCREEN_WIDTH * 0.025,
        paddingHorizontal: SCREEN_WIDTH * 0.02,
        position: 'absolute',
        height: SCREEN_WIDTH * 0.2,
        zIndex: -1,
        bottom: -SCREEN_WIDTH * 0.1,
        right: 0,
    },
    statusTextBox: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
});
