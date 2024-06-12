import React, { useState } from 'react';
import { FlatList } from 'react-native';
import Loader from '../../components/Loader';
import MyStatusBar from '../../components/MyStatusBar';
import NoDataFound from '../../components/NoDataFound';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../assets/styles';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomCrousel from '../../components/CustomCrousel';

const ECommerce = ({ navigation }) => {
  const [data, setdata] = useState([{}, {}, {}, {}]);
  const [state, setState] = useState({
    isLoading: false,
    selectedItem: null,
  });

  const categoryData = [
    {
      id: 1,
      name: 'Book a Pooja',
    },
    {
      id: 2,
      name: 'Spell',
    },
    {
      id: 3,
      name: 'Pooja Kit',
    },
    {
      id: 3,
      name: 'Gemstone',
    },
  ];

  const { isLoading, selectedItem } = state;

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
              {data && bannerInfo()}
              {categoryData && eCommerceDataInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />
      </View>
    </View>
  );

  function eCommerceDataInfo() {
    const navigate_to = (type, item) => {
      switch (type) {
        case 'Book a Pooja': {
          navigation.navigate('bookPooja', { categoryData: item, type: 'book_a_pooja' })
          break;
        }
        case 'Spell & Healings': {
          navigation.navigate('bookPooja', { categoryData: item, type: 'spell' })
          break;
        }
        default: {
          navigation.navigate('products', { categoryData: item, type: 'products' })
        }
      }
    }

    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigate_to(item?.name, item)
          }
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
              source={require('../../assets/images/astro.jpg')}
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
              {item.name}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={categoryData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-evenly' }}
          ListEmptyComponent={<NoDataFound />}
        />
      </View>
    );
  }

  function bannerInfo() {
    return (
      <CustomCrousel />
    );
  }

  function header() {
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
          Fortune Store
        </Text>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icons/cart.png')}
            style={{ width: 22, height: 22 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default ECommerce;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
