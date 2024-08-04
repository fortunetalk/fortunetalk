import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Modal, RadioButton } from 'react-native-paper'
import Background from '../../../assets/svg/astro_filter_background.svg'
import { SCREEN_WIDTH, Sizes, Colors, Fonts } from '../../../assets/styles'
import { TouchableOpacity } from 'react-native'
import { filtersTypes, genderData, languageData, sortFiltersData } from '../../../config/data'
import { connect } from 'react-redux'
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
import LinearGradient from 'react-native-linear-gradient'

const SortFilters = ({ selectedSortFilters, filterFor, dispatch }) => {
  const is_checked = value => {
    if (value === 'heigh_to_low_price') {
      if (filterFor === 'chat') {
        return selectedSortFilters?.chatPriceHighToLow
      } else {
        return selectedSortFilters?.callPriceHighToLow
      }
    } else if (value === 'low_to_high_price') {
      if (filterFor === 'chat') {
        return selectedSortFilters?.chatPriceLowToHigh
      } else {
        return selectedSortFilters?.callPriceLowToHigh
      }
    } else if (value === 'heigh_to_low_experience') {
      return selectedSortFilters?.experienceHighToLow
    } else if (value === 'low_to_high_experience') {
      return selectedSortFilters?.experienceLowToHigh
    } else if (value === 'heigh_to_low_follower') {
      return selectedSortFilters?.followersHighToLow
    } else if (value === 'low_to_high_follower') {
      return selectedSortFilters?.followersLowToHigh
    }
  };

  const on_select = value => {
    if (value === 'heigh_to_low_price') {
      if (filterFor === 'chat') {
        dispatch(AstrologerActions.setAstrologerFilters({ chatPriceHighToLow: !selectedSortFilters?.chatPriceHighToLow, chatPriceLowToHigh: selectedSortFilters?.chatPriceHighToLow }))
      } else {
        dispatch(AstrologerActions.setAstrologerFilters({ callPriceHighToLow: !selectedSortFilters?.callPriceHighToLow, callPriceLowToHigh: selectedSortFilters?.callPriceHighToLow }))
      }
    } else if (value === 'low_to_high_price') {
      if (filterFor === 'chat') {
        dispatch(AstrologerActions.setAstrologerFilters({ chatPriceLowToHigh: !selectedSortFilters?.chatPriceLowToHigh, chatPriceHighToLow: selectedSortFilters?.chatPriceLowToHigh }))
      } else {
        dispatch(AstrologerActions.setAstrologerFilters({ callPriceLowToHigh: !selectedSortFilters?.callPriceLowToHigh, callPriceHighToLow: selectedSortFilters?.callPriceLowToHigh }))
      }
    } else if (value === 'heigh_to_low_experience') {
      dispatch(AstrologerActions.setAstrologerFilters({ experienceHighToLow: !selectedSortFilters?.experienceHighToLow, experienceLowToHigh: selectedSortFilters?.experienceHighToLow }))
    } else if (value === 'low_to_high_experience') {
      dispatch(AstrologerActions.setAstrologerFilters({ experienceLowToHigh: !selectedSortFilters?.experienceLowToHigh, experienceHighToLow: selectedSortFilters?.experienceLowToHigh }))
    } else if (value === 'heigh_to_low_follower') {
      dispatch(AstrologerActions.setAstrologerFilters({ followersHighToLow: !selectedSortFilters?.followersHighToLow, followersLowToHigh: selectedSortFilters?.followersHighToLow }))
    } else if (value === 'low_to_high_follower') {
      dispatch(AstrologerActions.setAstrologerFilters({ followersLowToHigh: !selectedSortFilters?.followersLowToHigh, followersHighToLow: selectedSortFilters?.followersLowToHigh }))
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => on_select(item?.value)}
        style={{
          paddingHorizontal: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RadioButton
          value={is_checked(item?.value)}
          onPress={() => on_select(item?.value)}
          status={is_checked(item?.value) ? 'checked' : 'unchecked'}
          color={Colors.orange}
        />
        <Text style={{ ...Fonts._13InterMedium }}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList data={sortFiltersData} renderItem={renderItem} />
    </View>
  );
};

const GenderFilter = ({ selectedGenderFilters, dispatch }) => {
  const is_checked = value => {
    const checked = selectedGenderFilters == value;
    return checked;
  };

  const on_select = value => {
    if (is_checked(value)) {
      dispatch(AstrologerActions.setAstrologerFilters({ gender: '' }))
    } else {
      dispatch(AstrologerActions.setAstrologerFilters({ gender: value }))
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => on_select(item?.value)}
        style={{
          paddingHorizontal: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RadioButton
          value={true}
          // onPress={() => on_select(item?.value)}
          status={selectedGenderFilters == item?.value ? 'checked' : 'unchecked'}
          color={Colors.orange}
        />
        <Text style={{ ...Fonts._13InterMedium }}>{item?.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList data={genderData} renderItem={renderItem} />
    </View>
  );
};

const LanguageFilters = ({ data, selectedLangaugeFilters, dispatch }) => {
  const is_checked = language => {
    const checked = selectedLangaugeFilters.includes(language);
    return checked;
  };

  const on_select = language => {
    if (is_checked(language)) {
      let new_arr = selectedLangaugeFilters.filter(item => item != language);
      dispatch(AstrologerActions.setAstrologerFilters({ language: new_arr }))
    } else {
      dispatch(AstrologerActions.setAstrologerFilters({ language: [...selectedLangaugeFilters, language] }))
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => on_select(item?.value)}
        style={{
          paddingHorizontal: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RadioButton
          value={is_checked(item?.value)}
          onPress={() => on_select(item?.value)}
          status={is_checked(item?.value) ? 'checked' : 'unchecked'}
          color={Colors.orange}
        />
        <Text style={{ ...Fonts._13InterMedium }}>{item?.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const SkillFilters = ({ data, selectedSkillFilters, dispatch }) => {
  const is_checked = id => {
    const checked = selectedSkillFilters.includes(id);
    return checked;
  };

  const on_select = id => {
    if (is_checked(id)) {
      let new_arr = selectedSkillFilters.filter(item => item != id);
      dispatch(AstrologerActions.setAstrologerFilters({ skillId: new_arr }))
    } else {
      dispatch(AstrologerActions.setAstrologerFilters({ skillId: [...selectedSkillFilters, id] }))
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => on_select(item?._id)}
        style={{
          paddingHorizontal: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RadioButton
          value={is_checked(item?._id)}
          onPress={() => on_select(item?._id)}
          status={is_checked(item?._id) ? 'checked' : 'unchecked'}
          color={Colors.orange}
        />
        <Text style={{ ...Fonts._13InterMedium }}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const OfferFilters = ({ data, selectedOfferFilters, dispatch }) => {
  const is_checked = id => {
    const checked = selectedOfferFilters.includes(id);
    return checked;
  };

  const on_select = id => {
    if (is_checked(id)) {
      let new_arr = selectedOfferFilters.filter(item => item != id);
      dispatch(AstrologerActions.setAstrologerFilters({ chatCallOfferIds: new_arr }))
    } else {
      dispatch(AstrologerActions.setAstrologerFilters({ chatCallOfferIds: [...selectedOfferFilters, id] }))
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => on_select(item?._id)}
        style={{
          paddingHorizontal: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RadioButton
          value={is_checked(item?._id)}
          onPress={() => on_select(item?._id)}
          status={is_checked(item?._id) ? 'checked' : 'unchecked'}
          color={Colors.orange}
        />
        <Text style={{ ...Fonts._13InterMedium }}>{item?.offerName} {item?.displayName}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const Filters = ({ astrologerFilterVisible, dispatch, astrologerFilters, filterFor, skillData, offersData }) => {
  const [activeFilter, setActiveFilter] = useState('sort')

  const onClear = ()=>{
    dispatch(AstrologerActions.clearAstrologerFilters())
    setActiveFilter('sort')
  }

  const onApply = ()=>{
    dispatch(AstrologerActions.setAstrologerFiltersVisible(false))
    dispatch(AstrologerActions.getChatCallAstrologerList({type: 'chat', remediesId: 'All', page: 1}))
  }

  const active_filtes = type => {
    switch (type) {
      case 'sort': {
        return (
          <SortFilters
            dispatch={dispatch}
            selectedSortFilters={astrologerFilters}
            filterFor={filterFor}
          />
        );
      }
      case 'skill': {
        return (
          <SkillFilters
            data={skillData}
            dispatch={dispatch}
            selectedSkillFilters={astrologerFilters?.skillId}
          />
        );
      }
      case 'language': {
        return (
          <LanguageFilters
            data={languageData}
            dispatch={dispatch}
            selectedLangaugeFilters={astrologerFilters?.language}
          />
        );
      }
      case 'gender': {
        return (
          <GenderFilter
            selectedGenderFilters={astrologerFilters?.gender}
            dispatch={dispatch}
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
      case 'offer': {
        return (
          <OfferFilters
            data={offersData}
            dispatch={dispatch}
            selectedOfferFilters={astrologerFilters?.chatCallOfferIds}
          />
        );
      }
    }
  };
  return (
    <Modal
      visible={astrologerFilterVisible}
      onDismiss={() => dispatch(AstrologerActions.setAstrologerFiltersVisible(false))}
      style={{ justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: Sizes.fixPadding * 2, marginRight: Sizes.fixPadding }}
    >
      <Background
        width={SCREEN_WIDTH * 0.9}
        height={SCREEN_WIDTH * 1.6}
      />
      <View style={{ position: 'absolute', width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 1.45, paddingTop: Sizes.fixPadding * 1.5, paddingHorizontal: Sizes.fixPadding * 1.2, paddingBottom: Sizes.fixPadding, }}>
        <View
          style={{
            paddingVertical: Sizes.fixPadding,
            borderBottomWidth: 1,
            borderBottomColor: Colors.grayLight,
          }}>
          <Text style={{ ...Fonts._18InterBold, textAlign: 'center' }}>
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
          <View style={{ flex: 0.7 }}>{active_filtes(activeFilter)}</View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>onClear()} style={{width: '40%'}}>
              <LinearGradient colors={[Colors.grayE, Colors.gray]}
              style={{width: '100%', borderRadius: 1000, paddingVertical: Sizes.fixPadding*0.7}}
              >
                <Text style={{...Fonts._13InterMedium, textAlign: 'center', color: Colors.white}}>Clear</Text>
              </LinearGradient> 
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>onApply()} style={{width: '40%'}}>
              <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]}
              style={{width: '100%', borderRadius: 1000, paddingVertical: Sizes.fixPadding*0.7}}
              >
                <Text style={{...Fonts._13InterMedium, textAlign: 'center', color: Colors.white}}>Apply</Text>
              </LinearGradient> 
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  function filtersInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() => setActiveFilter(item.value)}
          style={{
            paddingHorizontal: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding * 1.5,
            borderBottomWidth: 1,
            borderBottomColor: Colors.grayLight,
          }}>
          <Text
            style={{
              ...Fonts._13InterMedium,
              color:
                activeFilter == item.value
                  ? Colors.primaryLight
                  : Colors.black,
            }}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return <FlatList data={filtersTypes} renderItem={renderItem} />;
  }
}

const mapStateToProps = (state) => ({
  astrologerFilterVisible: state.astrologer.astrologerFilterVisible,
  astrologerFilters: state.astrologer.astrologerFilters,
  skillData: state.astrologer.skillData,
  offersData: state.astrologer.offersData,
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Filters)