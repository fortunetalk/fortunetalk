import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux';
import * as PaymentActions from '../../redux/actions/paymentActions'

const Payment = ({ route, navigation, dispatch }) => {
    const { amount, type, planId } = route?.params || {}
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {paymentAmountInfo()}
                            {type == 'wallet' && paymentDetailesInfo()}
                            {borderInfo()}
                        </>
                    }
                />
            </View>
            {confirmPaymentInfo()}
        </View>
    )

    function confirmPaymentInfo() {
        return (
            <View
                style={{
                    ...styles.row,
                    justifyContent: 'space-evenly',
                    paddingVertical: Sizes.fixPadding * 0.8,
                    marginBottom: Sizes.fixPadding
                }}>
                {/* <View style={{ flex: 0.2, ...styles.center }}>
                    <View style={{ ...styles.row }}>
                        <Text style={{ ...Fonts.black16RobotoMedium }}>₹</Text>
                        <Text style={{ ...Fonts.gray16RobotoMedium }}>
                            {' '}
                            {(parseInt(amount) * 18) / 100 + parseInt(amount)}
                        </Text>
                    </View>
                    <Text style={{ ...Fonts.gray11RobotoRegular, fontSize: 9 }}>
                        View Detailes
                    </Text>
                </View> */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>dispatch(PaymentActions.onWalletRechage({amount, type: route?.params?.type, planId}))}
                    style={{
                        flex: 0.6,
                        backgroundColor: Colors.primaryLight,
                        paddingVertical: Sizes.fixPadding * 0.7,
                        borderRadius: Sizes.fixPadding * 1.5,
                    }}>
                    <Text style={{ ...Fonts._15RobotoBold, color: Colors.white, textAlign: 'center' }}>
                        Confirm your pay
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function borderInfo() {
        return (
            <View
                style={{
                    marginVertical: Sizes.fixPadding * 3,
                    height: 1,
                    backgroundColor: Colors.grayLight,
                }}
            />
        );
    }

    function paymentDetailesInfo() {
        return (
            <View
                style={{
                    margin: Sizes.fixPadding * 2,
                    backgroundColor: Colors.grayG,
                    borderRadius: Sizes.fixPadding * 2,
                    elevation: 5,
                    paddingBottom: Sizes.fixPadding * 4
                }}>
                <View style={{ padding: Sizes.fixPadding * 2 }}>
                    <View
                        style={{
                            ...styles.row,
                            justifyContent: 'space-between',
                            marginBottom: Sizes.fixPadding * 2,
                        }}>
                        <Text style={{ ...Fonts._15RobotMedium, color: Colors.grayMedium }}>Recharge Amount</Text>
                        <Text style={{ ...Fonts._15RobotMedium, color: Colors.grayMedium }}>₹{amount}</Text>
                    </View>
                    <View
                        style={{
                            ...styles.row,
                            justifyContent: 'space-between',
                            marginBottom: Sizes.fixPadding * 2,
                        }}>
                        <Text style={{ ...Fonts._15RobotMedium, color: Colors.grayMedium }}>GST(18%)</Text>
                        <Text style={{ ...Fonts._15RobotMedium, color: Colors.grayMedium }}>
                            ₹{(parseInt(amount) * 18) / 100}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        ...styles.row,
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        padding: Sizes.fixPadding,
                        borderRadius: 1000,
                        borderColor: Colors.primaryLight,
                        position: 'absolute',
                        width: '100%',
                        bottom: -10,
                        backgroundColor: Colors.white
                    }}>
                    <Text style={{ ...Fonts._15RobotMedium, color: Colors.primaryDark }}>
                        Payable Amount
                    </Text>
                    <Text style={{ ...Fonts._15RobotMedium, color: Colors.primaryDark }}>
                        ₹{(parseInt(amount) * 18) / 100 + parseInt(amount)}
                    </Text>
                </View>
            </View>
        );
    }

    function paymentAmountInfo() {
        return (
            <LinearGradient
                colors={[Colors.primaryLight, Colors.primaryDark]}
                style={{
                    width: SCREEN_WIDTH,
                    paddingTop: Sizes.fixPadding * 4,
                    paddingBottom: Sizes.fixPadding * 2,
                    backgroundColor: Colors.primaryDark,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{ ...Fonts.black18RobotoMedium, color: Colors.white }}>
                    Total to Pay
                </Text>
                <Text
                    style={{
                        ...Fonts.black18RobotoMedium,
                        color: Colors.white,
                        fontSize: 56,
                    }}>
                    ₹ {(parseInt(amount) * 18) / 100 + parseInt(amount)}
                </Text>
            </LinearGradient>
        );
    }

    function header() {
        return (
            <View
                style={{
                    paddingHorizontal: Sizes.fixPadding * 1.5,
                    paddingVertical: Sizes.fixPadding * 1.3,
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.grayLight,
                }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        alignSelf: 'flex-start',
                    }}>
                    <AntDesign
                        name="leftcircleo"
                        color={Colors.primaryLight}
                        size={Sizes.fixPadding * 2}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...Fonts.primaryLight15RobotoMedium,
                        textAlign: 'center',
                        flex: 0.92,
                    }}>
                    Payment Information
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Payment)

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_WIDTH * 0.15,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowColor: Colors.gray,
        borderWidth: 1,
        borderColor: Colors.white,
    },
    otherPaymentContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2,
        paddingVertical: Sizes.fixPadding,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayLight,
    },
});