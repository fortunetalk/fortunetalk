import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Linking,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import MyHeader from '../../../components/MyHeader';
import Video from '../../../components/Courses/Video';
import MyStatusBar from '../../../components/MyStatusBar';
import GlobalButton from '../../../components/GlobalButton';
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assets/styles';
import * as CourseActions from '../../../redux/actions/courseActions';
import { navigate } from '../../../utils/navigationServices';
import { check_current_day } from '../../../utils/tools';

const LiveClassDetails = ({
    navigation,
    route,
    dispatch,
    isLoading,
    liveClassOfClass,
    registeredLiveClass,
}) => {
    useEffect(() => {
        const { id } = route.params;
        dispatch(CourseActions.onGetRegisteredLiveClass({ liveClassId: id }));
        dispatch(CourseActions.liveClassOfClass({ liveClassId: id }));
    }, [dispatch, route.params]);

    const renderCourseDetails = () => (
        <View style={styles.container}>
            <Text style={styles.classNameText}>
                {registeredLiveClass?.liveClassId?.className}
            </Text>
            {registeredLiveClass?.paymentType !== 'full' && (
                <View style={styles.priceContainer}>
                    <Text style={styles.payableAmountText}>
                        ₹ {registeredLiveClass?.payableAmount || 0}
                    </Text>
                    <Text style={styles.originalPriceText}>
                        ₹ {registeredLiveClass?.liveClassId?.price || 0}
                    </Text>
                </View>
            )}
        </View>
    );

    const renderCourseDescription = () => (
        <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                    {registeredLiveClass?.liveClassId?.description}
                </Text>
                <Text style={[styles.sectionTitle]}>Course Content</Text>
                <Text style={[styles.descriptionText, { marginBottom: 10 }]}>
                    {registeredLiveClass?.liveClassId?.courseContent}
                </Text>
            </View>
        </View>
    );

    const renderLiveClassStarted = () => (
        <View style={styles.liveClassStartedContainer}>
            <Text style={styles.liveClassStartedText}>
                Batch will Start by {moment(registeredLiveClass?.liveClassId?.date).format('Do MMM YYYY')}
            </Text>
        </View>
    );

    const renderClassesList = () => {
        const renderItem = ({ item, index }) => {
            const isToday = check_current_day({ date: item?.date });
            return (
                <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
                    <View activeOpacity={0.9} style={styles.container}>
                        <View style={styles.subContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 0.7, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[{ ...Fonts.primaryDark16RobotoMedium }]}>Class {index + 1}</Text>
                                </View>
                                <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={[Fonts.gray12RobotoMedium, { marginLeft: 10 }]}>{item?.sessionTime} min</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 0.7 }}>
                                    <Text style={[{ ...Fonts.gray16RobotoMedium }, { lineHeight: 25, textAlign: 'justify' }]}>{item?.className}</Text>
                                </View>
                            </View>
                            <Text style={[Fonts.gray14RobotoRegular, { marginTop: 2, lineHeight: 20, textAlign: 'justify' }]}>{item?.description}</Text>
                        </View>
                        {registeredLiveClass?.paymentType != "pending" && (
                            <View style={styles.subContainer}>
                                {isToday ? (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={[{ ...Fonts.primaryDark16RobotoMedium }]}>Join class by {moment(item?.date).format('hh:mm A')}</Text>
                                        </View>
                                        <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                                            <TouchableOpacity onPress={() => Linking.openURL(item?.googleMeet)} style={{ width: '100%', alignItems: 'center', paddingVertical: SCREEN_WIDTH * 0.03, borderRadius: SCREEN_WIDTH * 0.1, backgroundColor: Colors.primaryDark }}>
                                                <Text style={Fonts.white14RobotoMedium}>Go Live</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={[{ ...Fonts.primaryLight15RobotoMedium }, { color: Colors.red, marginTop: 10 }]}>Next Session at {moment(item?.date).format('Do MMM YYYY')}, {moment(item?.time).format('hh:mm A')}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            );
        };

        return <FlatList data={liveClassOfClass} renderItem={renderItem} contentContainerStyle={styles.classesListContainer} />;
    };

    if (!registeredLiveClass?.paymentType) return null;

    return (
        <View style={styles.mainContainer}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle="light-content" />
            <Loader visible={isLoading} />
            <MyHeader title="Live Class" navigation={navigation} />
            <View style={styles.contentContainer}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Video uri={registeredLiveClass?.liveClassId?.video} />
                            {renderCourseDetails()}
                            <View style={styles.bookNowContainer}>
                                {registeredLiveClass?.paymentType !== 'full' && (
                                    <GlobalButton
                                        handlePress={() => navigate('courseBookingDetails', { data: registeredLiveClass })}
                                        ButtonName="Book Now"
                                    />
                                )}
                            </View>
                            {renderLiveClassStarted()}
                            {renderCourseDescription()}
                            {liveClassOfClass && renderClassesList()}
                        </>
                    }
                />
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state.settings.isLoading,
    registeredLiveClass: state.courses.registeredLiveClass,
    liveClassOfClass: state.courses.liveClassOfClass,
});

export default connect(mapStateToProps)(LiveClassDetails);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    container: {
        marginHorizontal: 20,
        marginBottom: SCREEN_WIDTH * 0.05,
        marginTop: 10,
    },
    descriptionContainer: {
        marginHorizontal: 20,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
    },
    classNameText: {
        ...Fonts.gray14RobotoRegular,
        marginTop: 2,
        textAlign: 'justify',
        color: Colors.black,
        fontSize: 16,
    },
    payableAmountText: {
        ...Fonts.gray14RobotoRegular,
        marginTop: 2,
        lineHeight: 20,
        textAlign: 'justify',
        color: Colors.black,
    },
    originalPriceText: {
        ...Fonts.primaryDark16RobotoMedium,
        lineHeight: 25,
        textAlign: 'justify',
        textDecorationLine: 'line-through',
    },
    sectionTitle: {
        ...Fonts.primaryLight15RobotoMedium,
        marginVertical: Sizes.fixPadding * 1,
        fontSize: 16,
        color: Colors.black,
    },
    descriptionText: {
        ...Fonts.gray14RobotoRegular,
        marginTop: 2,
        lineHeight: 20,
        textAlign: 'justify',
    },
    liveClassStartedContainer: {
        paddingHorizontal: Sizes.fixPadding * 2.5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayLight,
    },
    liveClassStartedText: {
        ...Fonts.primaryLight15RobotoMedium,
        color: Colors.red,
        marginVertical: Sizes.fixPadding * 2,
        textAlign: 'center',
        fontSize: 18,
    },
    bookNowContainer: {
        paddingHorizontal: Sizes.fixPadding * 2.5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayLight,
    },
    classesListContainer: {
        paddingVertical: 15,
    },
});
