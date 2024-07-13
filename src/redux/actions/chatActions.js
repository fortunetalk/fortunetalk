import * as actionTypes from '../actionTypes'

export const sendChatRequest = payload => ({
    type: actionTypes.SEND_CHAT_REQUEST,
    payload
})

export const setChatData = payload => ({
    type: actionTypes.SET_CHAT_DATA,
    payload
})

export const setChatMessages = payload => ({
    type: actionTypes.SET_CHAT_MESSAGES,
    payload
})

export const setChatTimerCountdown = payload => ({
    type: actionTypes.SET_CHAT_TIMER_COUNTDOWN,
    payload,
})

export const setChatRequestedData = payload => ({
    type: actionTypes.SET_CHAT_REQUESTED_DATA,
    payload,
})

export const onInitiateChat = payload => ({
    type: actionTypes.ON_INITIATE_CHAT,
    payload,
})

export const sendChatMessage = payload => ({
    type: actionTypes.SEND_CHAT_MESSAGE,
    payload,
})

export const saveChatMessage = payload => ({
    type: actionTypes.SAVE_CHAT_MESSAGE,
    payload,
})

export const onEndChat = payload => ({
    type: actionTypes.ON_END_CHAT,
    payload,
})

export const onCloseChat = payload => ({
    type: actionTypes.ON_CLOSE_CHAT,
    payload,
})

export const onChatImageSend = payload => ({
    type: actionTypes.ON_CHAT_IMAGE_SEND,
    payload,
})

export const setChatImageData = payload => ({
    type: actionTypes.SET_CHAT_IMAGE_DATA,
    payload,
})

export const setCallInvoiceVisible = payload => ({
    type: actionTypes.SET_CALL_INVOICE_VISIBLE,
    payload,
})

export const setCallInvoiceData = payload => ({
    type: actionTypes.SET_CALL_INVOICE_DATA,
    payload,
})

export const setChatInvoiceVisible = payload => ({
    type: actionTypes.SET_CHAT_INVOICE_VISIBLE,
    payload,
})

export const setChatInvoiceData = payload => ({
    type: actionTypes.SET_CHAT_INVOICE_DATA,
    payload,
})

export const startChat = payload => ({
    type: actionTypes.START_CHAT,
    payload,
})

export const setAttachmentData = payload => ({
    type: actionTypes.SET_ATTACHMENT_DATA,
    payload,
})

export const onSendAttachment = payload => ({
    type: actionTypes.ON_SEND_ATTACHMENT,
    payload,
})

export const onSendRecording = payload => ({
    type: actionTypes.ON_SEND_RECORDING,
    payload
})

export const setChatWalletAlert = payload => ({
    type: actionTypes.SET_CHAT_WALLET_ALERT,
    payload,
})