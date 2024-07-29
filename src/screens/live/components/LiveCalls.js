import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { BottomSheet } from '@rneui/themed';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/liveActions';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assets/styles';
import { showNumber } from '../../../utils/services';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { base_url } from '../../../config/constants';

const LiveCalls = ({ liveCallsVisible, dispatch, liveData, astroData, layout }) => {
  console.log(liveData)
  return (
    <BottomSheet
      isVisible={liveCallsVisible} 
      onBackdropPress={() => dispatch(LiveActions.setLiveCallsVisible(false))}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: astroData?.profileImage }}
            style={styles.image}
          />
        </View>
        <View style={styles.container}>
          <Text
            style={{
              ...Fonts.white16RobotoMedium,
              textAlign: 'center',
              marginTop: Sizes.fixPadding * 5,
              marginBottom: Sizes.fixPadding * 4,
            }}>
            {astroData?.name}
          </Text>
          <View style={[styles.itemContainer, {marginBottom: Sizes.fixPadding}]}>
            <View
              style={{
                width: SCREEN_WIDTH * 0.15,
                height: SCREEN_WIDTH * 0.15,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F7C514',
              }}>
              <Ionicons name='videocam' color={Colors.white} size={22} />
            </View>
            <View style={{ width: '60%', paddingHorizontal: Sizes.fixPadding * 0.5 }}>
              <Text style={{ ...Fonts.white12RobotoRegular, fontSize: 13 }}>Video call @ {showNumber(liveData?.vedioCallPrice + liveData?.commissionVideoCallPrice)} <Text style={{ textDecorationLine: 'line-through' }}>{showNumber(53)}/min</Text></Text>
              <Text style={{ ...Fonts.white12RobotoRegular, fontSize: 8, color: '#F7C514' }}>Both consultant and you on video call</Text>
            </View>
            <TouchableOpacity disabled={layout == 'VIDEO_CALL'} onPress={() => dispatch(LiveActions.addInWaitingList('VIDEO_CALL'))} activeOpacity={0.8} style={{ width: '25%', backgroundColor: layout == 'VIDEO_CALL' ? Colors.grayDark : '#F7C514', justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.fixPadding * 0.8, borderRadius: Sizes.fixPadding * 0.5 }}>
              <Text style={{ ...Fonts.black14InterMedium, color: layout == 'VIDEO_CALL' ? Colors.white : Colors.black }}> {layout == 'VIDEO_CALL' ? 'Joined' : 'Join'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
            <View
              style={{
                width: SCREEN_WIDTH * 0.15,
                height: SCREEN_WIDTH * 0.15,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F7C514',
              }}>
              <Ionicons name='mic' color={Colors.white} size={22} />
            </View>
            <View style={{ width: '60%', paddingHorizontal: Sizes.fixPadding * 0.5 }}>
              <Text style={{ ...Fonts.white12RobotoRegular, fontSize: 13 }}>Voice call @ {showNumber(liveData?.voiceCallPrice + liveData?.commissionVoiceCallPrice)} <Text style={{ textDecorationLine: 'line-through' }}>{showNumber(53)}/min</Text></Text>
              <Text style={{ ...Fonts.white12RobotoRegular, fontSize: 8, color: '#F7C514' }}>Both consultant and you on voice call</Text>
            </View>
            <TouchableOpacity disabled={layout == 'VOICE_CALL'} onPress={() => dispatch(LiveActions.addInWaitingList('VOICE_CALL'))} activeOpacity={0.8} style={{ width: '25%', backgroundColor: layout == 'VOICE_CALL' ? Colors.grayDark : '#F7C514', justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.fixPadding * 0.8, borderRadius: Sizes.fixPadding * 0.5 }}>
              <Text style={{ ...Fonts.black14InterMedium, color: layout == 'VOICE_CALL' ? Colors.white : Colors.black }}> {layout == 'VOICE_CALL' ? 'Joined' : 'Join'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const mapStateToProps = state => ({
  liveCallsVisible: state.live.liveCallsVisible,
  liveData: state.live.liveData,
  astroData: state.live.astroData,
  layout: state.live.layout
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LiveCalls);

const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    backgroundColor: Colors.primaryLight,
    borderTopRightRadius: Sizes.fixPadding * 2,
    borderTopLeftRadius: Sizes.fixPadding * 2,
    padding: Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 3
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: Colors.primaryLight,
    overflow: 'hidden',
    alignSelf: 'center',
    bottom: -SCREEN_WIDTH * 0.15,
    zIndex: 1,

  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
