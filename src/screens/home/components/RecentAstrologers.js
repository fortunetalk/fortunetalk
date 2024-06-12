import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const RecentAstrologers = () => {
  const renderItem = ({ item, index }) => {
    // console.log(item)
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled
        style={{
          width: SCREEN_WIDTH * 0.6,
          marginLeft: Sizes.fixPadding * 1.5,
          overflow: 'hidden',
          elevation: 8,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          marginBottom: Sizes.fixPadding * 1.5,
          shadowColor: Colors.black,
          backgroundColor: Colors.whiteDark,
          alignItems: 'center',
          ...styles.row,
          padding: Sizes.fixPadding,
        }}>
        <Image
          source={require('../../../assets/images/user.png')}
          style={{
            width: SCREEN_WIDTH * 0.16,
            height: SCREEN_WIDTH * 0.16,
            borderRadius: 1000,
            alignSelf: 'center',
            borderWidth: 2.5,
            borderColor: Colors.primaryLight,
            marginVertical: Sizes.fixPadding * 0.5,
          }}
        />
        <View
          style={{
            paddingHorizontal: Sizes.fixPadding * 0.3,
            marginLeft: Sizes.fixPadding * 1.5,
          }}>
          <Text style={{ ...Fonts.black14InterMedium }}>Astro Acharya</Text>
          <Text style={{ ...Fonts.gray9RobotoRegular }}>
            {moment(new Date).format('DD-MM-YYYY, HH:mm A')}
          </Text>
          <View
            style={{
              ...styles.row,
              marginTop: Sizes.fixPadding * 0.5,
            }}>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('astrologerDetailes', {
              //     data: item?.id,
              //   })
              // }
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.primaryLight,
                borderRadius: Sizes.fixPadding * 0.5,
              }}>
              <Text style={{ ...Fonts.primaryDark11InterMedium }}>
                Chat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('astrologerDetailes', {
              //     data: item?.id,
              //   })
              // }
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.primaryLight,
                borderRadius: Sizes.fixPadding * 0.5,
                marginLeft: Sizes.fixPadding,
              }}>
              <Text style={{ ...Fonts.primaryDark11InterMedium }}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            transform: [{ rotateY: '180deg' }],
          }}>
          <MaterialIcons
            name="refresh"
            color={Colors.primaryLight}
            size={20}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayLight,
      }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Recent Astrologers</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('recentAstrologers')}>
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

export default RecentAstrologers

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});