import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import { FlatList } from 'react-native';
import React, { useState } from 'react';
import Loader from '../../../components/Loader';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusBar';
import NoDataFound from '../../../components/NoDataFound';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../../assets/styles';

const PoojaAstrologerList = ({ navigation, route }) => {
  const [state, setState] = useState({
    isLoading: false,
    astrologerData: null,
  });

  const astrologerDummyData = [
    {
      id: '1',
      title: 'Astrology Consultation',
      owner_name: 'Astrologer A',
      date: '2024-06-13',
      time: '2024-06-13T10:00:00Z',
      astro_id: 'astro1',
    },
    {
      id: '2',
      title: 'Horoscope Reading',
      owner_name: 'Astrologer B',
      date: '2024-06-14',
      time: '2024-06-14T14:00:00Z',
      astro_id: 'astro2',
    },
    {
      id: '3',
      title: 'Tarot Card Reading',
      owner_name: 'Astrologer C',
      date: '2024-06-15',
      time: '2024-06-15T18:00:00Z',
      astro_id: 'astro3',
    },
  ];

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const { isLoading, astrologerData } = state;
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {bannerInfo()}
              {topMessageInfo()}
              {astrologerListInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />
      </View>
    </View>
  );

  function astrologerListInfo() {
    const getDayPart = time => {
      const dateTime = new Date(time);

      // Get the hour from the Date object
      const hour = dateTime.getHours();

      // Determine the time of day based on the hour
      let timeOfDay;

      if (hour >= 5 && hour < 12) {
        timeOfDay = 'morning';
      } else if (hour >= 12 && hour < 17) {
        timeOfDay = 'afternoon';
      } else if (hour >= 17 && hour < 20) {
        timeOfDay = 'evening';
      } else if (hour >= 20 && hour < 24) {
        timeOfDay = 'night';
      } else if (hour >= 0 && hour < 5) {
        timeOfDay = 'midnight';
      }
      return timeOfDay;
    };

    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('poojadetails', { poojaData: item, suggestedBy: item?.astro_id, poojaType: 0 })}
          style={{
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            marginBottom: Sizes.fixPadding * 2,
            elevation: 8,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowColor: Colors.blackLight,
          }}>
          <ImageBackground
            source={require('../../../assets/images/astro.jpg')}
            style={{
              width: '100%',
              height: SCREEN_WIDTH * 0.4,
            }}>
            <LinearGradient
              colors={[Colors.black, Colors.black + '00']}
              locations={[0.1, 1]}
              style={{ width: '100%', height: '50%', position: 'relative' }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }} >
                <Text style={{ ...Fonts.white14RobotoMedium, flex: 1, paddingLeft: 10, }}>{item?.title}</Text>
                <Text style={{ color: Colors.black, zIndex: 100, paddingRight: 8, paddingTop: 8 }}>Info</Text>
              </View>
              <ImageBackground
                source={require('../../../assets/images/edge_corner.png')}
                style={{
                  width: '40%',
                  height: "100%",
                  position: 'absolute',
                  right: -82,
                  bottom: 0,
                  top: -14,
                }}
                resizeMode="contain"
              />
            </LinearGradient>

            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '35%',
                height: '30%',
                justifyContent: 'flex-end',
                backgroundColor: Colors.white,
                paddingRight: 10,
                borderTopLeftRadius: 20,
                alignItems: "center"
              }} >
              <Text style={{ color: Colors.primaryDark, textAlign: 'right', fontWeight: "600", fontSize: 12 }} >Sale Remaining</Text>
              <Text style={{ color: Colors.primaryDark, textAlign: 'right', fontWeight: "800", fontSize: 14 }} >01:45:03</Text>
            </View>
          </ImageBackground>

          <LinearGradient
            colors={[Colors.primaryLight, Colors.primaryDark]}
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              padding: Sizes.fixPadding,
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 1000,
                borderWidth: 2,
                overflow: 'hidden',
                borderColor: Colors.white,
                elevation: 5,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowColor: Colors.blackLight,
              }}>
              <Image
                source={require('../../../assets/images/astro.jpg')}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View style={{ marginLeft: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.white14RobotoMedium }}>
                {item?.owner_name}
              </Text>
              <Text style={{ ...Fonts.white12RobotoMedium }}>
                {moment(item.date).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ alignSelf: 'flex-end', alignItems: 'center' }}>
                <Text style={{ ...Fonts.white11InterMedium }}>
                  {moment(item.time).format('hh:mm A')} ({getDayPart(item.time)}
                  )
                </Text>
                <TouchableOpacity
                  disabled
                  style={{
                    backgroundColor: Colors.white,
                    paddingHorizontal: Sizes.fixPadding,
                    borderRadius: 1000,
                    marginTop: Sizes.fixPadding * 0.3,
                  }}>
                  <Text style={{ ...Fonts.primaryDark11InterMedium }}>
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 1.5 }}>
        <FlatList
          data={astrologerDummyData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<NoDataFound />}
        />
      </View>
    );
  }

  function topMessageInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2 }}>
        <Text style={{ ...Fonts.gray14RobotoMedium, textAlign: 'center' }}>
          Astrologers list with their available date and time for pooja.
        </Text>
      </View>
    );
  }

  function bannerInfo() {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: Colors.grayLight,
          paddingBottom: Sizes.fixPadding,
        }}>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 1.5,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
          }}>
          <Image
            source={require('../../../assets/images/astro.jpg')}
            style={{ width: '100%', height: 100, resizeMode: 'cover' }}
          />
        </View>
      </View>
    );
  }

  function header() {
    return <MyHeader title={'Astrologer List'} navigation={navigation} />;
  }
};

export default PoojaAstrologerList;
