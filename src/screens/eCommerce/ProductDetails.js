import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import MyStatusBar from '../../components/MyStatusBar';
import GlobalButton from '../../components/GlobalButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../assets/styles';

const ProductDetails = ({ navigation, route }) => {
  const [state, setState] = useState({
    productData: route.params?.details,
    isLoading: false,
  });

  const { productData, isLoading } = state;

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
              {bannerInfo()}
              {productInfo()}
              {benefitsInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
          />
          {bookNowButtonInfo()}
      </View>
    </View>
  );

  function bookNowButtonInfo() {
    const add_product_to_cart = () => {
    }
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2 }}>
        <GlobalButton handlePress={() => add_product_to_cart()} ButtonName={"Book Now"} />
      </View>
    );
  }

  function benefitsInfo() {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding * 2,
          paddingVertical: Sizes.fixPadding * 1.5,
          borderBottomColor: Colors.grayLight,
          borderBottomWidth: 1,
        }}>
        <Text style={{ ...Fonts.black18RobotoRegular }}>Description</Text>
        <Text
          style={{
            ...Fonts.gray14RobotoMedium,
            fontSize: 13,
          }}>
          {productData?.description}
        </Text>
      </View>
    );
  }

  function productInfo() {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding * 2,
          paddingBottom: Sizes.fixPadding * 1.5,
          borderBottomColor: Colors.grayLight,
          borderBottomWidth: 1,
        }}>
        <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...Fonts.primaryLight18RobotoMedium }}>
            {productData?.title}
          </Text>
          <GlobalButton ButtonName={"Add to Cart"} />
        </View>

        <Text style={{ ...Fonts.gray14RobotoMedium, fontSize: 13 }}>
          {productData?.shortDescription}
        </Text>

        <View style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={{ ...Fonts.black16RobotoMedium }}>
            ₹{productData.price - ((productData.price * productData.discount) / 100)}
          </Text>

          <Text
            style={{
              ...Fonts.gray16RobotoMedium,
              textDecorationLine: 'line-through',
            }}>
            ₹{productData?.price}
          </Text>

          <Text style={{ ...Fonts.white14RobotoMedium, color: Colors.red_a }}>
            {productData?.discount}
            % Off
          </Text>
        </View>
      </View>
    );
  }

  function bannerInfo() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2,
          marginTop: Sizes.fixPadding,
          borderRadius: Sizes.fixPadding,
          overflow: 'hidden',
        }}>
        <Image
          source={{ uri: productData?.image }}
          style={{
            width: '100%',
            height: SCREEN_WIDTH * 0.6,
            resizeMode: 'cover',
          }}
        />
      </View>
    );
  }

  function header() {
    const on_cart_press = () => {
    }
    return (
      <View
        style={{
          padding: Sizes.fixPadding * 1.5,
          ...styles.row,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignSelf: 'flex-start',
          }}>
          <AntDesign
            name="leftcircleo"
            color={Colors.primaryLight}
            size={Sizes.fixPadding * 2.2}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.primaryLight15RobotoMedium,
            textAlign: 'center',
          }}>
          Product details
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => on_cart_press()}
        >
          <Image
            source={require('../../assets/icons/cart.png')}
            style={{ width: 22, height: 22 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default ProductDetails;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 3,
    backgroundColor: Colors.gray,
    bottom: -Sizes.fixPadding * 0.7,
  },
});
