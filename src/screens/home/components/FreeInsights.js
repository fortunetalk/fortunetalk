import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { freeInsightData } from '../../../config/data';
import { SCREEN_WIDTH, Sizes, Fonts, Colors } from '../../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';

const FreeInsights = () => {
  const on_press = id => {
    switch (id) {
      case 1:
        // navigation.navigate('freeInsights');
        break;
      case 2:
        // navigation.navigate('matchMaking');
        break;
      case 3:
        // navigation.navigate('freeKundli');
        break;
      case 4:
        // navigation.navigate('panchang');
        break;
      default:
        console.log(null);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => on_press(item.id)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Sizes.fixPadding,
          marginHorizontal: SCREEN_WIDTH * 0.025,
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          locations={[0.75, 1]}
          style={{
            width: SCREEN_WIDTH * 0.2,
            height: SCREEN_WIDTH * 0.2,
            borderRadius: 1000,
            overflow: 'hidden',
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            marginBottom: Sizes.fixPadding * 0.5,
            shadowColor: Colors.black,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={item.image} style={{width: '85%', height: '85%'}} />
        </LinearGradient>
        <Text style={{...Fonts.gray14RobotoRegular, textAlign: 'center'}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{borderBottomWidth: 1, borderBottomColor: Colors.grayLight}}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{...Fonts.black16RobotoMedium}}>Free Insights</Text>
      </View>
      <FlatList
        data={freeInsightData}
        renderItem={renderItem}
        scrollEnabled={false}
        horizontal
      />
    </View>
  );
}

export default FreeInsights

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});