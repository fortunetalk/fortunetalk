import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { showNumber } from '../../../utils/services';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../../assets/styles';
import Stars from 'react-native-stars';
import * as CallActions from '../../../redux/actions/callActions'
import * as ChatActions from '../../../redux/actions/chatActions'
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const TrendingAstrologers = ({ trendingAstrologerData, dispatch }) => {
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
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('astrologerDetails', {
            _id: item?._id,
          })
        }
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
          borderWidth: 2,
          borderColor: Colors.primaryLight
        }}>
        <Image
          source={require('../../../assets/gifs/trending.gif')}
          style={{ width: '100%', height: Sizes.fixPadding * 2 }}
        />
        <View
          style={{
            paddingHorizontal: Sizes.fixPadding * 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: item?.profileImage }}
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
            default={item?.rating}
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
          />
          <Text numberOfLines={1} style={{ ...Fonts.black14InterMedium }}>
            {item?.name}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.gray9RobotoRegular, color: Colors.black }}>
            {item?.experties?.join(', ')}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.gray9RobotoRegular, color: Colors.black  }}>
            {item?.languages?.join(', ')}
          </Text>
          <Text
            style={{
              ...Fonts.black11InterMedium,
              marginTop: Sizes.fixPadding * 0.2,
            }}>
            {showNumber(item?.chatPrice + item?.companyChatPrice)}/min
          </Text>
          <View
            style={{
              ...styles.row,
              marginVertical: Sizes.fixPadding,
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onChat(item)}
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
              activeOpacity={0.8}
              onPress={() => onCall(item)}
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
    <>
      {trendingAstrologerData && <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
          marginTop: Sizes.fixPadding * 1.5,
        }}>
        <FlatList
          data={trendingAstrologerData}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
        />
      </View>
      }
    </>

  );
}

const mapStateToProps = state => ({
  trendingAstrologerData: state.astrologer.trendingAstrologerData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TrendingAstrologers)

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});