import React from 'react'
import { View, Text } from 'react-native'
import { Fonts, SCREEN_HEIGHT, SCREEN_WIDTH } from '../assets/styles'

const NoDataFound = ({ }) => {
  return (
    <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.6, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={Fonts.primaryLight18RighteousRegular} >No Data Found...</Text>
    </View>
  )
}

export default NoDataFound