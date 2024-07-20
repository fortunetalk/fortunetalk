import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Sizes, Fonts, Colors } from '../../../assets/styles'
import { navigate } from '../../../utils/navigationServices'

const Search = () => {
  return (
    <View
      style={{
        paddingVertical: Sizes.fixPadding,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.gray + '30',
        paddingHorizontal: Sizes.fixPadding * 1.5,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate('onlineastrologers')}
        style={{
          ...styles.row,
          borderBottomWidth: 0,
          margin: 0,
          padding: 0,
          paddingVertical: 0,
          paddingTop: 0,
          backgroundColor: Colors.grayLight + '50',
          borderRadius: 1000,
          paddingHorizontal: Sizes.fixPadding,
          height: 36,
        }}>
        <Image
          source={require('../../../assets/icons/search.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text
          style={{
            ...Fonts.gray14RobotoRegular,
            marginLeft: Sizes.fixPadding,
          }}>
          Search for an astrologer...
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});