import { delay, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { blobRequest, postRequest } from '../../utils/apiRequests'
import { app_api_url, base_url, get_chat_data, get_chat_details, initiate_chat, upload_chat_attachments } from '../../config/constants'
import { getUniqueId, isUserRegistered, showToastMessage } from '../../utils/services'
import * as ChatActions from '../actions/chatActions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import socketServices from '../../utils/socket'
import database from '@react-native-firebase/database'
import { navigate, resetToScreen } from '../../utils/navigationServices'
import { GiftedChat } from 'react-native-gifted-chat'
import RNFetchBlob from 'rn-fetch-blob'

function* sendChatRequest(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { astrologerId, astrologerName, astrologerImage } = actions.payload
        const customerData = yield select(state => state.customer.customerData)

        const isRegistered = yield isUserRegistered(customerData)
        if(!isRegistered){
            navigate('profile')
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
            return
        }

        const response = yield postRequest({
            url: app_api_url + initiate_chat,
            data: {
                customerId: customerData?._id,
                astrologerId,
                timeout: 60
            }
        })

        if (response.success) {
            yield put({ type: actionTypes.SET_CHAT_REQUEST_MODAL_DATA, payload: { visible: true, data: { astrologerName, astrologerImage } } })
            socketServices.emit('createChatRoom', {
                roomID: response?.data?._id,
                chatPrice: response?.data?.chatPrice,
                customerID: response?.data?.customerId,
                astroID: response?.data?.astrologerId,
                duration: response?.data?.maxduration,
                newUser: response?.data?.moaApplied
            });
        } else {
            if (response?.message == 'Insufficent Balance') {
                yield put({ type: actionTypes.SET_WALLET_ALERT_VISIBLE, payload: { visible: true, visibleFor: 'wallet_recharge' } })
            }
            showToastMessage({ message: response.message })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* startChat(actions) {
    try {
        const { dispatch, historyId } = actions.payload
        yield put({ type: actionTypes.SET_CHAT_REQUEST_MODAL_DATA, payload: { visible: false, data: { astrologerName: null, astrologerImage: null } } })
        socketServices.emit('joinChatRoom', historyId)
        socketServices.emit('startChatTimer', historyId)

        const response = yield postRequest({
            url: app_api_url + get_chat_data,
            data: {
                chatId: historyId,
                type: 'customer'
            }
        })

        if (!response) {
            return
        }

        const customer = yield AsyncStorage.getItem('customerData')
        const customerData = JSON.parse(customer)
        yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: customerData })

        yield AsyncStorage.setItem('chatData', JSON.stringify(response.data))
        yield put({ type: actionTypes.SET_CHAT_DATA, payload: response.data })

        const messagesRef = database()
            .ref(`Messages/${response.data.data.chatId}`)
            .orderByChild('createdAt');

        console.log(messagesRef)

        messagesRef.on('value', snapshot => {
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
                dispatch(ChatActions.setChatMessages(msg.reverse()))

                // setMessages(msg.reverse());
            } catch (e) {
                console.log(e);
            }
        });

    } catch (e) {
        console.log(e)
    }
}

function* sendChatMessage(actions) {
    try {
        const chatData = yield select(state => state.chat.chatData)
        const { payload } = actions

        const chatNode = database().ref(`Messages/${chatData?.data?.chatId}`).push();
        const newKey = chatNode.key;
        const chatRef = database().ref(`Messages/${chatData?.data?.chatId}/${newKey}`);
        chatRef.set({
            ...payload,
            pending: false,
            sent: true,
            received: false,
            createdAt: new Date().getTime(),
            addedAt: database.ServerValue.TIMESTAMP,
        });

    } catch (e) {
        console.log(e)
    }
}

function* saveChatMessage(actions) {
    try {
        const chatData = yield select(state => state.chat.chatData)
        const { payload } = actions
        yield put({ type: actionTypes.SET_CHAT_DATA, payload: GiftedChat.append(chatData, payload) })

    } catch (e) {
        console.log(e)
    }
}

function* onEndChat(actions) {
    try {
        const chatData = yield select(state => state.chat.chatData)
        socketServices.emit('endChat', { roomID: chatData?.data?.historyId });
        database().ref(`Messages/${chatData.chatId}`).off()
        yield delay(1500)
        yield put({ type: actionTypes.ON_CLOSE_CHAT, payload: null })
    } catch (e) {
        console.log(e)
    }
}

