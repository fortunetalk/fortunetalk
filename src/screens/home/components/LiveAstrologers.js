import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Sizes, SCREEN_WIDTH } from '../../../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons'

const LiveAstrologers = () => {
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: Colors.primaryLight,
            paddingVertical: Sizes.fixPadding * 0.2,
            width: '80%',
            height: 20,
            alignSelf: 'center',
            bottom: -10,
            zIndex: 99,
            marginLeft: Sizes.fixPadding * 1.5,
            borderRadius: 1000,
          }}>
          <Text style={{ ...Fonts.white12RobotoMedium, textAlign: 'center' }}>
            Scheduled
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: SCREEN_WIDTH * 0.28,
            height: SCREEN_WIDTH * 0.31,
            marginLeft: Sizes.fixPadding * 1.5,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            borderWidth: 0,
            borderColor: Colors.primaryLight,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            marginBottom: Sizes.fixPadding * 1.5,
            shadowColor: Colors.black,
          }}>
          <Image
            source={require('../../../assets/images/astro.jpg')}
            style={{
              width: '100%',
              height: '100%',
              zIndex: -1,
            }} />
          <LinearGradient
            colors={[
              Colors.black + '00',
              Colors.black,
            ]}
            locations={[0.75, 1]}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'flex-end',
              padding: Sizes.fixPadding * 0.4,
            }}>
            <View style={{ ...styles.row, justifyContent: 'space-between' }}>
              <Text style={{ ...Fonts.white11InterMedium }}>
                Astro Acharya
              </Text>
              <Ionicons name="videocam" color={Colors.white} size={18} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingTop: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Live Astrologers</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('live')}>
          <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Array.from({length: 5})}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default LiveAstrologers

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});