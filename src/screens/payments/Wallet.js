import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../assets/styles';
import MyStatusBar from '../../components/MyStatusBar';
import { priceData } from '../../config/data';
import { showNumber } from '../../utils/services';
import Carousel from 'react-native-reanimated-carousel';

const Wallet = () => {
    const [amount, setAmount] = useState('0')
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
                            {walletInfo()}
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
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                // disabled={amount.length == 0}
                // onPress={on_payment}
                style={{
                    backgroundColor: Colors.primaryLight,
                    paddingVertical: Sizes.fixPadding,
                    borderRadius: Sizes.fixPadding * 2,
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
                    style={[styles.priceBox, { backgroundColor: amount == item.recharge_plan_amount ? Colors.primaryLight : Colors.white }]}>
                    <Text style={{ ...Fonts.gray14RobotoMedium, color: amount == item.recharge_plan_amount ? Colors.white : Colors.gray }}>₹ {parseFloat(item.recharge_plan_amount).toFixed(0)}</Text>
                </TouchableOpacity>
            );
        };
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2 }}>
                <FlatList
                    data={priceData}
                    renderItem={renderItem}
                    keyExtractor={item => item.recharge_plan_id}
                    numColumns={3}
                />
            </View>
        );
    }

    function inputFieldInfo() {
        return (
            <TextInput
                value={amount}
                placeholder="Enter amount"
                placeholderTextColor={Colors.gray}
                keyboardType="number-pad"
                onChangeText={setAmount}
                style={{
                    ...Fonts.primaryLight15RobotoMedium,
                    borderWidth: 1,
                    padding: Sizes.fixPadding * 0.8,
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
                    Add Money to your wallet
                </Text>
            </View>
        );
    }

    function walletInfo() {
        const baseOptions = {
            vertical: false,
            width: SCREEN_WIDTH * 0.4,
            height: 158,
        };

        const renderItem = ({ index }) => {
            return (
                <View
                    style={{
                        width: SCREEN_WIDTH * 0.4,
                        height: 150,
                    }}>
                    <Image
                        source={walletBannerData[index].image}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
            );
        };

        return (
            <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
                <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={styles.walletContainer}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={{ ...Fonts.white18RobotMedium, fontSize: 22 }}>
                            Wallet Balance
                        </Text>
                        <Text
                            style={{
                                ...Fonts.white18RobotMedium,
                                fontSize: 26,
                                marginTop: Sizes.fixPadding,
                            }}>
                            {showNumber(100)}
                        </Text>
                    </View>
                    <View style={{ flex: 0.4 }}>
                        <Carousel
                            {...baseOptions}
                            loop
                            testID={'xxx'}
                            style={{
                                width: '100%',
                            }}
                            autoPlay={true}
                            autoPlayInterval={4000}
                            onProgressChange={(_, absoluteProgress) => {
                                progressValue.value = Math.ceil(absoluteProgress);
                                // setPaginationIndex(Math.ceil(absoluteProgress));
                            }}
                            mode="parallax"
                            modeConfig={{
                                parallaxScrollingScale: 1,
                                parallaxScrollingOffset: 0,
                            }}
                            data={walletBannerData}
                            pagingEnabled={true}
                            renderItem={renderItem}
                        />
                        <View style={{ ...styles.row, justifyContent: 'center' }}>
                            {walletBannerData.map((_, index) => {
                                // console.log(index)
                                return (
                                    <WalletPagination
                                        animValue={progressValue}
                                        index={index}
                                        key={index}
                                        length={walletBannerData.length}
                                        isRotate={false}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
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
                        size={Sizes.fixPadding * 2.2}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...Fonts.white16RobotoMedium,
                        textAlign: 'center',
                        flex: 0.92,
                    }}>
                    Wallet
                </Text>
            </View>
        );
    }
}

export default Wallet

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

    walletContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding * 5,
        justifyContent: 'space-around',
    },

    boxContainer: {
        width: SCREEN_WIDTH * 0.85,
        backgroundColor: '#FBFBFB',
        top: -Sizes.fixPadding * 3,
        alignSelf: 'center',
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowColor: Colors.blackLight,
        borderRadius: Sizes.fixPadding * 2,
        overflow: 'hidden',
    },
    priceBox: {
        width: SCREEN_WIDTH * 0.24,
        height: SCREEN_WIDTH * 0.15,
        marginLeft: SCREEN_WIDTH * 0.033,
        backgroundColor: '#FBFBFB',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowColor: Colors.gray,
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