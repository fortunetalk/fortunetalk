import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../../assets/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { showNumber } from '../../../utils/services';
import Carousel from 'react-native-reanimated-carousel';
import Pagination from './Pagination';
import { connect } from 'react-redux';

const bannerData = [
  { image: require('../../../assets/images/wallet_a.png') },
  { image: require('../../../assets/images/wallet_b.png') },
  { image: require('../../../assets/images/wallet_c.png') },
];

const WalletBanner = ({customerData}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const baseOptions = {
    vertical: false,
    width: SCREEN_WIDTH * 0.4,
    height: 158,
  };

  const renderItem = ({ index }) => {
    return (
      <View
        style={{
          width: SCREEN_WIDTH * 0.45,
          height: SCREEN_WIDTH * 0.4,
        }}>
        <Image
          source={bannerData[index].image}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primaryDark]}
        style={styles.walletContainer}>
        <View style={{ flex: 0.5 }}>
          <Text style={{ ...Fonts._18RobotoBold, color: Colors.white }}>
            Wallet Balance
          </Text>
          <Text
            style={{
              ...Fonts._18RobotoBold,
              color: Colors.white,
              fontSize: 32,
              marginTop: Sizes.fixPadding,
            }}>
            {showNumber(customerData?.walletBalance)}
          </Text>
        </View>
        <View style={{ flex: 0.4 }}>
          <Carousel
            {...baseOptions}
            loop
            testID={'xxx'}
            style={{
              width: '100%',
              marginBottom: Sizes.fixPadding
            }}
            autoPlay={true}
            autoPlayInterval={4000}
            onProgressChange={(_, absoluteProgress) => {
              const index = Math.ceil(absoluteProgress);
              setCurrentIndex(index);
            }}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 1,
              parallaxScrollingOffset: 0,
            }}
            data={bannerData}
            pagingEnabled={true}
            renderItem={renderItem}
          />
          <Pagination data={bannerData} currentIndex={currentIndex} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
})

export default connect(mapStateToProps, null)(WalletBanner);

const styles = StyleSheet.create({

  walletContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding * 5,
    justifyContent: 'space-around',
    paddingHorizontal: Sizes.fixPadding
  },

});
