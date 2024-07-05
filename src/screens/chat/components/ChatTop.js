import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CountDown from './CountDown'
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../../assets/styles'

const ChatTop = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: Sizes.fixPadding*1.3}}>
      <CountDown />
      <TouchableOpacity style={{width: SCREEN_WIDTH*0.28, backgroundColor: Colors.primaryLight, paddingVertical: Sizes.fixPadding*0.5, borderRadius: 1000, marginLeft: Sizes.fixPadding}}>
        <Text style={{...Fonts._18RobotoBold, fontSize: 14, textAlign: 'center', color: Colors.white}}>End  Chat</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatTop