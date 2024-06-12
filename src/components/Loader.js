import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../assets/styles'
import LottieView from 'lottie-react-native'

const Loader = ({ visible }) => {
  return (
    <Modal visible={visible} transparent >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require('../assets/animations/loader.json')}
          style={{ width: "30%", height: "30%" }}
          autoPlay
        // loop
        />
      </View>
    </Modal>
  )
}

export default Loader