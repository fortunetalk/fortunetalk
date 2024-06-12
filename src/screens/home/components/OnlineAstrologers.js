import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, Sizes, Fonts, Colors } from '../../../assets/styles';
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { showNumber } from '../../../utils/services';
import LottieView from "lottie-react-native";

const OnlineAstrologers = () => {
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
        <ImageBackground
          source={require('../../../assets/images/astro.jpg')}
          style={{ width: '100%', height: 50 }}>
          <Image
            source={require('../../../assets/images/user.png')}
            style={{
              width: SCREEN_WIDTH * 0.14,
              height: SCREEN_WIDTH * 0.14,
              borderRadius: 1000,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: Colors.white,
              marginVertical: Sizes.fixPadding * 0.5,
              position: 'absolute',
              bottom: -15,
              zIndex: 2,
            }}
          />
           <LottieView
                    source={require('../../../assets/animations/online.json')}
                    style={{ width: 15, height: 15, alignSelf: 'flex-end', margin: Sizes.fixPadding*0.5 }}
                    autoPlay
                    loop
                />

        </ImageBackground>
        <View
          style={{
            paddingHorizontal: Sizes.fixPadding * 0.3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: Sizes.fixPadding * 2,
            backgroundColor: Colors.grayLight,
            zIndex: -1,
          }}>
          <Stars
            default={4}
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
            Acharya Ram
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.gray9RobotoRegular }}>
            Love, Palm Reading
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.gray9RobotoRegular }}>
            Hindi, English
          </Text>
          <Text
            style={{
              ...Fonts.black11InterMedium,
              marginTop: Sizes.fixPadding * 0.2,
            }}>
            <Text
              style={{
                ...Fonts.black11InterMedium,
                marginTop: Sizes.fixPadding * 0.2,
                textDecorationLine:
                  item?.moa == '1' ? 'line-through' : 'none',
              }}>
              {showNumber(10)}/min
            </Text>
            {/* {item?.Offer_list.length != 0 && (
              <Text style={{ fontSize: 9 }}>
                {' '}
                ₹
                {sum_price({
                  firstPrice: parseFloat(item?.chat_price_m),
                  secondPrice: parseFloat(item?.chat_commission),
                })}
              </Text>
            )} */}
            {/* {item?.moa == '1' && (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: Colors.primaryLight,
                }}>
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
                Chat Now
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
      }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Online Astrologers</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('onlineAstrologers')}>
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

export default OnlineAstrologers

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});