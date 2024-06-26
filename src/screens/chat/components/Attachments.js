import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors, Sizes } from '../../../assets/styles'
import { Divider } from '@rneui/themed'
import Tooltip from 'react-native-walkthrough-tooltip';
import AttachmentBackground from '../../../assets/svg/chat_attachment.svg'
import { onImagePicker } from '../../../utils/services';
import DocumentPicker, { types } from 'react-native-document-picker';

const ICON_SIZE = 18;
const ATTACHMENT_ICON_SIZE = 20;


const Items = ({ setTooltipVisible }) => {
    const onCamera = async () => {
        setTooltipVisible(false)
        const response = await onImagePicker({ type: 'capture' })
        if (response) {
            console.log(response)
        }
    }

    const onGallary = async () => {
        setTooltipVisible(false)
        const response = await onImagePicker({ type: 'gallary' })
        if (response) {
            console.log(response)
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
            <AttachmentBackground />
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


const Attachments = () => {
    const [toolTipVisible, setTooltipVisible] = useState(false)

    return (
        <View style={styles.container}>
            <Tooltip
                isVisible={toolTipVisible}
                backgroundColor='rgba(0,0,0,0.1)'
                content={<Items setTooltipVisible={setTooltipVisible} />}
                placement="top"
                onClose={() => setTooltipVisible(false)}
                contentStyle={styles.tooltipContent}
                arrowSize={{ width: 0, height: 0 }}
            >
                <TouchableOpacity activeOpacity={0.8} onPress={() => setTooltipVisible(true)} style={styles.attachmentButton}>
                    <Image source={require('../../../assets/icons/attachment.png')} style={styles.attachmentIcon} />
                </TouchableOpacity>
            </Tooltip>

            <Divider orientation='vertical' width={1.5} style={styles.divider} color={Colors.grayLight} />
        </View>
    )
}

export default Attachments

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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