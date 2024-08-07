import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import Loader from '../../../components/Loader';
import Filter from '../../../components/Filter';
import SearchInfo from '../components/SearchInfo';
import React, { useEffect, useState } from 'react';
import MyStatusBar from '../../../components/MyStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import CustomCrousel from '../../../components/CustomCrousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SCREEN_WIDTH, Colors, Fonts, Sizes } from '../../../assets/styles';
import * as EcommerceActions from '../../../redux/actions/eCommerceActions'

const BookPooja = ({ dispatch, navigation, route, poojaCategoryWaiseList, poojaDetailsBanner }) => {
  const id = route.params.categoryId
  const [state, setState] = useState({
    categoryData: null,
    screenType: route.params.screenType,
    poojaData: null,
    isLoading: false,
    baseData: null,
    searchText: '',
    filterVisible: null,
    selectedCountryFilters: null,
    selectedLangaugeFilters: null,
    selectedOfferFilters: null,
    selectedSkillFilters: null,
    selectedSortFilters: null,
    selectedGenderFilters: null,
    activeFilter: 3,
  });

  useEffect(() => {
    updateState({ categoryData: poojaCategoryWaiseList?.pooja })
  }, [poojaCategoryWaiseList])

  useEffect(() => {
    dispatch(EcommerceActions.getPoojaCategoryWaiseList({ id }))
    dispatch(EcommerceActions.getPoojaDetailsBanner())
  }, [])

  const search_product = text => {
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = baseData.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      updateState({ poojaData: newData, searchText: text })
    } else {
      updateState({ poojaData: baseData, searchText: text })
    }
  };

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };


  const get_astrologer = () => {

  }

  const {
    categoryData,
    screenType,
    poojaData,
    isLoading,
    baseData,
    searchText,
    filterVisible,
    selectedCountryFilters,
    selectedLangaugeFilters,
    selectedOfferFilters,
    selectedSkillFilters,
    selectedSortFilters,
    selectedGenderFilters,
    activeFilter,
  } = state;

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
              <SearchInfo
                searchText={searchText}
                categoryData={screenType}
                search_product={search_product}
                updateState={updateState}
              />
              {poojaDetailsBanner && <CustomCrousel data={poojaDetailsBanner} />}
              {bookAPoojaInfo()}
            </>
          }
          contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
        />

        <Filter
          filterVisible={filterVisible}
          updateState={updateState}
          selectedCountryFilters={selectedCountryFilters}
          selectedLangaugeFilters={selectedLangaugeFilters}
          selectedOfferFilters={selectedOfferFilters}
          selectedSkillFilters={selectedSkillFilters}
          selectedSortFilters={selectedSortFilters}
          activeFilter={activeFilter}
          selectedGenderFilters={selectedGenderFilters}
          get_astrologer={get_astrologer}
        />
      </View>
    </View>
  );

  function bookAPoojaInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate('astrologerlist', { pooja_id: item.id })
          }
          style={{
            height: SCREEN_WIDTH * 0.5,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            marginBottom: Sizes.fixPadding * 1.5,
          }}>
          <ImageBackground
            source={{ uri: item?.image }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={[Colors.black + '00', Colors.black]}
              style={{
                width: '100%',
                height: '100%',
                padding: Sizes.fixPadding,
                justifyContent: 'flex-end',
              }}
              locations={[0.7, 1]}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <View>
                  <Text style={{ ...Fonts.white18RobotMedium, fontSize: 14 }}>{item?.title}</Text>
                  <Text style={{ ...Fonts.white14RobotoMedium, fontSize: 10 }}>
                    {item?.shortDescription}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding }}>
        <FlatList
          data={categoryData}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
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
          {screenType}
        </Text>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/icons/cart.png')}
            style={{ width: 22, height: 22 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  poojaCategoryWaiseList: state.eCommerce.poojaCategoryWaiseList,
  isLoading: state.settings.isLoading,
  poojaDetailsBanner: state.eCommerce.poojaDetailsBanner,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(BookPooja)


const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
