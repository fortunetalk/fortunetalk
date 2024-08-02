import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import moment from 'moment';
import React, { useState } from 'react';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../../assets/styles';

const SuccessfullyBooked = ({ navigation }) => {
    const [poojaData, setPoojaData] = useState([]);

    function gst_amount() {
        return (
            (parseFloat(562) * 18.0) / 100).toFixed(2)
    }

    function total_amount() {
        return (
            parseFloat(parseFloat(564) + (parseFloat(poojaData?.price) * 18.0) / 100).toFixed(2)
        );
    }
    
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.bodyColor
            }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <View style={{ flex: 1 }}>
                <MyHeader title={"Booking Details"} />
                <FlatList
                    ListHeaderComponent={
                        <>
                            {successMsg()}
                            {bannerInfo()}
                            {remedydonInfo()}
                            {paidAmountInfo()}
                            {billDetailsInfo()}
                            {astrologerInfo()}
                        </>
                    }
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
                />
            </View>
        </View>
    );

    function successMsg() {
        return (
            <View style={{
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: Colors.grayLight,
                paddingBottom: Sizes.fixPadding * 1
            }} >
                <Text style={{ color: Colors.greenDark, fontWeight: "600" }} >Pooja has been Successufully Booked !!</Text>
            </View>
        )
    }

    function remedydonInfo() {
        return (
            <View
                style={{
                    padding: Sizes.fixPadding * 1.5,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grayLight,
                }}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: Sizes.fixPadding * 2,
                        borderWidth: 3,
                        borderStyle: 'dashed',
                        borderRadius: Sizes.fixPadding,
                        borderColor: Colors.primaryLight,
                    }}>
                    <Text style={{ ...Fonts.primaryLight18RobotoMedium }}>
                        Jal Abhishek Pooja
                    </Text>
                    <Text style={{ ...Fonts.primaryLight15RobotoMedium }}>
                        {moment(new Date()).format('Do MMMM YYYY')}
                    </Text>
                    <Text style={{ ...Fonts.primaryLight14RobotoMedium }}>
                        at {moment(new Date()).format('hh:mm A')}
                    </Text>
                </View>
            </View>
        );
    }

    function paidAmountInfo() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: Sizes.fixPadding * 1.5,
                    backgroundColor: Colors.grayLight,
                    padding: Sizes.fixPadding,
                    borderRadius: Sizes.fixPadding,
                    elevation: 5,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowColor: Colors.blackLight,
                    marginTop: Sizes.fixPadding,
                }}>
                <Text style={{ color: Colors.gray, fontWeight: "600" }} >Paid Amount - ₹ 695</Text>
                <Ionicons name="chevron-down" color={Colors.blackLight} size={24} />
            </View>
        );
    }

    function astrologerInfo() {
        return (
            <View
                style={{
                    paddingHorizontal: Sizes.fixPadding * 2,
                    borderTopWidth: 1,
                    borderTopColor: Colors.grayLight,
                    paddingTop: Sizes.fixPadding,
                }}>
                <Text
                    style={{
                        ...Fonts.primaryLight15RobotoMedium,
                        marginBottom: Sizes.fixPadding,
                    }}>
                    Pooja will Perform
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 1000,
                                overflow: 'hidden',
                                borderWidth: 2,
                                borderColor: Colors.white,
                                elevation: 5,
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.2,
                                shadowColor: Colors.blackLight,
                            }}>
                            <Image
                                source={require("../../../assets/images/astro.jpg")}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                        <Text
                            style={{
                                ...Fonts.black16RobotoMedium,
                                marginLeft: Sizes.fixPadding,
                            }}>
                            Durgesh Chaudhary
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            navigation.navigate('astrologerDetailes', {
                                data: {
                                    id: poojaData?.astro_id
                                },
                            })
                        }
                        style={{
                            backgroundColor: Colors.grayLight,
                            borderRadius: 1000,
                            paddingVertical: Sizes.fixPadding * 0.5,
                            paddingHorizontal: Sizes.fixPadding,
                        }}>
                        <Text style={{ ...Fonts.gray14RobotoRegular }}>View Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function billDetailsInfo() {
        return (
            <View
                style={{
                    margin: Sizes.fixPadding * 1.5,
                }}>
                <View
                    style={[
                        styles.row,
                        { justifyContent: 'space-between', marginBottom: Sizes.fixPadding },
                    ]}>
                    <Text style={{ ...Fonts.black16RobotoRegular }}>Subtotal</Text>
                    <Text style={{ ...Fonts.black16RobotoMedium }}>
                        ₹ {poojaData?.price}
                    </Text>
                </View>
                <View
                    style={[
                        styles.row,
                        { justifyContent: 'space-between', marginBottom: Sizes.fixPadding },
                    ]}>
                    <Text style={{ ...Fonts.black16RobotoRegular }}>Delivery Charge</Text>
                    <Text style={{ ...Fonts.black16RobotoRegular }}>Free</Text>
                </View>
                <View
                    style={[
                        styles.row,
                        {
                            justifyContent: 'space-between',
                            paddingBottom: Sizes.fixPadding,
                            marginBottom: Sizes.fixPadding,
                            borderBottomWidth: 1,
                            borderColor: Colors.grayLight,
                        },
                    ]}>
                    <Text style={{ ...Fonts.black16RobotoRegular }}>GST @ 18.0%</Text>
                    <Text style={{ ...Fonts.black16RobotoRegular }}>₹ {gst_amount()}</Text>
                </View>
                <View
                    style={[
                        styles.row,
                        {
                            justifyContent: 'space-between',
                            marginBottom: Sizes.fixPadding,
                        },
                    ]}>
                    <Text style={{ ...Fonts.black16RobotoRegular }}>Total</Text>
                    <Text style={{ ...Fonts.black16RobotoRegular }}>
                        ₹ {total_amount()}
                    </Text>
                </View>
            </View>
        );
    }

    function bannerInfo() {
        return (
            <>
                <View
                    style={{
                        marginHorizontal: Sizes.fixPadding * 1.5,
                        height: SCREEN_WIDTH * 0.55,
                        marginVertical: Sizes.fixPadding * 1,
                    }}>
                    <Image
                        source={require("../../../assets/images/astro.jpg")}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: Sizes.fixPadding * 2,
                        }}
                    />
                </View>
            </>
        );
    }
};

export default SuccessfullyBooked;

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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayLight,
        paddingVertical: Sizes.fixPadding,
    },
    paginationDot: {
        width: 12,
        height: 2,
        borderRadius: 5,
        margin: 5,
    },
});
