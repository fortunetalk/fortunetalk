import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import CustomeInput from './CustomeInput'
import { connect } from 'react-redux'
import Footer from './Footer'
import { Colors, Fonts } from '../../../assets/styles'
import Voice from './Voice'

const ChatDetails = ({ dispatch, chatMessages, customerData, }) => {
    const renderInputToolbar = useCallback(({ sendButtonProps, ...props }) => {
        return <CustomeInput sendButtonProps={sendButtonProps} sendProps={props} />
    }, [])

    const renderChatFooter = useCallback(() => {
        return (
            <Footer />
        )
    }, [])

    const renderMessageAudio = useCallback((props)=>{
        return (
            <Voice {...props} />   
        )
    }, [])


    const renderBubble = useCallback((props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: Colors.primaryLight,
                    },
                    left: {
                        backgroundColor: '#FFECDB',
                    },
                }}
                textStyle={{
                    right: {
                        ...Fonts._13InterMedium,
                        color: Colors.white
                    },
                    left: {
                        ...Fonts._13InterMedium,
                    }
                }}
                c
            />
        )
    })

    return (
        <GiftedChat
            messages={chatMessages}
            // onSend={messages => onSend(messages)}
            user={{
                _id: customerData?._id,
                name: customerData?.customerName,
                // avatar: 'https://placeimg.com/140/140/any',
            }}
            placeholder='Enter message...'
            scrollToBottom={true}
            renderInputToolbar={renderInputToolbar}
            alwaysShowSend={true}
            renderChatFooter={renderChatFooter}
            renderMessageAudio={renderMessageAudio}
            renderBubble={renderBubble}
        />
    )
}

const mapStateToProps = state => ({
    chatMessages: state.chat.chatMessages,
    customerData: state.customer.customerData,
    // attachments: state.chat.attachments
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetails)