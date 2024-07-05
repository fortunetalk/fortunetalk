import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../assets/styles';
import MyStatusBar from '../../components/MyStatusBar';
import { showNumber, showToastMessage } from '../../utils/services';
import AntDesign from 'react-native-vector-icons/AntDesign'
import WalletBanner from './components/WalletBanner';
import { regex } from '../../config/data';
import { connect } from 'react-redux';

const Wallet = ({ navigation }) => {
    const [amount, setAmount] = useState('')
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
                            <WalletBanner />
                            <View style={styles.boxContainer}>
                                {titleInfo()}
                                {inputFieldInfo()}
                                {pricesInfo()}
                                {proceedButtonInfo()}
                            </View>
                        </>
                    }
                />
            </View>
        </View>
    );

    function proceedButtonInfo() {
        const onPayment = () => {
            if(amount.length == 0){
                showToastMessage({message: 'Please enter an amount.'})
                return
            }else if(!regex.amount.test(amount)){
                showToastMessage({message: 'Please enter a valid amount.'})
                return
            }
            navigation.navigate('payment', { amount, type: 'wallet' })
        }
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPayment}
                style={{
                    backgroundColor: Colors.primaryLight,
                    paddingVertical: Sizes.fixPadding,
                    borderRadius: Sizes.fixPadding * 1.5,
                }}>
                <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
                    Proceed for Payment
                </Text>
            </TouchableOpacity>
        );
    }

    function pricesInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    // onPress={() => setAmount(item.recharge_plan_amount)}
                    activeOpacity={0.8}
                    style={[styles.priceBox, { backgroundColor: index == 1 ? Colors.primaryLight : Colors.grayF }]}>
                    <Text style={{ ...Fonts._15RobotMedium, color: index == 1 ? Colors.white : Colors.gray }}>{showNumber(25 + index * 5)}</Text>
                </TouchableOpacity>
            );
        };
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2, marginBottom: Sizes.fixPadding * 3 }}>
                <FlatList
                    data={Array.from({ length: 12 })}
                    renderItem={renderItem}
                    numColumns={3}
                />
                <Text style={{ ...Fonts._11RobotoRegular, textAlign: 'center', color: Colors.primaryLight }}>Choose from available amount</Text>
            </View>
        );
    }

    function inputFieldInfo() {
        return (
            <TextInput
                value={amount}
                placeholder="Enter amount"
                maxLength={5}
                placeholderTextColor={Colors.gray}
                keyboardType="number-pad"
                onChangeText={setAmount}
                style={{
                    ...Fonts._15RobotMedium,
                    color: Colors.primaryLight,
                    borderWidth: 1,
                    paddingVertical: Sizes.fixPadding * 0.8,
                    paddingHorizontal: Sizes.fixPadding * 2,
                    width: '80%',
                    alignSelf: 'center',
                    marginVertical: Sizes.fixPadding * 2,
                    borderRadius: 1000,
                    borderColor: Colors.primaryLight,
                }}
            />
        );
    }

    function titleInfo() {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding,
                    marginTop: Sizes.fixPadding * 3,
                }}>
                <Text
                    style={{ ...Fonts.primaryLight18RobotoMedium, textAlign: 'center' }}>
                    Add Money to your Wallet
                </Text>
            </View>
        );
    }

    function header() {
        return (
            <View
                style={{
                    padding: Sizes.fixPadding * 1.5,
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: Colors.primaryLight,
                }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        alignSelf: 'flex-start',
                    }}>
                    <AntDesign
                        name="leftcircleo"
                        color={Colors.white}
                        size={Sizes.fixPadding * 2}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...Fonts._15RobotMedium,
                        color: Colors.white,
                        textAlign: 'center',
                        flex: 0.92,
                    }}>
                    Wallet
                </Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)

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
        width: SCREEN_WIDTH * 0.85,
        backgroundColor: '#FBFBFB',
        top: -Sizes.fixPadding * 3,
        alignSelf: 'center',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowColor: Colors.blackLight,
        borderRadius: Sizes.fixPadding * 2,
        overflow: 'visible',
        marginBottom: Sizes.fixPadding,
    },
    priceBox: {
        width: SCREEN_WIDTH * 0.24,
        height: SCREEN_WIDTH * 0.15,
        marginLeft: SCREEN_WIDTH * 0.033,
        backgroundColor: '#FBFBFB',
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowColor: Colors.blackLight,
        marginBottom: SCREEN_WIDTH * 0.033,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
    },
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