import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import CountDown from './CountDown'
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../../assets/styles'
import * as ChatActions from '../../../redux/actions/chatActions'
import { connect } from 'react-redux'

const ChatTop = ({ dispatch }) => {
  const onEndChat = () => {
    Alert.alert('Hold on!', 'Are you sure you want to end chat?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => dispatch(ChatActions.onEndChat()) },
    ]);
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: Sizes.fixPadding * 1.3 }}>
      <CountDown />
      <TouchableOpacity activeOpacity={0.8} onPress={onEndChat} style={{ width: SCREEN_WIDTH * 0.28, backgroundColor: Colors.primaryLight, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000, marginLeft: Sizes.fixPadding }}>
        <Text style={{ ...Fonts._18RobotoBold, fontSize: 14, textAlign: 'center', color: Colors.white }}>End  Chat</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatTop)