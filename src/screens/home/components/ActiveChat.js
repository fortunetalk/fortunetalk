import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { secondsToHMS } from '../../../utils/services'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assets/styles'
import LinearGradient from 'react-native-linear-gradient'
import CountDown from '../../chat/components/CountDown'
import { connect } from 'react-redux'
import * as ChatActions from '../../../redux/actions/chatActions'
import { navigate } from '../../../utils/navigationServices'

const ActiveChat = ({ chatData, dispatch }) => {
    console.log(chatData)
    const onEndChat = () => {
        Alert.alert('Hold on!', 'Are you sure you want to end chat?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => dispatch(ChatActions.onEndChat()) },
        ]);
    }
    return (
        <>
            {
                chatData && <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Sizes.fixPadding }}>
                    <View>
                        <Image source={{ uri: chatData?.data?.profileImage }} style={{ width: SCREEN_WIDTH * 0.12, height: SCREEN_WIDTH * 0.12, borderRadius: 1000 }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...Fonts._15RobotMedium, color: Colors.white }}>{chatData?.data?.astroloerName}</Text>
                        <CountDown />
                    </View>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('chatScreen')} style={{ width: '20%', backgroundColor: Colors.greenDark, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }}>
                        <Text style={{ ...Fonts._13InterSemiBold, textAlign: 'center', color: Colors.white }}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={onEndChat} style={{ width: '20%', backgroundColor: Colors.red, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }}>
                        <Text style={{ ...Fonts._13InterSemiBold, textAlign: 'center', color: Colors.white }}>End</Text>
                    </TouchableOpacity>
                </LinearGradient>
            }
        </>

    )
}

const mapStateToProps = state => ({
    chatData: state.chat.chatData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat)