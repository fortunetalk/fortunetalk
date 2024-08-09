import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Input } from '@rneui/themed';
import { Colors, Fonts, Sizes } from '../../../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LiveActions from '../../../redux/actions/liveActions';
import { connect } from 'react-redux';

const Footer = ({ dispatch }) => {
  const [message, setMessage] = useState('');

  const send = () => {
    dispatch(LiveActions.sendComments(message));
    setMessage('');
  };

  return (
    <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
      <Input
        value={message}
        placeholder="Say Hii..."
        placeholderTextColor={Colors.gray}
        cursorColor={Colors.primaryLight}
        onChangeText={setMessage}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
        style={styles.container}
        inputContainerStyle={styles.inputContainerStyle}
        rightIconContainerStyle={styles.rightIconContainerStyle}
        rightIcon={() => {
          return (
            <View
              style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={message.length == 0}
                onPress={send}
                style={{ marginHorizontal: Sizes.fixPadding, width: 28, height: 28, }}>
                <Image source={require('../../../assets/icons/live_send.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
              </TouchableOpacity>

            </View>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => dispatch(LiveActions.addHeart())}
        activeOpacity={0.8}
        style={{
          width: 36,
          height: 36,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 1000,
        }}>
        <Image source={require('../../../assets/icons/live_heart.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Footer);

const styles = StyleSheet.create({
  container: {},
  inputStyle: {

    ...Fonts.white14RobotoMedium,
    paddingHorizontal: Sizes.fixPadding,
  },
  containerStyle: {
    height: 60,
    width: '85%'
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#2e2e2e',
    borderRadius: 1000,
  },
  rightIconContainerStyle: {
    backgroundColor: 'transparent',
  },
});
