import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyStatusBar from '../components/MyStatusBar'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, SCREEN_WIDTH } from '../assets/styles'
import { connect } from 'react-redux'
import * as SettingActions from '../redux/actions/settingActions'
import LottieView from "lottie-react-native";

const Splash = ({ dispatch }) => {
    useEffect(() => {
        setTimeout(() => {
            dispatch(SettingActions.getSplash())
        }, 2000)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <LinearGradient
                colors={[Colors.primaryLight, Colors.primaryDark]}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../assets/animations/splash.json')}
                    style={{ width: "60%", height: "60%" }}
                    autoPlay
                />
            </LinearGradient>
        </View>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Splash)