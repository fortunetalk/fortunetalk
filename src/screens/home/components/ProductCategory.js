import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { navigate } from '../../../utils/navigationServices';
import { SCREEN_WIDTH, Fonts, Colors, Sizes } from '../../../assets/styles';
import * as EcommerceActions from '../../../redux/actions/eCommerceActions'
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'

const ProductCategory = ({ dispatch, ProductCategoryList }) => {

  useEffect(() => {
    dispatch(EcommerceActions.getProductCategoryList())
  }, [dispatch])

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigate("product", {
          screenType: item.title,
          categoryId: item._id
        })}
        style={{
          width: SCREEN_WIDTH * 0.45,
          marginLeft: Sizes.fixPadding * 0.5,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
          marginBottom: Sizes.fixPadding * 1.5,
          padding: Sizes.fixPadding * 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: Sizes.fixPadding * 2,
        }}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: '95%',
            height: SCREEN_WIDTH * 0.4,
            borderTopLeftRadius: Sizes.fixPadding,
            borderTopRightRadius: Sizes.fixPadding,
          }}
        />
        <View
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
          <Text style={{ ...Fonts.black14InterMedium, textAlign: 'center' }}>
            {item.title}
          </Text>
        </View>
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
        <Text style={{ ...Fonts.black16RobotoMedium }}>Product Remedy</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate("viewProduct")}
        >
          <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
        </TouchableOpacity>
      </View>

      {ProductCategoryList && (
        <FlatList
          data={ProductCategoryList}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
        />
      )
      }
    </View>
  );
}

const mapStateToProps = state => ({
  isLoading: state.settings.isLoading,
  ProductCategoryList: state.eCommerce.ProductCategoryList,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory)

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
