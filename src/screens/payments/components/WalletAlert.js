import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native-paper'
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../../../assets/styles'
import { BlurView } from '@react-native-community/blur'
import { Divider } from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
import { connect } from 'react-redux'
import { navigate } from '../../../utils/navigationServices'
var Sound = require('react-native-sound');

var whoosh = new Sound('low_balance.mp4', Sound.MAIN_BUNDLE, error => {
  if (error) {
      console.log('failed to load the sound', error);
      return;
  }
});

whoosh.setNumberOfLoops(-1);

const WalletAlert = ({ dispatch, walletAlertVisible }) => {
  const [showBlur, setShowBlur] = useState(true);

  useEffect(()=>{
    try{
    
      if (walletAlertVisible?.visible && walletAlertVisible?.visibleFor === 'chat_wallet_recharge') {
        console.log('hii');
        whoosh.play(success => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    }
    }catch(e){
      console.log(e)
    }
    return ()=>{
      whoosh.stop()
    }
  }, [walletAlertVisible?.visible, walletAlertVisible])

  const onRecharge = () => {
    setShowBlur(false);
    navigate('wallet', { type: walletAlertVisible?.visibleFor })
    dispatch(AstrologerActions.setWalletAlertVisible({visible: false, visibleFor: ''}))
  }
  return (
    <Modal
      visible={walletAlertVisible?.visible}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { showBlur &&
          <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor='transparent'
        />
        }
        
        <View style={{ backgroundColor: Colors.grayD, borderRadius: Sizes.fixPadding * 1.5, elevation: 8, width: '80%' }}>
          <Text style={{ ...Fonts._18RobotoBold, color: Colors.primaryDark, textAlign: 'center', marginVertical: Sizes.fixPadding }}>Low Balance Alert!</Text>
          <Divider orientation='horizontal' width={2} color={Colors.grayP} />
          <Image source={require('../../../assets/images/wallet_alert.png')} style={{ width: SCREEN_WIDTH * 0.4, height: SCREEN_WIDTH * 0.4, alignSelf: 'center' }} />
          <View style={{ width: '90%', backgroundColor: Colors.white, height: 100, alignSelf: 'center', borderRadius: Sizes.fixPadding * 1.5, bottom: SCREEN_WIDTH * 0.2, zIndex: -1, justifyContent: 'flex-end' }}>
            <Text style={{ ...Fonts._15RobotMedium, color: Colors.grayO, textAlign: 'center', marginBottom: Sizes.fixPadding }}>Recharge Your Wallet</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', bottom: SCREEN_WIDTH * 0.1 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {   setShowBlur(false); dispatch(AstrologerActions.setWalletAlertVisible({visible: false, visibleFor: ''}))}} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={onRecharge} style={{ width: '40%' }}>
              <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]} style={[styles.buttonContainer, { width: '100%', backgroundColor: 'transparent' }]}>
                <Text style={styles.buttonText}>Recharge</Text>
              </LinearGradient>

            </TouchableOpacity>
          </View>
        </View>

      </View>
    </Modal>
  )
}

const mapStateToProps = state => ({
  walletAlertVisible: state.astrologer.walletAlertVisible
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(WalletAlert)

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  buttonContainer: {
    width: '40%',
    paddingVertical: Sizes.fixPadding,
    borderRadius: 1000,
    backgroundColor: Colors.grayMedium
  },
  buttonText: {
    ...Fonts._15RobotMedium,
    textAlign: 'center',
    color: Colors.white
  }

})