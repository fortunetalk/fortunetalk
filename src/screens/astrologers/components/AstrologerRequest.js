import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Modal } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assets/styles';
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
import { connect } from 'react-redux';
import { base_url } from '../../../config/constants';

const Dot = ({ animatedValue }) => {
    return (
        <Animated.View style={[styles.dot, { transform: [{ scale: animatedValue }] }]} />
    );
};

const DotsAnimation = () => {
    const dots = Array(5).fill(null).map(() => useRef(new Animated.Value(1)).current);

    useEffect(() => {
        const createAnimation = (dot, delay) => {
            return Animated.sequence([
                Animated.delay(delay), // Delay the animation
                Animated.timing(dot, {
                    toValue: 1.5, // Increase size
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(dot, {
                    toValue: 1, // Return to original size
                    duration: 300,
                    useNativeDriver: true,
                })
            ]);
        };

        const animations = dots.map((dot, index) => createAnimation(dot, index * 300));

        Animated.loop(Animated.stagger(300, animations)).start();
    }, [dots]);

    return (
        <View style={styles.container}>
            {dots.map((animatedValue, index) => (
                <Dot key={index} animatedValue={animatedValue} />
            ))}
        </View>
    );
};

const AstrologerRequest = ({ dispatch, chatRequestModalData, customerData }) => {
    return (
        <Modal
            visible={chatRequestModalData?.visible}
            onDismiss={() => dispatch(AstrologerActions.setChatRequestModalData({ visible: false, data: null }))}
            contentContainerStyle={{
                flex: 0,
                elevation: 8,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.2,
                shadowColor: Colors.blackLight
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
                                shadowColor: Colors.blackLight
                            }}>
                            <Image
                                source={{uri: base_url + customerData?.profileImage}}
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
                            {customerData?.customerName}
                        </Text>
                    </View>
                    <DotsAnimation />
                    <View style={styles.center}>
                        <View
                            style={{
                                width: SCREEN_WIDTH * 0.2,
                                height: SCREEN_WIDTH * 0.2,
                                borderRadius: 1000,
                                elevation: 8,
                                shadowColor: Colors.blackLight
                            }}>
                            <Image
                                source={{uri: chatRequestModalData?.data?.astrologerImage}}
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
                            {chatRequestModalData?.data?.astrologerName}
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
                        shadowColor: Colors.blackLight,
                    }}>
                    <Text
                        style={{
                            ...Fonts.white14RobotoMedium,
                            color: Colors.blackLight,
                            textAlign: 'center',
                            paddingBottom: Sizes.fixPadding * 4,
                        }}>
                        While you wait for {chatRequestModalData?.data?.astrologerName}, you may also
                        explore other astrologers and join their waitlist.
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => dispatch(AstrologerActions.setChatRequestModalData({ visible: false, data: null }))}
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
    )
}

const mapStateToProps = state => ({
    chatRequestModalData: state.astrologer.chatRequestModalData,
    customerData: state.customer.customerData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerRequest)

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 5,
        backgroundColor: Colors.white,
        marginVertical: 3,
    },
})
