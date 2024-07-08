import { View, Text } from 'react-native'
import React from 'react'
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../../assets/styles'
import { connect } from 'react-redux'

const CountDown = ({chatTimerCountDown}) => {
    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return (
          String(minutes).padStart(2, '0') +
          ':' +
          String(remainingSeconds).padStart(2, '0')
        );
      };
    return (
        <View style={{ width: SCREEN_WIDTH * 0.28, backgroundColor: Colors.primaryLight, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }}>
            <Text style={{ ...Fonts._18RobotoBold, fontSize: 14, textAlign: 'center', color: Colors.white }}>{formatTime(chatTimerCountDown)} min</Text>
        </View>
    )
}

const mapStateToProps = state =>({
    chatTimerCountDown: state.chat.chatTimerCountDown
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(CountDown)