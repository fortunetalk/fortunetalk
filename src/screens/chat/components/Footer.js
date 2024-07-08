import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, SCREEN_HEIGHT } from '../../../assets/styles'
import * as ChatActions from '../../../redux/actions/chatActions'

const Footer = ({ attachments, dispatch }) => {
    return (
        <>
            {
                attachments?.visible && <View
                    style={{
                        height: SCREEN_HEIGHT * 0.4,
                        backgroundColor: Colors.primaryLight,
                        borderTopRightRadius: 10 * 2,
                        borderTopLeftRadius: 10 * 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={attachments?.type === 'file' ? require('../../../assets/images/file.png') : { uri: attachments?.data }}
                        style={{ width: '80%', height: '80%', resizeMode: 'contain' }}
                    />

                    {
                        attachments?.type === 'file' && <Text style={{ color: Colors.white, textAlign: 'center', fontSize: 12 }}>{attachments?.data?.name}</Text>
                    }

                    <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(ChatActions.setAttachmentData({ visible: false, data: null, type: null }))} style={{ position: 'absolute', zIndex: 99, right: 10, top: 10 }}>
                        <Ionicons name='close' color={Colors.white} size={24} />
                    </TouchableOpacity>
                </View>
            }
        </>

    )
}

const mapStateToProps = state => ({
    attachments: state.chat.attachments
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Footer)