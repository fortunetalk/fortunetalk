import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import Loader from '../../../components/Loader';
import React, { useEffect } from 'react';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusBar';
import NoDataFound from '../../../components/NoDataFound';
import { navigate } from '../../../utils/navigationServices';
import LinearGradient from 'react-native-linear-gradient';
import CustomCarousel from '../../../components/CustomCrousel';
import * as EcommerceActions from '../../../redux/actions/eCommerceActions'
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../../assets/styles';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const ViewPooja = ({
  PoojaCategoryList,
  dispatch,
  productCategoryBanner,
  isLoading
}) => {

  useEffect(() => {
    dispatch(EcommerceActions.getPoojaCategoryList())
  }, [dispatch])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
      <MyStatusBar
        backgroundColor={Colors.primaryLight}
        barStyle={'light-content'}
      />
      <Loader visible={isLoading} />
      <View style={{ flex: 1 }}>
        <MyHeader title={"Pooja"} />
        <FlatList
          ListHeaderComponent={
            <>
              {productCategoryBanner && <CustomCarousel data={productCategoryBanner} />}
              {PoojaCategoryList && eCommerceDataInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />
      </View>
    </View>
  );

  function eCommerceDataInfo() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigate("product", { screenType: item.title, categoryId: item._id })}
          style={{
            width: SCREEN_WIDTH * 0.45,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            marginBottom: Sizes.fixPadding * 1.5,
            padding: Sizes.fixPadding * 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: Sizes.fixPadding * 2,
          }}>
          <View
            style={{
              width: '90%',
              height: SCREEN_WIDTH * 0.4,
              borderTopLeftRadius: Sizes.fixPadding,
              borderTopRightRadius: Sizes.fixPadding,
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              overflow: 'hidden',
            }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>

          <LinearGradient
            colors={[Colors.whiteDark, Colors.grayLight]}
            style={{
              width: '100%',
              backgroundColor: Colors.whiteDark,
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              position: 'absolute',
              bottom: Sizes.fixPadding,
              paddingVertical: Sizes.fixPadding * 0.3,
              borderRadius: Sizes.fixPadding * 0.7,
              shadowColor: Colors.blackLight,
            }}>
            <Text
              style={[{ ...Fonts.black14InterMedium }, { textAlign: 'center' }]}>
              {item.title}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={PoojaCategoryList}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-evenly' }}
          ListEmptyComponent={<NoDataFound />}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  productCategoryBanner: state.eCommerce.productCategoryBanner,
  PoojaCategoryList: state.eCommerce.PoojaCategoryList,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ViewPooja)