function* onCloseChat(actions) {
    try {
        const chatData = yield select(state => state.chat.chatData)
        if (!chatData) {
            resetToScreen('home')
            return
        }

        const response = yield postRequest({
            url: app_api_url + get_chat_details,
            data: {
                chatId: chatData?.data?.historyId
            }
        })

        if (response?.success) {
            yield AsyncStorage.removeItem('chatData')
            database().ref(`Messages/${chatData.chatId}`).off()
            yield put({ type: actionTypes.SET_CHAT_REQUESTED_DATA, payload: null })
            yield put({ type: actionTypes.SET_CHAT_DATA, payload: null })
            yield put({ type: actionTypes.SET_CHAT_TIMER_COUNTDOWN, payload: 0 })
            yield put({ type: actionTypes.GET_CUSTOMER_DATA, payload: null })
            yield put({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload: response?.data })
            yield put({ type: actionTypes.SET_CHAT_INVOICE_VISIBLE, payload: true })
        }

    } catch (e) {
        console.log(e)
    }
}

function* onSendAttachment(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const attachments = yield select(state => state.chat.attachments)
        const customerData = yield select(state => state.customer.customerData)
        const chatMessages = yield select(state => state.chat.chatMessages)

        const message = {
            ...payload,
            image: null,
            file: null,
            sent: true,
            received: true,
            pending: true,
            createdAt: new Date().getTime(),
            addedAt: database.ServerValue.TIMESTAMP,
        }

        if (attachments?.type === 'image') {
            message.image = attachments?.data
        } else {
            message.file = attachments?.data?.uri
        }

        yield put({ type: actionTypes.SET_CHAT_MESSAGES, payload: GiftedChat.append(chatMessages, message) })
        yield put({ type: actionTypes.SET_ATTACHMENT_DATA, payload: { ...attachments, visible: false } })

        const payloadData = [{ name: 'type', data: attachments?.type }]
        if (attachments?.type === 'image') {
            payloadData.push({
                name: 'image',
                filename: 'chat-image.png',
                type: 'image/png',
                data: RNFetchBlob.wrap(attachments?.data)
            })
        } else {
            payloadData.push({
                name: 'file',
                filename: 'fortunetalk.pdf',
                type: 'file/pdf',
                data: RNFetchBlob.wrap(attachments?.data?.uri)
            })
        }

        const response = yield blobRequest({
            url: app_api_url + upload_chat_attachments,
            data: payloadData
        })

        if (response?.success) {
            if (attachments?.type === 'image') {
                message.image = base_url + response?.data
            } else {
                message.file = base_url + response?.data
            }
        }

        yield put({ type: actionTypes.SEND_CHAT_MESSAGE, payload: message })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* onSendRecording(actions) {
    try {
        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)
        const chatMessages = yield select(state => state.chat.chatMessages)

        const message = {
            _id: getUniqueId(),
            text: '',
            user: {
                _id: customerData?._id,
                name: customerData?.customerName,
            },
            audio: payload,
            sent: true,
            received: true,
            pending: true,
            createdAt: new Date().getTime(),
            addedAt: database.ServerValue.TIMESTAMP,
        }

        yield put({ type: actionTypes.SET_CHAT_MESSAGES, payload: GiftedChat.append(chatMessages, message) })

        const payloadData = [{ name: 'type', data: 'voice' }]
        payloadData.push({
            name: 'voice',
            filename: 'fortunetalk.mp3',
            type: 'sound/mp3',
            data: RNFetchBlob.wrap(payload)
        })

        const response = yield blobRequest({
            url: app_api_url + upload_chat_attachments,
            data: payloadData
        })

        console.log(response)

        if (response?.success) {
            message.audio = base_url + response?.data
        }

        yield put({ type: actionTypes.SEND_CHAT_MESSAGE, payload: message })

    } catch (e) {
        console.log(e)
    }
}

export default function* chatSaga() {
    yield takeLeading(actionTypes.SEND_CHAT_REQUEST, sendChatRequest)
    yield takeLeading(actionTypes.START_CHAT, startChat)
    yield takeLeading(actionTypes.ON_END_CHAT, onEndChat)
    yield takeLeading(actionTypes.ON_CLOSE_CHAT, onCloseChat)
    yield takeLeading(actionTypes.SEND_CHAT_MESSAGE, sendChatMessage)
    yield takeLeading(actionTypes.ON_SEND_ATTACHMENT, onSendAttachment)
    yield takeLeading(actionTypes.ON_SEND_RECORDING, onSendRecording)
}