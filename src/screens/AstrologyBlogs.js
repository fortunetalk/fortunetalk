import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import MyHeader from '../components/MyHeader';
import MyStatusBar from '../components/MyStatusBar';
import NoDataFound from '../components/NoDataFound';
import { View, Text, FlatList } from 'react-native';
import { TouchableOpacity, Image } from 'react-native';
import * as CustomerAction from '../redux/actions/authActions'
import { Colors, Fonts, Sizes } from '../assets/styles';

const AstrologyBlogs = ({
  navigation,
  blogs,
  isLoading,
  dispatch
}) => {

  useEffect(() => {
    dispatch(CustomerAction.onCustomerblogs())
  }, [])

  console.log("blogs ====>>>>", blogs)

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <MyHeader title={"Astrology Blogs"} />
      <View style={{ flex: 1 }}>
        <FlatList ListHeaderComponent={<>{blogs && blogListInfo()}</>} />
      </View>
    </View>
  );

  function blogListInfo() {
    const renderItem = ({ item, index }) => {

      console.log("item ======>>>>" , item.image)

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('blogDetails', { blogData: item })
          }
          style={{
            padding: Sizes.fixPadding,
            marginHorizontal: Sizes.fixPadding,
            backgroundColor: Colors.whiteDark,
            marginBottom: Sizes.fixPadding * 2,
            borderRadius: Sizes.fixPadding,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowColor: Colors.blackLight,
          }}>
          <Image
            source={{ uri: item?.image }}
          />
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.white18RobotBold,
              fontSize: 14,
              color: Colors.black,
              marginTop: Sizes.fixPadding,
            }}>
            {item?.title}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ paddingVertical: Sizes.fixPadding }}>
        <FlatList
          data={blogs}
          renderItem={renderItem}
          keyExtractor={item => item?._id}
          ListEmptyComponent={<NoDataFound />}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  blogs: state.customer.blogs,
  isLoading: state.settings.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstrologyBlogs)