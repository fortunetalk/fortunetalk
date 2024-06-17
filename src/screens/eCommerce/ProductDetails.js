import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Stars from 'react-native-stars';
import React, { useState } from 'react';
import MyStatusBar from '../../components/MyStatusBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../assets/styles';

const ProductDetails = ({ navigation, route }) => {
  const [review, setreview] = useState([
    {
      id: '1',
      customer_name: 'John Doe',
      rating: 4.5,
      comment: 'Great service and friendly staff!',
    },
    {
      id: '2',
      customer_name: 'Jane Smith',
      rating: 4,
      comment: 'Good experience, but room for improvement.',
    },
  ]);

  const [state, setState] = useState({
    productData: [{}],
    isLoading: false,
  });

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

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
              {reviewInfo()}
              {bookNowButtonInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />
      </View>
    </View>
  );

  function bookNowButtonInfo() {

    const add_product_to_cart = async item => {
       navigation.navigate("cart")
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => add_product_to_cart(productData)}
        style={{
          marginHorizontal: Sizes.fixPadding * 3,
          marginVertical: Sizes.fixPadding,
          borderRadius: Sizes.fixPadding * 1.5,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primaryDark]}
          style={{ paddingVertical: Sizes.fixPadding }}>
          <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
            Book Now
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function reviewInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: '100%',
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
            shadowColor: Colors.blackLight,
            backgroundColor: Colors.white,
            padding: Sizes.fixPadding * 0.8,
          }}>
          <View style={{ ...styles.row }}>
            <Image
              source={require("../../assets/images/astro.jpg")}
              style={{
                width: 25,
                height: 25,
                borderRadius: 100,
              }}
            />
            <Text
              style={{
                ...Fonts.gray11RobotoRegular,
                marginLeft: Sizes.fixPadding * 0.5,
              }}>
              {item.customer_name}
            </Text>
            <View style={{ marginLeft: Sizes.fixPadding * 1.5 }}>
              <Stars
                default={4}
                count={item.rating}
                half={true}
                starSize={9}
                fullStar={
                  <Ionicons
                    name={'star'}
                    size={9}
                    color={Colors.primaryLight}
                  />
                }
                emptyStar={
                  <Ionicons
                    name={'star-outline'}
                    size={9}
                    color={Colors.primaryLight}
                  />
                }
              />
            </View>
          </View>
          <Text numberOfLines={5} style={{ ...Fonts.gray11RobotoRegular }}>
            {item.comment}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 1.5,
          marginHorizontal: Sizes.fixPadding * 2,
        }}>
        <Text
          style={{
            ...Fonts.black18RobotoRegular,
            marginBottom: Sizes.fixPadding,
          }}>
          Customer Reviews
        </Text>
        <FlatList
          data={review}
          renderItem={renderItem}
          keyExtractor={item => review.id}
        />
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
          Amethyst is believed to have positive effects on a wide range of professions, including surgeons, doctors, mechanical engineers, scientists, astrologers, writers, soldiers, archaeologists, politicians, lawyers, businessmen, dancers, actors, and people in the glamour industry. It is suggested to be worn on a Saturday.
          {`\n\n`}
          Benefits
          When used as an alternative to Blue Sapphire, Amethyst is said to provide mental stability, tranquility, spiritual enlightenment, protection against various dangers, wealth, a good reputation
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
        <Text style={{ ...Fonts.primaryLight18RobotoMedium }}>
          15 Ratti Amethyst
        </Text>
        <Text style={{ ...Fonts.gray14RobotoMedium, fontSize: 13 }}>
          Certified Natural Gemstone Quality
        </Text>
        <Text style={{ ...Fonts.black16RobotoMedium }}>
          ₹ 6896
          <Text
            style={{
              ...Fonts.gray16RobotoMedium,
              textDecorationLine: 'line-through',
            }}>

            ₹ 658
          </Text>{' '}
          <Text style={{ ...Fonts.white14RobotoMedium, color: Colors.red_a }}>
            10
            % Off
          </Text>
        </Text>
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
          source={require("../../assets/images/astro.jpg")}
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
              source={require("../../assets/images/astro.jpg")}
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