import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, Sizes, Colors, Fonts } from '../../../assets/styles';
import { showNumber } from '../../../utils/services';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as CallActions from '../../../redux/actions/callActions'
import * as ChatActions from '../../../redux/actions/chatActions'
import { useNavigation } from '@react-navigation/native';

const OfferAstrologers = ({ offerAstrologerData, dispatch }) => {

  const navigation = useNavigation()

  const onChat = (item) => {
    const payload = {
      navigation,
      astrologerId: item?._id,
      astrologerName: item?.name,
      astrologerImage: item?.profileImage,
    }
    dispatch(ChatActions.sendChatRequest(payload))
  }

  const onCall = (item) => {
    const payload = {
      navigation,
      astrologerId: item?._id,
      astrologerName: item?.name,

    }
    dispatch(CallActions.sendCallRequest(payload))
  }

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
          onPress={() =>
            navigation.navigate('astrologerDetails', {
              _id: item[0]?._id,
            })
          }
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
              {item[0]?.chatCallOffer?.displayName}
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
                source={{ uri: item[0]?.profileImage }}
                style={{
                  width: SCREEN_WIDTH * 0.12,
                  height: SCREEN_WIDTH * 0.12,
                  borderRadius: 1000,
                  borderWidth: 1,
                  borderColor: Colors.white,
                }}
              />
              <Text style={{ ...Fonts.black11InterMedium }}>
                {item[0]?.name}
              </Text>
              <Text
                numberOfLines={2}
                style={{ ...Fonts.gray9RobotoRegular, textAlign: 'center' }}>
                {item[0]?.expertiseId?.join(', ')}
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
                  {showNumber(item[0]?.chatPrice + item[0]?.companyChatPrice - ((item[0]?.chatPrice + item[0]?.companyChatPrice) * item[0]?.chatCallOffer?.discount / 100))}
                  <Text
                    style={{
                      ...Fonts.gray12RobotoMedium,
                      textDecorationLine: 'line-through',
                    }}>
                    {' '}
                    {showNumber(item[0]?.chatPrice + item[0]?.companyChatPrice)}
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
                  activeOpacity={0.8}
                  onPress={() =>
                    onChat(item[0])
                  }
                >
                  <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{ borderRadius: Sizes.fixPadding * 0.3 }}>
                    <View
                      style={{
                        paddingHorizontal: Sizes.fixPadding * 0.5,
                        paddingVertical: Sizes.fixPadding * 0.2,
                      }}>
                      <Text
                        style={{ ...Fonts.white11InterMedium, fontSize: 9 }}>
                        Chat
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    onCall(item[1])
                  }
                >
                  <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{ borderRadius: Sizes.fixPadding * 0.3 }}>
                    <View
                      style={{
                        paddingHorizontal: Sizes.fixPadding * 0.5,
                        paddingVertical: Sizes.fixPadding * 0.2,
                      }}>
                      <Text
                        style={{ ...Fonts.white11InterMedium, fontSize: 9 }}>
                        Call
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {item.length == 2 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('astrologerDetails', {
                _id: item[1]?._id,
              })
            }
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
                {item[1]?.chatCallOffer?.displayName}
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
                  source={{ uri: item[1]?.profileImage }}
                  style={{
                    width: SCREEN_WIDTH * 0.12,
                    height: SCREEN_WIDTH * 0.12,
                    borderRadius: 1000,
                    borderWidth: 1,
                    borderColor: Colors.white,
                  }}
                />
                <Text style={{ ...Fonts.black11InterMedium }}>
                  {item[1]?.name}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{ ...Fonts.gray9RobotoRegular, textAlign: 'center' }}>
                  {item[1]?.expertiseId?.join(', ')}
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
                    {showNumber(item[1]?.chatPrice + item[1]?.companyChatPrice - ((item[1]?.chatPrice + item[1]?.companyChatPrice) * item[1]?.chatCallOffer?.discount / 100))}
                    <Text
                      style={{
                        ...Fonts.gray12RobotoMedium,
                        textDecorationLine: 'line-through',
                      }}>
                      {' '}
                      {showNumber(item[1]?.chatPrice + item[1]?.companyChatPrice)}
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
                    activeOpacity={0.8}
                    onPress={() =>
                      onChat(item[1])
                    }
                  >
                    <LinearGradient
                      colors={[Colors.primaryLight, Colors.primaryDark]}
                      style={{ borderRadius: Sizes.fixPadding * 0.3 }}>
                      <View
                        style={{
                          paddingHorizontal: Sizes.fixPadding * 0.5,
                          paddingVertical: Sizes.fixPadding * 0.2,
                        }}>
                        <Text
                          style={{ ...Fonts.white11InterMedium, fontSize: 9 }}>
                          Chat
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      onCall(item[1])
                    }
                  >
                    <LinearGradient
                      colors={[Colors.primaryLight, Colors.primaryDark]}
                      style={{ borderRadius: Sizes.fixPadding * 0.3 }}>
                      <View
                        style={{
                          paddingHorizontal: Sizes.fixPadding * 0.5,
                          paddingVertical: Sizes.fixPadding * 0.2,
                        }}>
                        <Text
                          style={{ ...Fonts.white11InterMedium, fontSize: 9 }}>
                          Call
                        </Text>
                      </View>
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
    <>
      {
        offerAstrologerData ? offerAstrologerData.length != 0 && <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
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
            data={offerAstrologerData}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
          />
        </View> : null
      }
    </>

  );
}

const mapStateToProps = state => ({
  offerAstrologerData: state.astrologer.offerAstrologerData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(OfferAstrologers)

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});