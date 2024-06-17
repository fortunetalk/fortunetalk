import React from 'react'
import {Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import { TouchableWithoutFeedback } from 'react-native';
import { navigate } from '../utils/navigationServices';
import { Colors, SCREEN_WIDTH, Sizes } from '../assets/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomCrousel = ({ data }) => {
  const baseOptions = {
    vertical: false,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.4,
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
       onPress={()=> navigate(item?.redirectionUrl)}
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
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop
        testID={'xxx'}
        style={{
          width: '100%',
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
        data={data}
        pagingEnabled={true}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default CustomCrousel