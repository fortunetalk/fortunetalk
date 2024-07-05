import { View, Text, Platform } from 'react-native'
import React, { useEffect } from 'react'
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

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const SendMic = ({ message, sendProps, sendButtonProps, updateState }) => {

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
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            updateState({ recordTime: 0 });
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    const onPressIn = () => {
        if (message) {

        } else {
            console.log('hii')
            updateState({ isMicPressed: true })
            reuestPermissionForRecord()
        }
    }

    const onPressOut = () => {
        if (!message) {
            console.log('Bye')
            updateState({ isMicPressed: false })
            stopRecording()
        }
    }

    return (
        <Send
            containerStyle={{ justifyContent: 'center' }}
            {...sendProps}
            sendButtonProps={{
                ...sendButtonProps,
                onPressIn,
                onPressOut
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
                <Ionicons name={!message ? 'mic' : 'send'} color={Colors.white} size={18} />
            </View>
        </Send>
    )
}

export default SendMic