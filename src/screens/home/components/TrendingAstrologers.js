import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { showNumber } from '../../../utils/services';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../../assets/styles';
import Stars from 'react-native-stars';

const TrendingAstrologers = () => {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() =>
        //   navigation.navigate('astrologerDetailes', {
        //     data: item?.id,
        //   })
        // }
        style={{
          width: SCREEN_WIDTH * 0.4,
          marginLeft: Sizes.fixPadding * 1.5,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          marginBottom: Sizes.fixPadding * 1.5,
          shadowColor: Colors.black,
          backgroundColor: Colors.white,
          alignItems: 'center',
        }}>
        {/* <Image
          source={require('../assets/gifs/trending.gif')}
          style={{ width: '100%', height: Sizes.fixPadding * 2 }}
        /> */}
        <View
          style={{
            paddingHorizontal: Sizes.fixPadding * 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/user.png')}
            style={{
              width: SCREEN_WIDTH * 0.14,
              height: SCREEN_WIDTH * 0.14,
              borderRadius: 1000,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: Colors.primaryLight,
              marginVertical: Sizes.fixPadding * 0.5,
            }}
          />
          <Stars
            default={3}
            count={5}
            half={true}
            starSize={14}
            disabled={true}
            fullStar={
              <Ionicons name={'star'} size={14} color={Colors.primaryLight} />
            }
            emptyStar={
              <Ionicons
                name={'star-outline'}
                size={14}
                color={Colors.primaryLight}
              />
            }
          // halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
          />
          <Text numberOfLines={1} style={{ ...Fonts.black14InterMedium }}>
            Acharya Shyam
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.gray9RobotoRegular }}>
            Love, Plam Reading
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.gray9RobotoRegular }}>
            Hindi, English
          </Text>
          <Text
            style={{
              ...Fonts.black11InterMedium,
              marginTop: Sizes.fixPadding * 0.2,
            }}>
            {showNumber(10)}/min
            {/* {item?.Offer_list.length != 0 && (
              <Text style={{ fontSize: 9, textDecorationLine: 'line-through' }}>
                {showNumber(10)}
              </Text>
            )} */}
            {/* {item?.moa == '1' && (
              <Text style={{ fontSize: 9, color: Colors.primaryLight }}>
                {'Free 5 min'}
              </Text>
            )} */}
          </Text>
          <View
            style={{
              ...styles.row,
              marginVertical: Sizes.fixPadding,
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.4,
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
              style={{
                flex: 0.4,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.primaryLight,
                borderRadius: Sizes.fixPadding * 0.5,
              }}>
              <Text style={{ ...Fonts.primaryDark11InterMedium }}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayLight,
        marginTop: Sizes.fixPadding * 1.5,
      }}>
      <FlatList
        data={Array.from({ length: 5 })}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
      />
    </View>
  );
}

export default TrendingAstrologers

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});