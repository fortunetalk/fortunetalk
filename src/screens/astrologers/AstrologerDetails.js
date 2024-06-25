import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusBar';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather'
import { showNumber } from '../../utils/services';
import Loader from '../../components/Loader';
import { Modal } from 'react-native-paper';
import AstrologerReviews from './components/AstrologerReviews';
import Gallary from './components/Gallary';
import * as AstrologerActions from '../../redux/actions/astrologerActions'
import { connect } from 'react-redux';
import MyHeader from '../../components/MyHeader';
import * as CallActions from '../../redux/actions/callActions'

const AstrologerDetails = ({ navigation, dispatch, isLoading, route, astrologerData }) => {

    useEffect(() => {
        dispatch(AstrologerActions.getAstrologerDetails(route?.params?._id))
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

    function requestingModalInfo() {
        return (
            <Modal
                visible={false}
                // onDismiss={() => setRequestingVisible(false)}
                contentContainerStyle={{
                    flex: 0,
                    elevation: 8,
                    shadowColor: Colors.blackLight,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.2,
                }}>
                <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{
                        paddingTop: Sizes.fixPadding * 2,
                        marginHorizontal: Sizes.fixPadding * 2.5,
                        borderRadius: Sizes.fixPadding * 1.5,
                    }}>
                    <Text
                        style={{
                            ...Fonts.white18RobotMedium,
                            fontFamily: 'Roboto-Bold',
                            fontSize: 20,
                            textAlign: 'center',
                        }}>
                        Connecting...
                    </Text>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            marginTop: Sizes.fixPadding,
                            marginHorizontal: Sizes.fixPadding * 1.5,
                            borderStyle: 'dashed',
                            borderColor: Colors.white,
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: Sizes.fixPadding * 2,
                            // height: SCREEN_HEIGHT * 0.45,
                        }}>
                        <View style={styles.center}>
                            <View
                                style={{
                                    width: SCREEN_WIDTH * 0.2,
                                    height: SCREEN_WIDTH * 0.2,
                                    borderRadius: 1000,
                                    elevation: 8,
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.2,
                                }}>
                                <Image
                                    source={require('../../assets/images/user.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 1000,
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    ...Fonts.white16RobotoMedium,
                                    marginTop: Sizes.fixPadding,
                                }}>
                                Ranjeet Kumar
                            </Text>
                        </View>
                        {/* <Image
                            source={require('../assets/gifs/connecting.gif')}
                            style={{
                                width: 40,
                                height: 60,
                                transform: [{ rotate: '90deg' }],
                            }}
                        /> */}
                        <View style={styles.center}>
                            <View
                                style={{
                                    width: SCREEN_WIDTH * 0.2,
                                    height: SCREEN_WIDTH * 0.2,
                                    borderRadius: 1000,
                                    elevation: 8,
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.2,
                                }}>
                                <Image
                                    source={require('../../assets/images/user.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 1000,
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    ...Fonts.white16RobotoMedium,
                                    marginTop: Sizes.fixPadding,
                                }}>
                                Astro Guru ji
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: Colors.grayLight,
                            padding: Sizes.fixPadding,
                            borderRadius: Sizes.fixPadding * 1.5,
                            elevation: 8,
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.2,
                        }}>
                        <Text
                            style={{
                                ...Fonts.white14RobotoMedium,
                                color: Colors.blackLight,
                                textAlign: 'center',
                                paddingBottom: Sizes.fixPadding * 4,
                            }}>
                            While you wait for Astro Guruji, you may also Chat Chat (wait 4
                            min) explore other astrologers and join their waitlist.
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            // onPress={() => setRequestingVisible(false)}
                            style={{
                                position: 'absolute',
                                bottom: -Sizes.fixPadding * 2,
                                alignSelf: 'center',
                                backgroundColor: Colors.primaryLight,
                                paddingHorizontal: Sizes.fixPadding * 3,
                                paddingVertical: Sizes.fixPadding,
                                borderRadius: Sizes.fixPadding,
                                borderWidth: 3,
                                borderColor: Colors.white,
                            }}>
                            <Text style={{ ...Fonts.white18RobotMedium }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </Modal>
        );
    }

    function chatModalDetailesInfo() {
        return (
            <Modal
                visible={false}
                // onDismiss={() => setChatModalVisible(false)}
                contentContainerStyle={{
                    flex: 0,
                    paddingVertical: Sizes.fixPadding * 2,
                    backgroundColor: Colors.white,
                    marginHorizontal: Sizes.fixPadding * 1.5,
                    borderRadius: Sizes.fixPadding * 2,
                    elevation: 8,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.2,
                }}>
                <View style={{}}>
                    <View
                        style={[
                            styles.row,
                            {
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                paddingHorizontal: Sizes.fixPadding,
                                borderBottomWidth: 1,
                                borderBottomColor: Colors.grayLight,
                                paddingBottom: Sizes.fixPadding * 0.5,
                            },
                        ]}>
                        <View>
                            <LinearGradient
                                colors={[Colors.primaryLight, Colors.primaryDark]}
                                style={[
                                    styles.row,
                                    {
                                        paddingHorizontal: Sizes.fixPadding,
                                        paddingVertical: Sizes.fixPadding * 0.5,
                                        borderRadius: 1000,
                                    },
                                ]}>
                                <Ionicons
                                    name="wallet-outline"
                                    color={Colors.white}
                                    size={26}
                                />
                                <Text
                                    style={{
                                        ...Fonts.white14RobotoMedium,
                                        marginLeft: Sizes.fixPadding,
                                    }}>
                                    {showNumber(100)}
                                </Text>
                            </LinearGradient>
                            {true && (
                                <Text
                                    style={{
                                        ...Fonts.black12RobotoRegular,
                                        textAlign: 'center',
                                        color: Colors.red,
                                    }}>
                                    Low Balance!!
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={[Colors.primaryLight, Colors.primaryDark]}
                                style={[
                                    styles.row,
                                    {
                                        paddingHorizontal: Sizes.fixPadding,
                                        paddingVertical: Sizes.fixPadding * 0.9,
                                        borderRadius: 1000,
                                    },
                                ]}>
                                <Text
                                    style={{
                                        ...Fonts.white14RobotoMedium,
                                        marginLeft: Sizes.fixPadding,
                                    }}>
                                    Recharge Now
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: SCREEN_WIDTH * 0.22,
                            height: SCREEN_WIDTH * 0.22,
                            borderWidth: 1,
                            borderRadius: 10000,
                            borderColor: Colors.primaryLight,
                            overflow: 'hidden',
                            alignSelf: 'center',
                            position: 'relative',
                            bottom: Sizes.fixPadding * 1.5,
                            padding: 1,
                            elevation: 8,
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.2,
                        }}>
                        <Image
                            source={require('../../assets/images/user.png')}
                            style={{
                                height: '100%',
                                width: '100%',
                                borderWidth: 1,
                                borderColor: Colors.white,
                                borderRadius: 1000,
                            }}
                        />
                    </View>
                    <View style={{ position: 'relative', bottom: Sizes.fixPadding * 0.5 }}>
                        <Text
                            style={{
                                ...Fonts.primaryLight18RobotoMedium,
                                fontSize: 22,
                                textAlign: 'center',
                            }}>
                            Astro Guru ji
                        </Text>
                        {/* <Text style={{...Fonts.gray14RobotoMedium, textAlign: 'center'}}>
                  Wait Time - 5 min
                </Text> */}
                        <View
                            style={[
                                styles.row,
                                {
                                    marginHorizontal: Sizes.fixPadding,
                                    elevation: 5,
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.2,
                                    shadowColor: Colors.gray,
                                    marginBottom: Sizes.fixPadding * 1.5,
                                    marginTop: Sizes.fixPadding,
                                    borderWidth: 1,
                                    borderColor: Colors.grayLight,
                                    backgroundColor: Colors.white,
                                    padding: Sizes.fixPadding,
                                    borderRadius: Sizes.fixPadding,
                                },
                            ]}>
                            <Ionicons name="call" color={Colors.primaryLight} size={20} />
                            <Text
                                style={{
                                    ...Fonts.gray14RobotoMedium,
                                    marginLeft: Sizes.fixPadding,
                                }}>
                                Audio Call @ {showNumber(5)}/min
                            </Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity>
                                    <LinearGradient
                                        colors={[Colors.primaryLight, Colors.primaryDark]}
                                        style={[
                                            {
                                                width: 80,
                                                paddingVertical: Sizes.fixPadding * 0.5,
                                                borderRadius: 1000,
                                            },
                                        ]}>
                                        <Text
                                            style={{
                                                ...Fonts.white14RobotoMedium,
                                                textAlign: 'center',
                                            }}>
                                            Call
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.row,
                                {
                                    marginHorizontal: Sizes.fixPadding,
                                    elevation: 5,
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.2,
                                    shadowColor: Colors.gray,
                                    borderWidth: 1,
                                    borderColor: Colors.grayLight,
                                    backgroundColor: Colors.white,
                                    padding: Sizes.fixPadding,
                                    borderRadius: Sizes.fixPadding,
                                },
                            ]}>
                            <Ionicons
                                name="chatbubble-ellipses-outline"
                                color={Colors.primaryLight}
                                size={20}
                            />
                            <Text
                                style={{
                                    ...Fonts.gray14RobotoMedium,
                                    marginLeft: Sizes.fixPadding,
                                }}>
                                Chat @ {showNumber(2)}/min
                            </Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                // onPress={() => is_customer_login()}
                                // disabled={chat_wallet_check()}
                                >
                                    <LinearGradient
                                        colors={[Colors.primaryLight, Colors.primaryDark]}
                                        style={[
                                            {
                                                width: 80,
                                                paddingVertical: Sizes.fixPadding * 0.5,
                                                borderRadius: 1000,
                                            },
                                        ]}>
                                        <Text
                                            style={{
                                                ...Fonts.white14RobotoMedium,
                                                textAlign: 'center',
                                            }}>
                                            Chat
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    function bottomButtons() {
        const on_call = () => {
            const payload = {
                navigation,
                astrologerId: route?.params?._id,
                astrologerName: astrologerData?.name,

            }
            dispatch(CallActions.sendCallRequest(payload))
        }
        return (
            <View
                style={[
                    styles.row,
                    { justifyContent: 'space-evenly', marginVertical: Sizes.fixPadding },
                ]}>
                <TouchableOpacity
                    // onPress={on_chat}
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
                    {astrologerData?.name}
                </Text>
                <Text style={{ ...Fonts._13RobotoMedium, color: Colors.grayC, textAlign: 'center' }}>
                    Love, Palm Reading
                </Text>
                <Text style={{ ...Fonts._11RobotoMedium, color: Colors.grayC, }}>{astrologerData?.language.join(', ')}</Text>
                <TouchableOpacity activeOpacity={0.8}>
                    <LinearGradient
                        colors={[Colors.primaryLight, Colors.primaryDark]}
                        style={{
                            paddingHorizontal: Sizes.fixPadding * 2.5,
                            paddingVertical: Sizes.fixPadding * 0.5,
                            borderRadius: 1000,
                            marginVertical: Sizes.fixPadding,
                            marginBottom: Sizes.fixPadding * 2
                        }}>
                        <Text style={{ ...Fonts.white14RobotoMedium }}>Follow</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View
                    style={{
                        ...styles.row,
                        width: '100%',
                        justifyContent: 'space-evenly',
                    }}>
                    <View style={[styles.boxContainer, styles.center]}>
                        <Text style={{ ...Fonts._11RobotoMedium, color: Colors.grayC }}>({astrologerData?.rating ?? 1})</Text>
                        <Stars
                            default={astrologerData?.avgRating ?? 1}
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
                        // halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                        />
                    </View>
                    <View style={[styles.boxContainer, styles.center]}>
                        <Text style={{ ...Fonts._15RobotMedium, color: Colors.grayC }}>Ex. +{!astrologerData?.experience ?? 1} years</Text>
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
