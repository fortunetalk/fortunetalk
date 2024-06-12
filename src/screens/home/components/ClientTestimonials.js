import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import Stars from 'react-native-stars';

const ClientTestimonials = () => {
  const navigation = useNavigation()
  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
        disabled
          onPress={() =>
            navigation.navigate('tesetimonialsDetails', {data: item[0]})
          }
          activeOpacity={0.8}
          style={{
            width: SCREEN_WIDTH * 0.65,
            marginLeft: Sizes.fixPadding * 1.5,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            borderColor: Colors.primaryLight,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            marginBottom: Sizes.fixPadding * 1.5,
            shadowColor: Colors.black,
            backgroundColor: Colors.white,
            padding: Sizes.fixPadding * 0.8,
          }}>
          <Text numberOfLines={5} style={{...Fonts.gray11RobotoRegular}}>
          "To show the individual deprecation warnings and determine if they come"
          </Text>
          <View style={{...styles.row}}>
            <Image
              source={require('../../../assets/images/user.png')}
              style={{
                width: 25,
                height: 25,
                borderRadius: 100,
              }}
            />
            <Text
              style={{
                ...Fonts.gray11RobotoRegular,
                marginLeft: Sizes.fixPadding * 0.5,
              }}>
                Acharaya
            </Text>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <Stars
                default={4}
                count={5}
                half={true}
                starSize={9}
                fullStar={
                  <Ionicons
                    name={'star'}
                    size={9}
                    color={Colors.primaryLight}
                  />
                }
                emptyStar={
                  <Ionicons
                    name={'star-outline'}
                    size={9}
                    color={Colors.primaryLight}
                  />
                }
                // halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
              />
            </View>
          </View>
        </TouchableOpacity>
        {item.length == 2 && (
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() =>
            //   navigation.navigate('tesetimonialsDetails', {data: item[1]})
            // }
            style={{
              width: SCREEN_WIDTH * 0.65,
              marginLeft: Sizes.fixPadding * 1.5,
              borderRadius: Sizes.fixPadding,
              overflow: 'hidden',
              borderColor: Colors.primaryLight,
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              marginBottom: Sizes.fixPadding * 1.5,
              shadowColor: Colors.black,
              backgroundColor: Colors.white,
              padding: Sizes.fixPadding * 0.8,
            }}>
            <Text numberOfLines={5} style={{...Fonts.gray11RobotoRegular}}>
              "To show the individual deprecation warnings and determine if they come"
            </Text>
            <View style={{...styles.row}}>
              <Image
                source={require('../../../assets/images/user.png')}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                }}
              />
              <Text
                style={{
                  ...Fonts.gray11RobotoRegular,
                  marginLeft: Sizes.fixPadding * 0.5,
                }}>
                Aacharya Rama
              </Text>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Stars
                  default={4}
                  count={5}
                  half={true}
                  starSize={9}
                  fullStar={
                    <Ionicons
                      name={'star'}
                      size={9}
                      color={Colors.primaryLight}
                    />
                  }
                  emptyStar={
                    <Ionicons
                      name={'star-outline'}
                      size={9}
                      color={Colors.primaryLight}
                    />
                  }
                  // halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View style={{borderBottomWidth: 1, borderBottomColor: Colors.grayLight}}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{...Fonts.black16RobotoMedium}}>
          Client Testimonials
        </Text>
        {/* <TouchableOpacity>
          <Text style={{...Fonts.primaryLight15RobotoRegular}}>View all</Text>
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={[Array.from({length: 2}), Array.from({length: 2})]}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{paddingRight: Sizes.fixPadding * 1.5}}
      />
    </View>
  );
} 

export default ClientTestimonials

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});