import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { BottomSheet } from '@rneui/themed';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/liveActions';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assets/styles';
import { showNumber, showToastMessage } from '../../../utils/services';
import { base_url } from '../../../config/constants';
import { Modal } from 'react-native-paper';
import { replace } from '../../../utils/navigationServices';

const GiftData = ({ dispatch, giftDataVisible, customerData, giftData }) => {
  const [selectedGift, setSelectedGift] = useState(null);
  const [isLowBalance, setIsLowBalance] = useState(false);

  return (
    <Modal
      visible={giftDataVisible}
      onDismiss={() => dispatch(LiveActions.setGiftVisible(false))}
      contentContainerStyle={{ zIndex: 6 }}
      style={{ zIndex: 7 }}
    >
      <View style={styles.container}>
        {headerInfo()}
        {giftData && giftsInfo()}
        {buttonsInfo()}
      </View>
    </Modal>
  );

  function buttonsInfo() {
    const onSend = () => {
      if (!selectedGift) {
        showToastMessage({ message: 'Please select a gift' })
        return
      }

      dispatch(LiveActions.sendGiftToAstrologer(selectedGift))

    }
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => replace('wallet')} style={styles.button}>
          <Text style={{ ...Fonts.black14InterMedium }}>Recharge</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={isLowBalance} onPress={onSend} style={styles.button}>
          <Text style={{ ...Fonts.black14InterMedium, color: isLowBalance ? Colors.gray : Colors.black }}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function giftsInfo() {
    const onSelect = item => {
      try {
        setSelectedGift(item?._id);
        if (customerData?.walletBalance < item?.amount) {
          setIsLowBalance(true);
        } else {
          setIsLowBalance(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const GiftItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelect(item)}
          style={[
            styles.giftItemContainer,
            {
              backgroundColor:
                selectedGift == item?._id ? Colors.primaryDark : Colors.white,
            },
          ]}>
          <Image
            source={{ uri: item?.image }}
            style={{ width: '40%', height: '40%' }}
          />
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.black11InterMedium,
              fontSize: 9,
              marginTop: Sizes.fixPadding * 0.5,
              color: selectedGift == item?._id ? Colors.white : Colors.blackLight,
            }}>
            {item?.title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.black11InterMedium,
              fontSize: 9,
              color: selectedGift == item?._id ? Colors.white : Colors.blackLight,
            }}>
            {showNumber(item?.amount)}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayQ, paddingVertical: Sizes.fixPadding * 0.5 }}>
          <Text style={{ ...Fonts.white18RobotMedium, color: Colors.primaryLight, textAlign: 'center' }}>
            Send Gift
          </Text>
        </View>

        <View style={styles.giftContainer}>
          {giftData.map((item, index) => (
            <GiftItem key={index} item={item} index={index} />
          ))}
        </View>
      </View>
    );
  }

  function headerInfo() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.walletContainer}>
          <Image
            source={require('../../../assets/icons/wallet_1.png')}
            style={{ width: 20, height: 20, resizeMode: 'contain' }}
            tintColor={Colors.white}
          />
          <Text
            style={{
              ...Fonts._13RobotoBold,
              color: Colors.white,
              fontSize: 12,
              marginLeft: Sizes.fixPadding * 0.7,
            }}>
            {showNumber(customerData?.walletBalance)}
          </Text>
        </View>
        <Text style={{ ...Fonts._11InterMedium, color: Colors.red, marginBottom: Sizes.fixPadding*0.5 }}>
          {isLowBalance ? 'Low Balance!' : '   '}
        </Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  giftDataVisible: state.live.giftDataVisible,
  customerData: state.customer.customerData,
  giftData: state.live.giftData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GiftData);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayD,
    borderRadius: Sizes.fixPadding * 2,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 1.5,
    borderBottomWidth: 1,
    borderBlockColor: Colors.grayQ,
    paddingTop: Sizes.fixPadding,
  },
  walletContainer: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding * 1.5,
    paddingVertical: Sizes.fixPadding * 0.5,
    elevation: 5,
    shadowColor: Colors.primaryDark,
  },
  giftContainer: {
    marginHorizontal: SCREEN_WIDTH * 0.05,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: Sizes.fixPadding,
  },
  giftItemContainer: {
    width: '20%',
    height: SCREEN_WIDTH * 0.18,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.fixPadding,
    marginRight: SCREEN_WIDTH * 0.04,
    borderRadius: Sizes.fixPadding,
    elevation: 5,
    shadowColor: Colors.grayDark,
  },
  buttonContainer: {
    margin: SCREEN_WIDTH * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding * 0.8,
    borderRadius: 1000,
    elevation: 5,
    shadowColor: Colors.grayDark,
  },
});
