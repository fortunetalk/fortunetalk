import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';

const ECommerce = () => {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        // onPress={() => navigate_to(item?.name.toLowerCase(), item)}
        style={{
          width: SCREEN_WIDTH * 0.4,
          marginLeft: Sizes.fixPadding * 1.5,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
          marginBottom: Sizes.fixPadding * 1.5,
          // shadowColor: Colors.black,
          padding: Sizes.fixPadding * 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: Sizes.fixPadding * 2,
        }}>
        <Image
          source={require('../../../assets/images/astro.jpg')}
          style={{
            width: '90%',
            height: SCREEN_WIDTH * 0.4,
            borderTopLeftRadius: Sizes.fixPadding,
            borderTopRightRadius: Sizes.fixPadding,
          }}
        />
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.whiteDark,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            position: 'absolute',
            bottom: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding * 0.3,
            borderRadius: Sizes.fixPadding * 0.7,
            shadowColor: Colors.blackLight,
          }}>
          <Text style={{ ...Fonts.black14InterMedium, textAlign: 'center' }}>
            Fortune Store
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Fortune Store</Text>
        <TouchableOpacity
          disabled
          activeOpacity={0.8}
          onPress={() => navigation.navigate('eCommerce')}>
          <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Array.from({ length: 5 })}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
      />
    </View>
  );
}

export default ECommerce

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});