import React from 'react'
import { connect } from 'react-redux';
import { View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { Colors, SCREEN_WIDTH, Sizes } from '../../../assets/styles';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '../../../utils/navigationServices';

const HomeBanner = ({ homeTopBannerData }) => {
  const baseOptions = {
    vertical: false,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.4,
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(item.redirectionUrl)}
        style={{
          width: SCREEN_WIDTH * 0.95,
          height: SCREEN_WIDTH * 0.35,
          backgroundColor: Colors.whiteColor,
          borderRadius: 5,
          padding: Sizes.fixPadding * 0.5,
        }}>
        <Image
          source={{ uri: item?.image }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            marginHorizontal: Sizes.fixPadding,
            borderRadius: Sizes.fixPadding,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, height: SCREEN_WIDTH * 0.4, }}>
      {
        homeTopBannerData && <Carousel
          {...baseOptions}
          loop
          testID={'xxx'}
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: Colors.grayLight,
            marginTop: Sizes.fixPadding * 0.5,
            paddingHorizontal: Sizes.fixPadding,
          }}
          autoPlay={true}
          autoPlayInterval={4000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 0,
          }}
          data={homeTopBannerData}
          pagingEnabled={true}
          renderItem={renderItem}
        />
      }

    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  homeTopBannerData: state.banners.homeTopBannerData
})

export default connect(mapStateToProps, null)(HomeBanner)