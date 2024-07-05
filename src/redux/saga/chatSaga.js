import { put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { postRequest } from '../../utils/apiRequests'
import { app_api_url, get_chat_data, initiate_chat } from '../../config/constants'
import { showToastMessage } from '../../utils/services'
import * as ChatActions from '../actions/chatActions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import socketServices from '../../utils/socket'
import database from '@react-native-firebase/database'

function* sendChatRequest(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { astrologerId, astrologerName, astrologerImage } = actions.payload
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: app_api_url + initiate_chat,
            data: {
                customerId: customerData?._id,
                astrologerId,
                timeout: 60
            }
        })

        console.log(response)
        if (response.success) {
            yield put({ type: actionTypes.SET_CHAT_REQUEST_MODAL_DATA, payload: { visible: true, data: { astrologerName, astrologerImage } } })
            socketServices.emit('createChatRoom', {
                roomID: response?.data?._id,
                chatPrice: response?.data?.chatPrice,
                customerID: response?.data?.customerId,
                astroID: response?.data?.astrologerId,
                duration: response?.data?.maxduration,
                newUser: false
            });
        } else {
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

        console.log(response)

        yield AsyncStorage.setItem('chatData', JSON.stringify(response.data))
        yield put({ type: actionTypes.SET_CHAT_DATA, payload: response.data })

        const messagesRef = database()
            .ref(`Messages/${response.data.data.chatId}`)
            .orderByChild('createdAt');

        messagesRef.on('value', snapshot => {
            try {
                const msg = [];
                snapshot.forEach(childSnapshot => {
                    try {
                        const message = childSnapshot.val();
                        if (!message.received && message?.user?.id != requestedData?.user_id) {
                            // updateMessageStatus(childSnapshot.key);
                        }
                        msg.push({ ...message });
                    } catch (e) {
                        console.log(e)
                    }

                });
                console.log(msg)
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
        const requestedData = yield select(state => state.chat.requestedData)
        const chat_id = `customer_${requestedData?.user_id}_astro_${requestedData?.astroID}`
        const { payload } = actions

        const chatNode = database().ref(`ChatMessages/${chat_id}`).push();
        const newKey = chatNode.key;
        const chatRef = database().ref(`ChatMessages/${chat_id}/${newKey}`);
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
        const requestedData = yield select(state => state.chat.requestedData)
        socketServices.emit('endChat', { roomID: requestedData?.chatId });
        // yield put({ type: actionTypes.ON_CLOSE_CHAT, payload: null })
    } catch (e) {
        console.log(e)
    }
}

function* onCloseChat(actions) {
    try {
        const customerData = yield select(state => state.customer.customerData)
        const requestedData = yield select(state => state.chat.requestedData)

        const response = yield postRequest({
            url: api_url + get_chat_details,
            data: {
                chatId: requestedData?.chatId
            }
        })

        if (response?.success) {
            yield AsyncStorage.removeItem('chatData')
            yield put({ type: actionTypes.SET_CHAT_REQUESTED_DATA, payload: null })
            yield put({ type: actionTypes.SET_CHAT_DATA, payload: [] })
            yield put({ type: actionTypes.SET_CHAT_TIMER_COUNTDOWN, payload: 0 })
            yield put({ type: actionTypes.GET_CUSTOMER_DATA, payload: customerData?._id })
            yield put({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload: response?.chatHistory })
            yield put({ type: actionTypes.SET_CHAT_INVOICE_VISIBLE, payload: true })
        }
        resetToScreen('home')
    } catch (e) {
        console.log(e)
    }
}

export default function* chatSaga() {
    yield takeLeading(actionTypes.SEND_CHAT_REQUEST, sendChatRequest)
    yield takeLeading(actionTypes.START_CHAT, startChat)
}