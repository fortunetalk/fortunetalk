import { View, Image } from 'react-native'
import React from 'react'
import { Colors, SCREEN_WIDTH, Sizes } from '../../../assets/styles';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeBanner = () => {
  const baseOptions = {
    vertical: false,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.4,
  };

  const renderItem = () => {
    return (
      <View
        style={{
          width: SCREEN_WIDTH * 0.95,
          height: SCREEN_WIDTH * 0.35,
          backgroundColor: Colors.whiteColor,
          borderRadius: 5,
          padding: Sizes.fixPadding * 0.5,
        }}>
        <Image
          source={require('../../../assets/images/astro.jpg')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            marginHorizontal: Sizes.fixPadding,
            borderRadius: Sizes.fixPadding,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <Carousel
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
        data={Array.from({length: 5})}
        pagingEnabled={true}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default HomeBanner