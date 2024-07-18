import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Sizes, Colors, Fonts } from '../../../assets/styles'
import { Divider } from '@rneui/themed'
import LottieView from "lottie-react-native";
import Feather from 'react-native-vector-icons/Feather';

const HomeHeader = () => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        marginHorizontal: Sizes.fixPadding * 1.5,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.openDrawer()}
        style={{ paddingVertical: Sizes.fixPadding }}>
        <Image
          source={require('../../../assets/icons/bar_icon.png')}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
      <Divider
        orientation="vertical"
        width={1}
        color={Colors.gray + '30'}
        style={{ marginHorizontal: Sizes.fixPadding }}
      />
      <Image
        source={require('../../../assets/icons/logo_icon.png')}
        style={{ width: 25, height: 25 }}
      />
      <Text
        style={{
          ...Fonts.primaryLight18RighteousRegular,
          marginLeft: Sizes.fixPadding,
        }}>
        FortuneTalk
      </Text>
      <View style={{ ...styles.row, flexGrow: 1, justifyContent: 'flex-end' }}>

        <TouchableOpacity
          onPress={() => navigation.navigate('notifications',)}
          style={{ paddingVertical: Sizes.fixPadding * 0.5, marginRight: Sizes.fixPadding }}>
          <Feather name='bell' color={Colors.black} size={22} />
          <Text style={{ ...Fonts.black11InterMedium, position: 'absolute', zIndex: 2, top: 0, right: 0, color: Colors.red_a, fontWeight:"600" }}>{"5"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('wallet', { type: 'wallet' })}
          style={{ paddingVertical: Sizes.fixPadding * 0.5, }}>
          <LottieView
            source={require('../../../assets/animations/wallet.json')}
            style={{ width: 40, height: 40 }}
            autoPlay
            loop
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            paddingVertical: Sizes.fixPadding * 0.5,
            marginLeft: Sizes.fixPadding,
          }}>
          <Image
            source={require('../../../assets/icons/translate.png')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});