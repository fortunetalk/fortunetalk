import { View, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { Colors, SCREEN_WIDTH, Sizes } from '../../../assets/styles'
import { Divider } from '@rneui/themed'
import Tooltip from 'react-native-walkthrough-tooltip';
import AttachmentBackground from '../../../assets/svg/chat_attachment.svg'
import { onImagePicker } from '../../../utils/services';
import DocumentPicker, { types } from 'react-native-document-picker';
import * as ChatActions from '../../../redux/actions/chatActions'
import { connect } from 'react-redux';

const ICON_SIZE = 22;
const ATTACHMENT_ICON_SIZE = 24;


const Items = ({ setTooltipVisible, dispatch }) => {
    const onCamera = async () => {
        setTooltipVisible(false)
        const response = await onImagePicker({ type: 'capture' })
        if (response) {
            console.log(response)
            dispatch(ChatActions.setAttachmentData({visible: true, data: response[0]?.uri, type: 'image'}))

        }
    }

    const onGallary = async () => {
        setTooltipVisible(false)
        const response = await onImagePicker({ type: 'gallary' })
        if (response) {
            console.log(response)
            dispatch(ChatActions.setAttachmentData({visible: true, data: response[0]?.uri, type: 'image'}))
        }
    }

    const onPdfPicker = async () => {
        setTooltipVisible(false);
        try {
            const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
                type: [types.pdf],
            });
            console.log(pickerResult);
            dispatch(ChatActions.setAttachmentData({visible: true, data: {uri: pickerResult.fileCopyUri, name: pickerResult?.name, type: pickerResult?.type}, type: 'file'}))
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Unknown error: ', err);
            }
        }
    };

    return (
        <View style={styles.attachmentContainer}>
            <AttachmentBackground height={60} width={SCREEN_WIDTH*0.6} />
            <View style={styles.attachmentOverlay}>
                <TouchableOpacity activeOpacity={0.8} onPress={onGallary} style={styles.itemContainer}>
                    <Image source={require('../../../assets/icons/gallary.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={onCamera} style={styles.itemContainer}>
                    <Image source={require('../../../assets/icons/camera.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={onPdfPicker} style={styles.itemContainer}>
                    <Image source={require('../../../assets/icons/file.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const Attachments = ({dispatch}) => {
    const [toolTipVisible, setTooltipVisible] = useState(false)
    const onPress = ()=>{
        Keyboard.dismiss()
        setTimeout(()=>{
            setTooltipVisible(true)
        }, 500)
   
    }
    return (
        <View style={styles.container}>
            <Tooltip
                isVisible={toolTipVisible}
                backgroundColor='rgba(0,0,0,0.1)'
                content={<Items setTooltipVisible={setTooltipVisible} dispatch={dispatch} />}
                placement="top"
                onClose={() => setTooltipVisible(false)}
                contentStyle={styles.tooltipContent}
                arrowSize={{ width: 0, height: 0 }}
            >
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()} style={styles.attachmentButton}>
                    <Image source={require('../../../assets/icons/attachment.png')} style={styles.attachmentIcon} />
                </TouchableOpacity>
            </Tooltip>

            <Divider orientation='vertical' width={1.5} style={styles.divider} color={Colors.grayLight} />
        </View>
    )
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(Attachments)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: Sizes.fixPadding
    },
    attachmentContainer: {
        flex: 1,
    },
    attachmentOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        bottom: 5,
    },
    itemContainer: {
        width: ICON_SIZE,
        height: ICON_SIZE,
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    attachmentButton: {
        width: ATTACHMENT_ICON_SIZE,
        height: ATTACHMENT_ICON_SIZE,
    },
    attachmentIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    tooltipContent: {
        backgroundColor: 'transparent',
    },
    divider: {
        marginHorizontal: Sizes.fixPadding * 0.7,
    },
});