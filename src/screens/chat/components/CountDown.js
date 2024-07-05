import { View, Text } from 'react-native'
import React from 'react'
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../../assets/styles'

const CountDown = () => {
    return (
        <View style={{ width: SCREEN_WIDTH * 0.28, backgroundColor: Colors.primaryLight, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }}>
            <Text style={{ ...Fonts._18RobotoBold, fontSize: 14, textAlign: 'center', color: Colors.white }}>05:00 min</Text>
        </View>
    )
}

export default CountDown