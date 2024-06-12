import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';

const LatestBlogs = () => {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() =>
        //   navigation.navigate('astrologyBlogDetails', { blogData: item })
        // }
        style={{
          width: SCREEN_WIDTH * 0.55,
          marginLeft: Sizes.fixPadding * 1.5,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
          borderColor: Colors.primaryLight,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          marginBottom: Sizes.fixPadding * 1.5,
          shadowColor: Colors.black,
          backgroundColor: Colors.whiteDark,
          padding: Sizes.fixPadding * 0.5,
        }}>
        <Image
          source={require('../../../assets/images/astro.jpg')}
          style={{
            width: '100%',
            height: SCREEN_WIDTH * 0.3,
            borderTopLeftRadius: Sizes.fixPadding,
            borderTopRightRadius: Sizes.fixPadding,
          }}
        />
        <Text
          numberOfLines={2}
          style={{
            ...Fonts.white18RobotBold,
            color: Colors.black,
            fontSize: 9,
          }}>
          Blogs Title
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.grayLight }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Latest Blogs</Text>
        <TouchableOpacity
          disabled
          onPress={() => navigation.navigate('astrologyBlogs')}>
          <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Array.from({ length: 5 })}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
      />
    </View>
  );
}

export default LatestBlogs

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});