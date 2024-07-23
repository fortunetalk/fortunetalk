import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { InputToolbar, Send } from 'react-native-gifted-chat'
import { Colors, Sizes, Fonts } from '../../../assets/styles'
import SendMic from './SendMic'
import Attachments from './Attachments'
import { connect } from 'react-redux'

const CustomeInput = ({ sendButtonProps, sendProps, attachments }) => {
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
            updateState({message: text })
        }
        return (
            <>
                {
                    isMicPressed ? <View style={{ flex: 1, height: 49, justifyContent: 'center' }}>
                        <Text style={{ ...Fonts._13InterMedium }}>{recordTime}</Text>
                    </View> : <TextInput
                        value={message}
                        placeholder='Enter message...'
                        multiline
                        onChangeText={onChangeText}
                        style={{ ...Fonts._13InterMedium, flex: 1 }}
                    />
                }

            </>

        )
    }, [isMicPressed, recordTime, message])

    const renderSend = useCallback(() => {
        return (
            <SendMic message={message} sendButtonProps={sendButtonProps} sendProps={sendProps} updateState={updateState} isMicPressed={isMicPressed} />
        )
    }, [message, sendButtonProps, sendProps])

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
            primaryStyle={{ flexDirection: 'row', alignItems: 'flex-end', }}
        />
    )
}

const mapStateToProps = state =>({
    attachments: state.chat.attachments
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(memo(CustomeInput))