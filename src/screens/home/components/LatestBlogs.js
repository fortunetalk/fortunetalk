import React from 'react'
import { connect } from 'react-redux';
import { navigate } from '../../../utils/navigationServices';
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'

const LatestBlogs = ({ blogs }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigate('blogDetails', { blogData: item })
        }
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
        }}
        >
        <Image
          source={{ uri: item?.image }}
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
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{
      borderBottomWidth: 1,
      borderBottomColor: Colors.grayLight
    }}>
      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 1.5,
          paddingVertical: Sizes.fixPadding,
        }}>
        <Text style={{ ...Fonts.black16RobotoMedium }}>Latest Blogs</Text>
        <TouchableOpacity
          onPress={() => navigate('astrologyBlogs')}>
          <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  blogs: state.customer.blogs
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LatestBlogs);

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});