import React from 'react'
import { connect } from 'react-redux';
import { Divider } from '@rneui/themed';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native'
import { Sizes, Fonts, Colors, SCREEN_WIDTH, } from '../../assets/styles'
import { useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { showNumber } from '../../utils/services';
import { navigate } from '../../utils/navigationServices';
import Feather from 'react-native-vector-icons/Feather'

const CustomDrawerContent = ({ drawerProps, customerData }) => {
    const isLogged = true
    const navigation = useNavigation();

    const openWhatsApp = phoneNumber => {
        const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;

        Linking.canOpenURL(whatsappUrl)
            .then(supported => {
                if (supported) {
                    return Linking.openURL(whatsappUrl);
                } else {
                    console.log('WhatsApp is not installed on the device');
                }
            })
            .catch(error =>
                console.error(
                    'An error occurred while trying to open WhatsApp:',
                    error,
                ),
            );
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <DrawerContentScrollView
                {...drawerProps}
                showsVerticalScrollIndicator={false}>
                {isLogged && editButtonInfo()}
                {profileImageInfo()}
                {isLogged && nameEmailInfo()}
                {deviderInfo()}
                {isLogged && offerWalletInfo()}
                {isLogged && buttonInfo()}
                {!isLogged && loginInfo()}
            </DrawerContentScrollView>
            {availableOnInfo()}
            {socialIconsInfo()}
        </View>
    );

    function loginInfo() {
        return (
            <View
                style={{ margin: Sizes.fixPadding * 2, marginTop: Sizes.fixPadding * 3 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('login')}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/customer_check.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function editButtonInfo() {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('profile')}
                style={{
                    position: 'absolute',
                    top: Sizes.fixPadding,
                    right: Sizes.fixPadding,
                }}>
                <Image
                    source={require('../../assets/icons/edit.png')}
                    style={styles.itemImage}
                />
            </TouchableOpacity>
        );
    }

    function socialIconsInfo() {
        return (
            <View
                style={{
                    ...styles.row,
                    alignSelf: 'center',
                    marginVertical: Sizes.fixPadding * 2,
                }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        Linking.openURL('https://www.facebook.com/fortunetalkofficial/')
                    }
                    style={styles.socialImage}>
                    <Image
                        source={require('../../assets/icons/facebook.png')}
                        style={{ width: '100%', height: '100%' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        Linking.openURL('https://www.instagram.com/fortune_talk/')
                    }
                    style={styles.socialImage}>
                    <Image
                        source={require('../../assets/icons/instagram.png')}
                        style={{ width: '100%', height: '100%' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                    Linking.openURL('https://x.com/Fortunetalk_')
                } style={styles.socialImage}>
                    <Image
                        source={require('../../assets/icons/twiter.png')}
                        style={{ width: '100%', height: '100%' }}
                    />
                </TouchableOpacity >
                <TouchableOpacity onPress={() => openWhatsApp('+91 99116 66793')}
                    style={styles.socialImage}>
                    <Image
                        source={require('../../assets/icons/whatsapp.png')}
                        style={{ width: '100%', height: '100%' }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function availableOnInfo() {
        return (
            <View style={{ ...styles.row, alignSelf: 'center' }}>
                <Divider
                    color={Colors.primaryDark}
                    width={2}
                    orientation={'horizontal'}
                    style={{ width: 40 }}
                />
                <Text
                    style={{
                        ...Fonts._18InterMedium,
                        color: Colors.primaryDark,
                        marginHorizontal: Sizes.fixPadding,
                    }}>
                    Available On
                </Text>
                <Divider
                    color={Colors.primaryDark}
                    width={2}
                    orientation={'horizontal'}
                    style={{ width: 40 }}
                />
            </View>
        );
    }

    function buttonInfo() {
        const on_rateus = () => {
            try {
                Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.ksbm.fortunetalk&hl=en&gl=US',
                )
            } catch (e) {
                console.log(e);
            }
        };


        return (
            <View
                style={{ margin: Sizes.fixPadding * 2, marginTop: Sizes.fixPadding * 3 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('home3')}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/home_icon.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('learn')}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/earnings.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Learning</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigate("viewProduct")}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/cart.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>E-Commerce</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('walletHistory', { flag: 1 })}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/wallet_1.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Wallet Transaction</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('mycourse', { flag: 1 })}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Feather size={Sizes.fixPadding * 2} color={Colors.gray} name='book-open' />
                    <Text style={styles.itemTitle}>Courses</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('orderHistory')}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/history.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Order History</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('astrologyBlogs')}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/computer.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Astrology Blog</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('following')}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/customer_check.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Following</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => on_rateus()}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/star.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Rate us</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    // onPress={() => navigation.navigate('supportChat')}
                    onPress={() => openWhatsApp(+919911666793)}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/headphone.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Customer Support Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('astrologerApply')}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/success.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Apply as an Astrologers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('setting')}
                    style={{ ...styles.row, marginBottom: Sizes.fixPadding * 2 }}>
                    <Image
                        source={require('../../assets/icons/setting.png')}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemTitle}>Settings</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function offerWalletInfo() {
        return (
            <View style={{ ...styles.row, justifyContent: 'space-evenly', width: '90%', alignSelf: 'center' }}>
                {/* <TouchableOpacity
                    activeOpacity={0.8}
                    disabled
                    onPress={() => navigation.navigate('offerAstrologers')}
                    style={{ width: '40%', borderRadius: 100, overflow: 'hidden' }}>
                    <LinearGradient
                        colors={[Colors.primaryLight, Colors.primaryDark]}
                        style={{
                            ...styles.row,
                            width: '100%',
                            ...styles.center,
                            paddingVertical: Sizes.fixPadding * 0.8,
                        }}>
                        <Image
                            source={require('../../assets/icons/offers.png')}
                            style={{ width: 16, height: 16 }}
                        />
                        <Text
                            style={{
                                ...Fonts._11InterMedium,
                                color: Colors.white,
                                marginLeft: Sizes.fixPadding * 0.8,
                            }}>
                            Offers
                        </Text>
                    </LinearGradient>
                </TouchableOpacity> */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('wallet')}
                    style={{ width: '40%', borderRadius: 100, overflow: 'hidden' }}>
                    <LinearGradient
                        colors={[Colors.primaryLight, Colors.primaryDark]}
                        style={{
                            ...styles.row,
                            width: '100%',
                            ...styles.center,
                            paddingVertical: Sizes.fixPadding * 0.8,
                        }}>
                        <Ionicons name="wallet-outline" color={Colors.white} size={16} />
                        <Text
                            style={{
                                ...Fonts._11InterMedium,
                                color: Colors.white,
                                marginLeft: Sizes.fixPadding * 0.8,
                            }}>
                            {showNumber(customerData?.walletBalance)}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }

    function deviderInfo() {
        return (
            <Divider
                orientation="horizontal"
                style={{ marginVertical: Sizes.fixPadding * 1.3 }}
            />
        );
    }

    function nameEmailInfo() {
        return (
            <View style={{ ...styles.center }}>
                <Text style={{ ...Fonts._15RobotoRegular, fontSize: 16, color: Colors.black }}>{customerData?.customerName || 'Hii User!'}</Text>
                {true && (
                    <Text style={{ ...Fonts._11InterRegular, color: Colors.black, fontSize: 12 }}>{customerData?.phoneNumber || ''}</Text>
                )}
            </View>
        );
    }

    function profileImageInfo() {
        return (
            <LinearGradient
                colors={[Colors.primaryLight, Colors.primaryDark]}
                style={{
                    alignSelf: 'center',
                    height: SCREEN_WIDTH * 0.26,
                    padding: Sizes.fixPadding * 1.4,
                    justifyContent: 'flex-end',
                    borderBottomLeftRadius: 1000,
                    borderBottomRightRadius: 1000,
                    top: -10,
                    elevation: 8,
                    shadowColor: Colors.blackLight
                }}>
                <Image
                    source={require("../../assets/images/user.png")}
                    style={{
                        width: SCREEN_WIDTH * 0.17,
                        height: SCREEN_WIDTH * 0.17,
                        borderRadius: 1000,
                        borderWidth: 3,
                        borderColor: Colors.white,
                        padding: 0,
                        margin: 0,
                    }}
                />
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    customerData: state.customer.customerData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 18,
        height: 18,
    },
    itemTitle: {
        ...Fonts._13InterMedium,
        fontSize: 12,
        color: Colors.grayDark,
        marginLeft: Sizes.fixPadding * 1.8,
    },
    socialImage: {
        width: 30,
        height: 30,
        borderRadius: 100,
        overflow: 'hidden',
        marginHorizontal: Sizes.fixPadding * 0.8,
    },
});