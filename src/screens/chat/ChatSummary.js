import { View, Text, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import MyStatusBar from '../../components/MyStatusBar'
import MyHeader from '../../components/MyHeader'
import ChatDetails from './components/ChatDetails'
import Voice from './components/Voice'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import { Colors, Sizes, Fonts } from '../../assets/styles'
import { connect } from 'react-redux'
import database from '@react-native-firebase/database'

const ChatSummary = ({ customerData, route }) => {
    const chatId = route?.params?.chatData?.customerId + '+' +  route?.params?.chatData?.astrologerId?._id
    const [messages, setMessages] = useState([])

    useEffect(() => {
        try {
            const messagesRef = database()
                .ref(`Messages/${chatId}`)
                .orderByChild('createdAt')

            messagesRef.once('value', snapshot => {
                try {

                    const msg = [];
                    snapshot.forEach(childSnapshot => {
                        try {
                            
                            const message = childSnapshot.val();
                            // if (!message.received && message?.user?.id != cha?.user_id) {
                            //     // updateMessageStatus(childSnapshot.key);
                            // }
                            msg.push({ ...message });
                        } catch (e) {
                            console.log(e)
                        }

                    });
                    setMessages(msg.reverse())
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (e) {
            console.log(e)
        }
    }, [])


    const renderMessageAudio = useCallback((props) => {
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
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Chat Summary'} />
            <View style={{ flex: 1,overflow: 'hidden' }}>
                <ImageBackground source={require('../../assets/images/chat_background.png')} style={{ flex: 1, backgroundColor: Colors.grayI }}>
                    <GiftedChat
                        messages={messages}
                        // onSend={messages => onSend(messages)}
                        user={{
                            _id: customerData?._id,
                            name: customerData?.customerName,
                            // avatar: 'https://placeimg.com/140/140/any',
                        }}
                        placeholder=''
                        scrollToBottom={true}
                        renderInputToolbar={()=><></>}
                        alwaysShowSend={true}
                        renderChatFooter={null}
                        renderMessageAudio={renderMessageAudio}
                        renderBubble={renderBubble}
                        minInputToolbarHeight={0}
                        maxComposerHeight={0}
                    />
                </ImageBackground>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    customerData: state.customer.customerData
})

export default connect(mapStateToProps, null)(ChatSummary)