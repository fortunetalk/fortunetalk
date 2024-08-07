import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { createRef, useCallback, useEffect, useState } from 'react';
import {
    CodeField,
    Cursor,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Colors, Sizes, Fonts } from '../../assets/styles';
import { connect } from 'react-redux';
import MyStatusBar from '../../components/MyStatusBar';
import Loader from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OtpCountDown from './components/OtpCountDown';
import * as AuthActions from '../../redux/actions/authActions.js';
import { showToastMessage } from '../../utils/services.js';

const CELL_COUNT = 4;

const Otp = ({ route, dispatch, isLoading, navigation }) => {
    const otpData = route.params ?? {};

    const [value, setValue] = useState('');
    const [duration, setDuration] = useState(59);
    const [otpprops, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    // useEffect(() => {
    //     Alert.alert('Alert', `Your otp is ${otpData?.otp}`)
    // }, [])

    const onTimeout = useCallback(() => {
        setDuration(0);
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <Loader visible={isLoading} />
            <LinearGradient
                colors={[Colors.primaryLight, Colors.primaryDark]}
                style={{ flex: 1 }}>
                {imageInfo()}
                <View style={styles.bottomContainer}>
                    <View style={{ flex: 1 }}>
                        {backHandleInfo()}
                        {topTitleInfo()}
                        {numberInfo()}
                        {phoneInput()}
                        {resendOtpInfo()}
                        {submiteButtonInfo()}
                    </View>
                </View>
            </LinearGradient>
        </View>
    );

    function imageInfo() {
        return <View style={{ flex: 0.2 }}></View>;
    }

    function submiteButtonInfo() {
        const otpHandle = () => {
            if (otpData?.otp === value) {
                dispatch(AuthActions.onOtpVerification({ otpData, dispatch }));
            } else {
                showToastMessage({ message: 'Invalid OTP!' })
            }

        };
        return (
            <TouchableOpacity
                onPress={() => otpHandle()}
                activeOpacity={0.8}
                style={{
                    width: '65%',
                    marginVertical: Sizes.fixPadding * 2,
                    alignSelf: 'center',
                }}>
                <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{
                        width: '100%',
                        paddingVertical: Sizes.fixPadding,
                        borderRadius: Sizes.fixPadding * 1.5,
                    }}>
                    <Text
                        style={{
                            ...Fonts._15RobotMedium,
                            color: Colors.white,
                            textAlign: 'center',
                        }}>
                        Verify
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    function resendOtpInfo() {
        const onResendOtp = () => {
            setDuration(59)
            dispatch(AuthActions.onLogin(otpData?.phoneNumber))
        }
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: Sizes.fixPadding * 3,
                }}>
                <Text disabled={duration != 0} onPress={() => onResendOtp()} style={{ ...Fonts._13InterMedium, color: duration != 0 ? Colors.blackLight : Colors.greenLight }}>
                    Resend code {duration != 0 ? <Text>in{' '}
                        <OtpCountDown duration={duration} onTimeOut={onTimeout} /></Text> : ''}
                </Text>
            </View>
        );
    }

    function phoneInput() {
        const inputRef = createRef();
        return (
            <CodeField
                ref={inputRef}
                {...otpprops}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        );
    }

    function numberInfo() {
        return (
            <Text
                style={{
                    ...Fonts._13InterMedium,
                    fontSize: 14,
                    color: Colors.greenLight,
                    textAlign: 'center',
                    marginTop: Sizes.fixPadding * 3,
                }}>
                Otp send to +91 {otpData?.phoneNumber}
            </Text>
        );
    }

    function topTitleInfo() {
        return (
            <Text
                style={{
                    ...Fonts.primaryDark18RobotoMedium,
                    textAlign: 'center',
                    marginTop: Sizes.fixPadding,
                }}>
                Verify your Number
            </Text>
        );
    }

    function backHandleInfo() {
        return (
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    padding: Sizes.fixPadding * 0.5,
                    alignSelf: 'flex-start',
                    marginHorizontal: Sizes.fixPadding * 2,
                }}>
                <AntDesign
                    name="leftcircleo"
                    color={Colors.primaryDark}
                    size={Sizes.fixPadding * 2.2}
                />
            </TouchableOpacity>
        );
    }
};

const mapStateToProps = state => ({
    isLoading: state.settings.isLoading
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Otp);

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 0.9,
        backgroundColor: Colors.white,
        borderTopLeftRadius: Sizes.fixPadding * 7,
        paddingTop: Sizes.fixPadding * 2,
    },
    inputContainer: {
        marginHorizontal: Sizes.fixPadding * 3,
        borderWidth: 1,
        borderColor: Colors.grayLight,
        borderRadius: Sizes.fixPadding * 2,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: 0,
        marginTop: Sizes.fixPadding * 2,
    },
    flagContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: Sizes.fixPadding * 0.8,
        borderRightWidth: 1,
        borderColor: Colors.grayLight,
    },
    socialButton: {
        flex: 0,
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding * 0.8,
        borderRadius: Sizes.fixPadding,
    },
    root: { flex: 1, padding: 20 },
    title: Fonts.greenDark14InterMedium,
    codeFieldRoot: { marginVertical: Sizes.fixPadding * 3, alignSelf: 'center' },
    cell: {
        width: 45,
        height: 45,
        lineHeight: 42,
        borderWidth: 1,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.grayDark,
        textAlign: 'center',
        backgroundColor: Colors.white,
        marginRight: 5,
        marginHorizontal: 10,
        ...Fonts.gray14RobotoMedium,
        fontSize: 22,
    },
    focusCell: {
        borderColor: Colors.primaryLight,
    },
});
