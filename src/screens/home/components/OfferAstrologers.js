import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, Sizes, Colors, Fonts } from '../../../assets/styles';
import { showNumber } from '../../../utils/services';
import LinearGradient from 'react-native-linear-gradient';

const OfferAstrologers = () => {
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: SCREEN_WIDTH * 0.44,
          marginLeft: Sizes.fixPadding * 1.5,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
          borderWidth: 3,
          borderColor: Colors.grayLight,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          marginBottom: Sizes.fixPadding * 1.5,
          shadowColor: Colors.black,
          backgroundColor: Colors.white,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{}}>
          <View
            style={{
              backgroundColor: Colors.primaryLight,
              position: 'absolute',
              height: 40,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ ...Fonts.white16RobotoMedium }}>
              Astro Acharya
            </Text>
          </View>
          <View
            style={{
              ...styles.row,
              justifyContent: 'space-between',
              paddingHorizontal: Sizes.fixPadding * 0.5,
              marginTop: Sizes.fixPadding * 2.5,
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/images/user.png')}
                style={{
                  width: SCREEN_WIDTH * 0.12,
                  height: SCREEN_WIDTH * 0.12,
                  borderRadius: 1000,
                  borderWidth: 1,
                  borderColor: Colors.white,
                }}
              />
              <Text style={{ ...Fonts.black11InterMedium }}>
                Astro Acharya
              </Text>
              <Text
                numberOfLines={2}
                style={{ ...Fonts.gray9RobotoRegular, textAlign: 'center' }}>
                Love, Palm Reading
              </Text>
            </View>
            <View
              style={{
                flex: 0.6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ marginBottom: Sizes.fixPadding * 0.5 }}>
                <Text style={{ ...Fonts.primaryLight18RobotoMedium }}>
                  {showNumber(2)}
                  <Text
                    style={{
                      ...Fonts.gray12RobotoMedium,
                      textDecorationLine: 'line-through',
                    }}>
                    {' '}
                    {showNumber(1)}
                  </Text>
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate('astrologerDetailes', {
                //     data: item[0]?.astro_id,
                //   })
                // }
                >
                  <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{ borderRadius: Sizes.fixPadding * 0.3 }}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: Sizes.fixPadding * 0.5,
                        paddingVertical: Sizes.fixPadding * 0.2,
                      }}>
                      <Text
                        style={{ ...Fonts.white11InterMedium, fontSize: 9 }}>
                        Chat
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity>
                  <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{ borderRadius: Sizes.fixPadding * 0.3 }}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: Sizes.fixPadding * 0.5,
                        paddingVertical: Sizes.fixPadding * 0.2,
                      }}>
                      <Text
                        style={{ ...Fonts.white11InterMedium, fontSize: 9 }}>
                        Call
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {item.length == 2 && (
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() =>
            //   navigation.navigate('astrologerDetailes', {
            //     data: item[1]?.astro_id,
            //   })
            // }
            style={{ marginVertical: Sizes.fixPadding }}>
            <View
              style={{
                backgroundColor: Colors.primaryLight,
                position: 'absolute',
                height: 40,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ ...Fonts.white16RobotoMedium }}>
                First User
              </Text>
            </View>
            <View
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                paddingHorizontal: Sizes.fixPadding * 0.5,
                marginTop: Sizes.fixPadding * 2.5,
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/user.png')}
                  style={{
                    width: SCREEN_WIDTH * 0.12,
                    height: SCREEN_WIDTH * 0.12,
                    borderRadius: 1000,
                    borderWidth: 1,
                    borderColor: Colors.white,
                  }}
                />
                <Text style={{ ...Fonts.black11InterMedium }}>
                  Acharya Ram
                </Text>
                <Text
                  numberOfLines={2}
                  style={{ ...Fonts.gray9RobotoRegular, textAlign: 'center' }}>
                  Love Guru
                </Text>
              </View>
              <View
                style={{
                  flex: 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{ marginBottom: Sizes.fixPadding * 0.5 }}>
                  <Text style={{ ...Fonts.primaryLight18RobotoMedium }}>
                    {showNumber(3)}
                    <Text
                      style={{
                        ...Fonts.gray12RobotoMedium,
                        textDecorationLine: 'line-through',
                      }}>
                      {' '}
                      {showNumber(2)}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate('astrologerDetailes', {
                  //     data: item[1]?.astro_id,
                  //   })
                  // }
                  >
                    <LinearGradient
                      colors={[Colors.primaryLight, Colors.primaryDark]}
                      style={{ borderRadius: Sizes.fixPadding * 0.3 }}>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: Sizes.fixPadding * 0.5,
                          paddingVertical: Sizes.fixPadding * 0.2,
                        }}>
                        <Text
                          style={{ ...Fonts.white11InterMedium, fontSize: 9 }}>
                          Chat
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <LinearGradient
                      colors={[Colors.primaryLight, Colors.primaryDark]}
                      style={{ borderRadius: Sizes.fixPadding * 0.3 }}>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: Sizes.fixPadding * 0.5,
                          paddingVertical: Sizes.fixPadding * 0.2,
                        }}>
                        <Text
                          style={{ ...Fonts.white11InterMedium, fontSize: 9 }}>
                          Call
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
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
        <Text style={{ ...Fonts.black16RobotoMedium }}>Offer Astrologers</Text>
        <TouchableOpacity
          activeOpacity={0.8}
        // onPress={() => navigation.navigate('offerAstrologers')}
        >
          <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[Array.from({ length: 2 }), Array.from({ length: 2 })]}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
      />
    </View>
  );
}

export default OfferAstrologers

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});