import React from 'react'
import { eCommerce } from '../../../config/data';
import { navigate } from '../../../utils/navigationServices';
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'

const ECommerce = () => {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigate(item.redirect_to)}
        style={{
          width: SCREEN_WIDTH * 0.4,
          marginLeft: Sizes.fixPadding * 1.5,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
          marginBottom: Sizes.fixPadding * 1.5,
          padding: Sizes.fixPadding * 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: Sizes.fixPadding * 2,
        }}>
        <Image
          source={item.image}
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
            {item.title}
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
        <Text style={{ ...Fonts.black16RobotoMedium }}>E-Commerce</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate("eCommerce")}
        >
          <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={eCommerce}
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