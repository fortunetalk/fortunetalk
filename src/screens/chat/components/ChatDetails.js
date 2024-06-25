import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import CustomeInput from './CustomeInput'
import { connect } from 'react-redux'

const ChatDetails = ({ dispatch, chatMessages }) => {
    console.log(chatMessages)
    const [messages, setMessages] = useState([])
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const renderInputToolbar = useCallback(({ sendButtonProps, ...props }) => {
        return <CustomeInput sendButtonProps={sendButtonProps} sendProps={props} />
    }, [])

    return (
        <GiftedChat
            messages={chatMessages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name: 'User',
                avatar: 'https://placeimg.com/140/140/any',
            }}
            placeholder='Enter message...'
            scrollToBottom={true}
            renderInputToolbar={renderInputToolbar}
            alwaysShowSend={true}
        />
    )
}

const mapStateToProps = state => ({
    chatMessages: state.chat.chatMessages
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetails)