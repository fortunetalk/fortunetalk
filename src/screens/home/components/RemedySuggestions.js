import {TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Colors, SCREEN_WIDTH } from '../../../assets/styles';

const RemedySuggestions = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('remedies')}
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 0.3,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayLight,
      }}>
      <Image
        source={require('../../../assets/images/remedies_home.png')}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

export default RemedySuggestions