import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import { FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { resetToScreen } from '../../utils/navigationServices'

const Setting = () => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={<>
                        {logoutInfo()}
                    </>}
                    contentContainerStyle={{paddingVertical: Sizes.fixPadding*2}}
                />
            </View>
        </View>
    )

    function logoutInfo() {

        const clearData = async() =>{
            await AsyncStorage.clear()
            resetToScreen('login')
        }

        const onLogout = ()=>{
            Alert.alert('Alert!', 'Are you sure you want to log out?', [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Yes', style: 'destructive', onPress: clearData}
            ])
        }
        return (
            <TouchableOpacity onPress={onLogout} activeOpacity={0.8} style={{alignSelf: 'center'}}>
                <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding*2, borderRadius: Sizes.fixPadding, elevation: 5}}>
                    <Image source={require('../../assets/icons/logout.png')} style={{height: 20, width: 20, resizeMode: 'contain'}} />
                    <Text style={{...Fonts._15RobotoBold, marginLeft: Sizes.fixPadding, color: Colors.white}}>Log Out</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

}

export default Setting