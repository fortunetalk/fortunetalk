import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import moment from 'moment';
import MyHeader from '../../../components/MyHeader';
import React, { useEffect, useState } from 'react';
import { img_url_2 } from '../../../config/constants';
import MyStatusBar from '../../../components/MyStatusBar';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../../assets/styles';

const PoojaDetails = ({ navigation, route }) => {
  const progressValue = useSharedValue(0);
  
  const [state, setState] = useState({
    paginationIndex: 0,
    poojaData: {
      img_url: 'https://example.com/images/astrologer.jpg',
      owner_name: 'Astrologer John Doe',
      date: '2024-06-13',
      time: '2024-06-13T10:00:00Z',
      collection: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ],
    },
    poojaType: "Pooja Details",
    suggestedBy: "I dont Know"
  });

  useEffect(() => { }, [paginationIndex]);
  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const { paginationIndex, poojaData, poojaType, suggestedBy } = state;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {remaining()}
              {propbleInfo()}
              {astrologerInfo()}
              {bannerInfo()}
              {renderPagination()}
              {remediesInfo()}
              {aboutInfo()}
              {continueButtonInfo()}
            </>
          }
        />
      </View>
    </View>
  );

  function remaining() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            alignItems: "center",
            margin: Sizes.fixPadding * 1,
            paddingHorizontal: Sizes.fixPadding * 3,
            paddingVertical: Sizes.fixPadding * 1,
            backgroundColor: Colors.whiteDark,
            borderRadius: 20,
            elevation: 5,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.84,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: Colors.primaryDark,
              fontWeight: "600"
            }}
          >
            Sales Remaining - 01:45:03
          </Text>
        </View>
      </View>
    );
  }


  function continueButtonInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('bookingdetails')
        }
        style={{
          marginHorizontal: Sizes.fixPadding * 6,
          marginVertical: Sizes.fixPadding,
          borderRadius: 1000,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding * 1 }}>
          <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
            Book Now
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function aboutInfo() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 1.5,
        }}>
        <Text style={{ ...Fonts.black18RobotoMedium, color: Colors.blackLight }}>
          About the Product
        </Text>
        <Text
          style={{
            ...Fonts.gray14RobotoMedium,
            marginVertical: Sizes.fixPadding * 0.7,
          }}>
          Navagraha Pooja is a revered Hindu ritual dedicated to the nine celestial planets. This sacred practice involves the worship of planetary deities to seek their blessings and harmonize their influences on one's life. It is performed with devotion and precision, often guided by astrological considerations, and is known for its profound spiritual significance.
          {`\n\n`}
          Benefits - Performing Navagraha Pooja yields numerous advantages. It helps balance the effects of planetary positions, reducing negative impacts and enhancing positive ones for overall well-being. Additionally, it promotes mental clarity and emotional stability, aiding in decision-making and reducing mental distress. This ritual is believed to positively influence various aspects of life, including career, finances, and relationships, leading to greater prosperity. Moreover, Navagraha Pooja provides spiritual protection, offering a shield against malefic forces and instilling a deep sense of security.
        </Text>
      </View>
    );
  }

  function remediesInfo() {
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 1.5,
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <Text style={{ ...Fonts.gray12RobotoMedium, textTransform: 'capitalize' }}>
          Category - Book a Pooja
        </Text>
        <Text style={{ ...Fonts.primaryLight18RobotoMedium }}>
          NavGraha Pooja
        </Text>
        <Text style={{ ...Fonts.black16RobotoMedium }}>
          ₹ 6750
          <Text
            style={{
              ...Fonts.gray16RobotoMedium,
              textDecorationLine: 'line-through',
              marginLeft: Sizes.fixPadding * 2
            }}>
            7500
          </Text>
          <Text style={{
            ...Fonts.white14RobotoMedium, color: Colors.red, marginLeft: Sizes.fixPadding * 2
          }}>
            20% Off
          </Text>
        </Text>
      </View>
    );
  }

  function renderPagination() {
    return (
      <View style={styles.paginationContainer}>
        {poojaData?.collection.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  paginationIndex === index
                    ? Colors.blackLight
                    : Colors.grayDark + '70',
              },
            ]}
          />
        ))}
      </View>
    );
  }

  function bannerInfo() {
    const baseOptions = {
      vertical: false,
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH * 0.7,
    };

    const renderItem = ({ index }) => {
      return (
        <View
          style={{
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_WIDTH * 0.7,
            backgroundColor: Colors.whiteColor,
            borderRadius: Sizes.fixPadding * 2,
            alignSelf: 'center',
          }}>
          <Image
            source={require("../../../assets/images/astro.jpg")}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
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
            borderBottomColor: Colors.grayLight,
            paddingHorizontal: Sizes.fixPadding,
          }}
          autoPlay={true}
          autoPlayInterval={4000}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 112,
          }}
          data={poojaData?.collection}
          pagingEnabled={true}
          onSnapToItem={index => {
            updateState({ paginationIndex: index });
          }}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  }

  function astrologerInfo() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: Sizes.fixPadding,
          borderBottomWidth: 1,
          borderColor: Colors.grayD
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 1000,
            borderWidth: 2,
            borderColor: Colors.white,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowColor: Colors.black,
            overflow: 'hidden',
            marginLeft: Sizes.fixPadding * 1.5,
          }}>
          <Image
            source={{ uri: img_url_2 + poojaData?.img_url }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.whiteDark,
            paddingVertical: Sizes.fixPadding * 0.2,
          }}>
          <Text style={{ ...Fonts.black14InterMedium, textAlign: 'center' }}>
            {poojaData?.owner_name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.whiteDark,
            paddingHorizontal: Sizes.fixPadding * 2,
            paddingVertical: Sizes.fixPadding,
            borderTopLeftRadius: Sizes.fixPadding,
            borderBottomLeftRadius: Sizes.fixPadding,
            elevation: 8,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowColor: Colors.blackLight,
          }}>
          <Text style={{ ...Fonts.gray12RobotoMedium }}>Perform on</Text>
          <Text style={{ ...Fonts.primaryLight15RobotoMedium }}>
            {moment(poojaData.date).format('DD MMM YYYY')}
          </Text>
          <Text style={{ ...Fonts.primaryLight14RobotoMedium }}>
            {moment(poojaData?.time).format('hh:mm A')}
          </Text>
        </View>
      </View>
    );
  }

  function propbleInfo() {
    return (
      <View style={{ borderTopWidth: 1, borderColor: Colors.grayD }}>
        <View style={{ paddingHorizontal: Sizes.fixPadding * 1, paddingVertical: Sizes.fixPadding * 1, }}>

          <Text
            style={{
              ...Fonts.gray14RobotoMedium,
              fontSize: 16,
              color: Colors.blackLight,
            }}>
            Problems you are facing
          </Text>
          <Text
            style={{
              ...Fonts.gray14RobotoMedium,
              fontSize: 12,
              color: Colors.gray,
            }}>
            Durgesh chaudhary
            Durgesh chaudhary
            Durgesh chaudhary
            Durgesh chaudhary
            Durgesh chaudhary
          </Text>
        </View>
      </View>
    );
  }

  function header() {
    return <MyHeader title={'Pooja Details'} navigation={navigation} />;
  }
};

export default PoojaDetails;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
    paddingVertical: Sizes.fixPadding,
  },
  paginationDot: {
    width: 12,
    height: 2,
    borderRadius: 5,
    margin: 5,
  },
});
