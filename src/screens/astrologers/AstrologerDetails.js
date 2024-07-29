import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusBar';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import { showNumber } from '../../utils/services';
import Loader from '../../components/Loader';
import AstrologerReviews from './components/AstrologerReviews';
import Gallary from './components/Gallary';
import * as AstrologerActions from '../../redux/actions/astrologerActions'
import { connect } from 'react-redux';
import MyHeader from '../../components/MyHeader';
import * as CallActions from '../../redux/actions/callActions'
import * as ChatActions from '../../redux/actions/chatActions'

const AstrologerDetails = ({ navigation, dispatch, isLoading, route, astrologerData, isFollow }) => {

    useEffect(() => {
        dispatch(AstrologerActions.getAstrologerDetails(route?.params?._id))
        dispatch(AstrologerActions.checkFollowStatus(route?.params?._id))
        return () => {
            dispatch(AstrologerActions.setAstrologerDetails(null))
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <Loader visible={isLoading} />
            <MyHeader title={'Profile'} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {astrologerData && profileInfo()}
                            {abuoutMeInfo()}
                            {astrologerData && <Gallary data={astrologerData?.galleryImage} />}
                            <AstrologerReviews />
                        </>
                    }
                />
            </View>
            {bottomButtons()}
            {/*  {chatModalDetailesInfo()}
            {requestingModalInfo()} */}
        </View>
    );

    function bottomButtons() {
        const on_call = () => {
            const payload = {
                navigation,
                astrologerId: route?.params?._id,
                astrologerName: astrologerData?.name,
                astrologerImage: astrologerData?.profileImage,
            }
            dispatch(CallActions.sendCallRequest(payload))
        }
        
        const on_chat = () => {
            const payload = {
                navigation,
                astrologerId: route?.params?._id,
                astrologerName: astrologerData?.name,
                astrologerImage: astrologerData?.profileImage,
            }
            dispatch(ChatActions.sendChatRequest(payload))
        }

        return (
            <View
                style={[
                    styles.row,
                    { justifyContent: 'space-evenly', marginVertical: Sizes.fixPadding },
                ]}>
                <TouchableOpacity
                    onPress={on_chat}
                    activeOpacity={0.8}
                    style={{ width: '45%', overflow: 'hidden' }}>
                    <LinearGradient
                        colors={[Colors.primaryLight, Colors.primaryDark]}
                        style={[
                            styles.row,
                            styles.center,
                            {
                                width: '100%',
                                paddingVertical: Sizes.fixPadding * 0.5,
                                borderRadius: Sizes.fixPadding * 1.5,
                            },
                        ]}>
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            color={Colors.white}
                            size={22}
                        />
                        <Text
                            style={{
                                ...Fonts.white14RobotoMedium,
                                marginLeft: Sizes.fixPadding,
                            }}>
                            Chat @ {showNumber(astrologerData?.chatPrice + astrologerData?.companyChatPrice)}/min
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={on_call}
                    style={[
                        styles.row,
                        styles.center,
                        {
                            borderWidth: 2,
                            width: '45%',
                            borderRadius: Sizes.fixPadding * 1.5,
                            paddingVertical: Sizes.fixPadding * 0.4,
                            borderColor: Colors.primaryDark,
                        },
                    ]}>
                    <Feather name="phone-call" color={Colors.primaryLight} size={20} />
                    <Text
                        style={{
                            ...Fonts.primaryLight14RobotoMedium,
                            marginLeft: Sizes.fixPadding,
                        }}>
                        Call @ {showNumber(astrologerData?.callPrice + astrologerData?.companyCallPrice)}/min
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function abuoutMeInfo() {
        return (
            <View
                style={{
                    padding: Sizes.fixPadding * 1.5,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grayLight,
                }}>
                <Text style={{ ...Fonts.black16RobotoMedium }}>About me</Text>
                <Text
                    style={{
                        ...Fonts.gray11RobotoRegular,
                        // marginTop: Sizes.fixPadding * 0.5,
                    }}>
                    {astrologerData?.about}
                </Text>
            </View>
        );
    }

    function profileInfo() {
        return (
            <View
                style={{
                    ...styles.center,
                    paddingVertical: Sizes.fixPadding * 1.5,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grayLight,
                }}>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image
                        source={{ uri: astrologerData?.profileImage }}
                        style={{
                            width: SCREEN_WIDTH * 0.23,
                            height: SCREEN_WIDTH * 0.23,
                            borderWidth: 3,
                            borderRadius: 10000,
                            borderColor: Colors.primaryDark,
                        }}
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        ...Fonts.black18RobotoMedium,
                        fontSize: 20,
                        marginTop: Sizes.fixPadding * 0.5,
                    }}>
                    {astrologerData?.displayName}
                </Text>
                <Text style={{ ...Fonts._13RobotoMedium, color: Colors.grayC, textAlign: 'center' }}>
                    Love, Palm Reading
                </Text>
                <Text style={{ ...Fonts._11RobotoMedium, color: Colors.grayC, }}>{astrologerData?.language.join(', ')}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>dispatch(AstrologerActions.onFollowUnFollowAstrologer(route.params?._id))}>
                    <LinearGradient
                        colors={[Colors.primaryLight, Colors.primaryDark]}
                        style={{
                            paddingHorizontal: Sizes.fixPadding * 2.5,
                            paddingVertical: Sizes.fixPadding * 0.5,
                            borderRadius: 1000,
                            marginVertical: Sizes.fixPadding,
                            marginBottom: Sizes.fixPadding * 2
                        }}>
                        <Text style={{ ...Fonts.white14RobotoMedium }}>{isFollow ? "Following" : 'Follow'}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View
                    style={{
                        ...styles.row,
                        width: '100%',
                        justifyContent: 'space-evenly',
                    }}>
                    <View style={[styles.boxContainer, styles.center]}>
                        <Text style={{ ...Fonts._11RobotoMedium, color: Colors.grayC }}>({astrologerData?.avgRating ?? 1})</Text>
                        <Stars
                            default={astrologerData?.avgRating}
                            count={5}
                            half={false}
                            starSize={14}
                            fullStar={
                                <Ionicons name={'star'} size={14} color={Colors.primaryLight} />
                            }
                            emptyStar={
                                <Ionicons
                                    name={'star-outline'}
                                    size={14}
                                    color={Colors.primaryLight}
                                />
                            }
                        />
                    </View>
                    <View style={[styles.boxContainer, styles.center]}>
                        <Text style={{ ...Fonts._15RobotMedium, color: Colors.grayC }}>Ex. +{astrologerData?.experience} years</Text>
                    </View>
                    <View style={[styles.boxContainer, styles.center]}>
                        <Text style={{ ...Fonts._13RobotoMedium, color: Colors.grayC }}>{astrologerData?.follower_count}</Text>
                        <Text style={{ ...Fonts._11RobotoMedium, color: Colors.grayC }}>Followers</Text>
                    </View>
                </View>
            </View>
        );
    }
};

const mapStateToProps = state => ({
    astrologerData: state.astrologer.astrologerData,
    isFollow: state.astrologer.isFollow,
    isLoading: state.settings.isLoading,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerDetails);

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxContainer: {
        width: '28%',
        height: 42,
        backgroundColor: Colors.grayD,
        borderWidth: 1,
        borderColor: Colors.grayLight,
        borderRadius: Sizes.fixPadding * 1.5,
        elevation: 2,
        shadowColor: Colors.blackLight
    },
});
