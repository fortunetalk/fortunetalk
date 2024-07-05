import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH, Sizes, Fonts, Colors } from '../../../assets/styles'
import { useNetInfo } from "@react-native-community/netinfo";

const MyForegroundView = ({ userInfo }) => {
  const { type, isConnected } = useNetInfo();

  return (
    <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.3, marginTop: Sizes.fixPadding * 5, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{...Fonts._13InterSemiBold, color: Colors.white}}>{isConnected ? 'Connected' : 'Connecting...'}</Text>
    </View>
  )
}

export default MyForegroundView