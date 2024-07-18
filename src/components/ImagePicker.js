import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { BottomSheet } from '@rneui/themed'
import { onImagePicker } from '../utils/services'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, Sizes, Fonts } from '../assets/styles'

const ImagePicker = ({ visible, onImagePick, onBackPress }) => {
    const onImage = async (type) => {
        const response = await onImagePicker({ type })
        if (response) {
            onImagePick(response[0].uri)
        } else {
            onImagePick(null)
        }
    }
    return (
        <BottomSheet
            isVisible={visible}
            onBackdropPress={() => onBackPress()}>
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: Sizes.fixPadding * 2,
                    backgroundColor: Colors.white,
                }}>
                <TouchableOpacity
                    onPress={() => onImage('capture')}
                    style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name={'camera'}
                        size={25}
                        color={Colors.blackLight}
                    />
                    <Text
                        style={{
                            ...Fonts.primaryLight15RobotoMedium,
                            marginLeft: 5,
                        }}>
                        Camera
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onImage('gallary')}
                    style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name={'image'}
                        size={25}
                        color={Colors.blackLight}
                    />
                    <Text
                        style={{
                            ...Fonts.primaryLight15RobotoMedium,
                            marginLeft: 5,
                        }}>
                        Gallery
                    </Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
}

export default ImagePicker