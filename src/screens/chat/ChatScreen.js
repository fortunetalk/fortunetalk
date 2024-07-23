import { View, Text, ImageBackground, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import ChatHeader from './components/ChatHeader'
import ChatDetails from './components/ChatDetails'
import ChatTop from './components/ChatTop'
import { connect } from 'react-redux'
import * as ChatActions from '../../redux/actions/chatActions'

const ChatScreen = ({ route, navigation, dispatch }) => {

  useEffect(() => {
    if (route?.params) {
      dispatch(ChatActions.startChat({ historyId: route.params.historyId.replace(/^:/, ''), dispatch }))
    }
  }, [dispatch])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
      <ChatHeader />
      <View style={{ flex: 1, borderTopLeftRadius: Sizes.fixPadding * 5, overflow: 'hidden' }}>
        <ImageBackground source={require('../../assets/images/chat_background.png')} style={{ flex: 1, backgroundColor: Colors.grayI }}>
          <ChatTop />
          <ChatDetails />
        </ImageBackground>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)