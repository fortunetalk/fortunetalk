import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Sizes, Fonts } from '../../../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/liveActions';
import CallTimer from './CallTimer';
import { goBack } from '../../../utils/navigationServices';
import { base_url } from '../../../config/constants';

const Header = ({ roomUserCount, dispatch, coHostData, astroData, customerData }) => {
  const [duration, setDuration] = useState(null);
  useEffect(() => {
    if (coHostData) {
      const currentTime = new Date().getTime();
      const startTime = new Date(coHostData?.startTime).getTime();
      const diffTime = (currentTime - startTime) / 6000;
      const duration = coHostData?.totalDuration - parseInt(diffTime);
      if (duration < 0) {
        setDuration(null);
      } else {
        setDuration(duration);
      }
    } else {
      setDuration(null)
    }
  }, [coHostData, astroData]);

  return (
    <View style={styles.container}>
      <View style={styles.col1}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: astroData?.profileImage }}
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
          />
        </View>
        {coHostData && <View style={styles.coHostImageContainer}>
          <Image
            source={{ uri: base_url + coHostData?.img_url }}
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
          />
        </View>}
        <View style={{ marginLeft: Sizes.fixPadding }}>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts._13InterSemiBold,
              color: Colors.white,
              fontSize: 12,
            }}>
            {astroData?.name}
          </Text>
          <View style={styles.countContainer}>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts._13InterSemiBold,
              color: Colors.white,
              fontSize: 12,
            }}>
            {coHostData ? `${coHostData?.userName}` : null}
          </Text>
          <View style={styles.countContainer}>
            <Ionicons name="eye-outline" color={Colors.white} size={14} />
            <Text
              style={{
                ...Fonts.white12RobotoMedium,
                marginHorizontal: Sizes.fixPadding * 0.2,
              }}>
              {roomUserCount}
            </Text>
          </View>
          </View>
   
        </View>

        {duration && <CallTimer totalDuration={duration} />}
        <View style={styles.liveIndicator} />
      </View>
      <View style={styles.col2}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Are you sure!', 'You want to leave?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Yes',
                style: 'destructive',
                onPress: () => goBack()
              }
            ])
          }}
          activeOpacity={0.8}
          style={[styles.countContainer,
          { borderRadius: 1000, paddingVertical: 3, paddingHorizontal: 10, },
          ]}>
          <Text style={{ ...Fonts.white14RobotoMedium }}>Leave</Text>
        </TouchableOpacity>
        {(coHostData && customerData?._id == coHostData?.userID) && <TouchableOpacity
          onPress={() => dispatch(LiveActions.onEndCalling())}
          activeOpacity={0.8}
          style={[
            styles.countContainer,
            { borderRadius: 1000, paddingVertical: 0, paddingHorizontal: 0 },
          ]}>
          <Ionicons name="close-outline" color={Colors.white} size={26} />
        </TouchableOpacity>}

      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  roomUserCount: state.live.roomUserCount,
  coHostData: state.live.coHostData,
  astroData: state.live.astroData,
  customerData: state.customer.customerData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding,
  },
  col1: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray + '80',
    // paddingHorizontal: Sizes.fixPadding * 0.5,
    borderRadius: 10000,
  },
  col2: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  imageContainer: {
    width: 34,
    height: 34,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  coHostImageContainer: {
    width: 20,
    height: 20,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    position: 'absolute',
    left: 20,
    bottom: -1,
  },
  liveIndicator: {
    backgroundColor: Colors.red,
    width: 5,
    height: 5,
    position: 'absolute',
    top: Sizes.fixPadding * 0.8,
    left: Sizes.fixPadding * 0.5,
    borderRadius: 1000,
  },
  followContainer: {},
  countContainer: {
    flexDirection: 'row',
  },
});
