import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';
import * as CallActions from '../../../redux/actions/callActions'
import * as ChatActions from '../../../redux/actions/chatActions'
import { useNavigation } from '@react-navigation/native';

const RecentAstrologers = ({ recentAstrologerData, dispatch }) => {
  const navigation = useNavigation()

  const onChat = (item) => {
    const payload = {
      navigation,
      astrologerId: item?._id,
      astrologerName: item?.name,
      astrologerImage: item?.profileImage,
    }
    console.log(payload)
    dispatch(ChatActions.sendChatRequest(payload))
  }

  const onCall = (item) => {
    const payload = {
      navigation,
      astrologerId: item?._id,
      astrologerName: item?.name,

    }
    console.log(payload)
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
          source={{uri: item?.profileImage}}
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
          <Text style={{ ...Fonts.black14InterMedium }}>{item?.name}</Text>
          <Text style={{ ...Fonts.gray9RobotoRegular }}>
            {moment(item?.lastInteractionDate).format('DD-MM-YYYY, HH:mm A')}
          </Text>
          <View
            style={{
              ...styles.row,
              marginTop: Sizes.fixPadding * 0.5,
            }}>
            <TouchableOpacity
             activeOpacity={0.8}
             onPress={()=>onChat(item)}
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
              activeOpacity={0.8}
              onPress={()=>onCall(item)}
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
    <>
      {
        recentAstrologerData ? recentAstrologerData.length != 0 && <View
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
            data={recentAstrologerData}
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
  recentAstrologerData: state.astrologer.recentAstrologerData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(RecentAstrologers)

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});