import { View, Text, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Send } from 'react-native-gifted-chat'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../../assets/styles'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import { check, RESULTS, request, PERMISSIONS } from 'react-native-permissions';
import { getUniqueId } from '../../../utils/services'
import { connect } from 'react-redux'
import * as ChatActions from '../../../redux/actions/chatActions'

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const SendMic = ({ message, sendProps, sendButtonProps, updateState, dispatch, customerData, attachments, }) => {
    const [startTimer, setStartTimer] = useState(null)
    useEffect(() => {
        return () => {
            audioRecorderPlayer.removeRecordBackListener();
        };
    }, []);

    const reuestPermissionForRecord = async () => {
        const status = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
        if (status === RESULTS.GRANTED) {
            startRecording();
        } else {
            const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
            if (result === RESULTS.GRANTED) {
                // startRecording();
            } else {
            }
        }
    };

    const startRecording = async () => {
        try {
            setStartTimer(new Date())
            const path = Platform.select({
                ios: undefined,
                android: undefined,
            });
            const audioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC,
                AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                AVNumberOfChannelsKeyIOS: 2,
                AVFormatIDKeyIOS: AVEncodingOption.aac,
                OutputFormatAndroid: OutputFormatAndroidType.DEFAULT,
            };
            const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
            audioRecorderPlayer.addRecordBackListener(e => {
                updateState({ recordTime: audioRecorderPlayer.mmss(Math.floor(e.currentPosition / 1000)) })
            });
        } catch (e) {
            console.log(e);
        }
    }

    const stopRecording = async () => {
        try {
            updateState({ isMicPressed: false, recordTime: 0 })
            console.log(startTimer, 'startTimer')
            if (!startTimer) {
                return
            }
            setStartTimer(null)
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            dispatch(ChatActions.onSendRecording(result))
        } catch (e) {
            console.log(e)
        }
    }

    const onPressIn = ()=>{
        try{
            const msg = {
                _id: getUniqueId(),
                text: message,
                user: {
                    _id: customerData?._id,
                    name: customerData?.customerName,
                    // avatar: base_url + userData?.image,
                },
                sent: false,
                received: false,
                pending: true,
                delivered: false,
            }
            if (attachments?.visible) {
                dispatch(ChatActions.onSendAttachment(msg))
            } else if (message) {
                dispatch(ChatActions.sendChatMessage(msg))
            }
            updateState({message: ''})
        }catch(e){
            console.log(e)
        }
    }

    const onLongPress = ()=>{
        try{
            updateState({ isMicPressed: true })
            setStartTimer(new Date())
            reuestPermissionForRecord()
        }catch(e){
            console.log(e)
        }
    }

    return (
        <Send
            containerStyle={{ justifyContent: 'center' }}
            {...sendProps}
            sendButtonProps={{
                ...sendButtonProps,
                onLongPress,
                onPressIn,
                onPressOut: stopRecording
            }}
        >
            <View
                style={{
                    height: 38,
                    width: 38,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 1000,
                    backgroundColor: Colors.primaryLight,
                }}>
                <Ionicons name={message || attachments?.visible ? 'send' : 'mic'} color={Colors.white} size={18} />
            </View>
        </Send>
    )
}

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    attachments: state.chat.attachments
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(SendMic)