import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Modal, RadioButton } from 'react-native-paper'
import Background from '../../../assets/svg/astro_filter_background.svg'
import { SCREEN_WIDTH, Sizes, Colors, Fonts } from '../../../assets/styles'
import { TouchableOpacity } from 'react-native'
import { filtersTypes, genderData } from '../../../config/data'

const GenderFilter = ({ data, selectedGenderFilters, updateState }) => {
  // const is_checked = value => {
  //   const checked = selectedGenderFilters == value;
  //   return checked;
  // };

  // const on_select = value => {
  //   if (is_checked(value)) {
  //     updateState({ selectedGenderFilters: '' });
  //   } else {
  //     updateState({ selectedGenderFilters: value });
  //   }
  // };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        //   onPress={() => on_select(item?.value)}
        style={{
          paddingHorizontal: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RadioButton
          value={true}
          // onPress={() => on_select(item?.value)}
          status={true ? 'checked' : 'unchecked'}
        />
        <Text style={{ ...Fonts.gray14RobotoRegular }}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const Filters = () => {
  const active_filtes = type => {
    switch (type) {
      //   case 'sort': {
      //     return (
      //       <SortFilters
      //         data={sortFiltersData}
      //         updateState={updateState}
      //         selectedSortFilters={selectedSortFilters}
      //       />
      //     );
      //   }
      //   case 'skill': {
      //     return (
      //       <SkillFilters
      //         data={skillData}
      //         updateFiltersState={updateFiltersState}
      //         updateState={updateState}
      //         selectedSkillFilters={selectedSkillFilters}
      //       />
      //     );
      //   }
      //   case 'language': {
      //     return (
      //       <LanguageFilters
      //         data={languageData}
      //         updateState={updateState}
      //         selectedLangaugeFilters={selectedLangaugeFilters}
      //       />
      //     );
      //   }
      case 'gender': {
        return (
          <GenderFilter
            // selectedGenderFilters={selectedGenderFilters}
            // updateState={updateState}
            data={genderData}
          />
        );
      }
      //   case 'country': {
      //     return (
      //       <CountryFilters
      //         data={countryData}
      //         selectedCountryFilters={selectedCountryFilters}
      //         updateState={updateState}
      //       />
      //     );
      //   }
      //   case 'offer': {
      //     return (
      //       <OfferFilters
      //         data={offersData}
      //         updateState={updateState}
      //         selectedOfferFilters={selectedOfferFilters}
      //       />
      //     );
      //   }
    }
  };
  return (
    <Modal
      visible={false}
      style={{ justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: Sizes.fixPadding * 2, marginRight: Sizes.fixPadding }}
    >
      <Background
        width={SCREEN_WIDTH * 0.9}
        height={SCREEN_WIDTH * 1.6}
      />
      <View style={{ position: 'absolute', width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 1.35, paddingTop: Sizes.fixPadding * 1.5, paddingHorizontal: Sizes.fixPadding * 1.2, paddingBottom: Sizes.fixPadding }}>
        <View
          style={{
            paddingVertical: Sizes.fixPadding,
            borderBottomWidth: 1,
            borderBottomColor: Colors.grayLight,
          }}>
          <Text style={{ ...Fonts.black18RobotoRegular, textAlign: 'center' }}>
            Sort & Filter
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              flex: 0.35,
              borderRightWidth: 1,
              borderRightColor: Colors.grayLight,
            }}>
            {filtersInfo()}
          </View>
          <View style={{ flex: 0.7 }}>{active_filtes('gender')}</View>
        </View>
      </View>
    </Modal>
  )

  function filtersInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          //   onPress={() => updateFiltersState({ selectedFilter: item.value })}
          style={{
            paddingHorizontal: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding * 1.5,
            borderBottomWidth: 1,
            borderBottomColor: Colors.grayLight,
          }}>
          <Text
            style={{
              ...Fonts.gray14RobotoRegular,
              color:
                true == item.value
                  ? Colors.primaryLight
                  : Colors.gray,
            }}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return <FlatList data={filtersTypes} renderItem={renderItem} />;
  }
}

export default Filters