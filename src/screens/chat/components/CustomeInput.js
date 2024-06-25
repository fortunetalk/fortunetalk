import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { InputToolbar, Send } from 'react-native-gifted-chat'
import { Colors, Sizes, Fonts } from '../../../assets/styles'
import SendMic from './SendMic'
import Attachments from './Attachments'

const CustomeInput = ({ sendButtonProps, sendProps }) => {
    const [state, setState] = useState({
        message: '',
        isMicPressed: false,
        recordTime: 0
    })

    const updateState = data => {
        setState(prevState => {
            const newState = { ...prevState, ...data }
            return newState
        })
    }

    const { message, isMicPressed, recordTime } = state

    const renderComposer = useCallback(() => {
        const onChangeText = (text) => {
            updateState({ isFocused: true, message: text })
        }
        return (
            <>
                {
                    isMicPressed ? <View style={{ flex: 1, height: 49, justifyContent: 'center' }}>
                        <Text style={{ ...Fonts._13InterMedium }}>{recordTime}</Text>
                    </View> : <TextInput
                        placeholder='Enter message...'
                        onChangeText={onChangeText}
                        style={{ ...Fonts._13InterMedium, flex: 1 }}
                    />
                }

            </>

        )
    }, [isMicPressed, recordTime])

    const renderSend = useCallback(() => {
        return (
            <SendMic message={message} sendButtonProps={sendButtonProps} sendProps={sendProps} updateState={updateState} />
        )
    }, [message])

    const renderActions = useCallback(() => {
        return (
            <Attachments />
        )
    }, [])

    return (
        <InputToolbar
            renderComposer={renderComposer}
            renderActions={renderActions}
            renderSend={renderSend}
            containerStyle={{ paddingHorizontal: Sizes.fixPadding, }}
            primaryStyle={{ flexDirection: 'row', alignItems: 'center', }}
        />
    )
}

export default CustomeInput