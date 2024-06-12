import React, { useState } from 'react';
import { FlatList, ImageBackground } from 'react-native';
import Loader from '../../components/Loader';
import MyStatusBar from '../../components/MyStatusBar';
import NoDataFound from '../../components/NoDataFound';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../assets/styles';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomCrousel from '../../components/CustomCrousel';
import LinearGradient from 'react-native-linear-gradient';
import { Input } from '@rneui/themed';
import Filter from '../../components/Filter';

const Spell = ({ navigation }) => {
    const [data, setdata] = useState([{}, {}, {}, {}]);
    const [state, setState] = useState({
        refreshing: false,
        astroData: null,
        backClickCount: 0,
        astrologerData: null,
        isLoading: false,
        activeFilter: 3,
        filterData: null,
        searchableData: null,
        filterVisible: false,
        selectedSkillFilters: [],
        selectedLangaugeFilters: [],
        selectedCountryFilters: [],
        selectedOfferFilters: [],
        selectedSortFilters: '',
        selectedGenderFilters: '',
        currentIndex: 0,
        isExtraLoading: false,
        bannerData: null,
        isLoading: false,
        selectedItem: null,
        searchText: ""
    });

    const categoryData = [
        {
            id: 1,
            name: 'Love Honey Spell',
            price: '₹ 501',
        },
        {
            id: 2,
            name: 'Career Spell',
            price: '₹ 501',
        },
        {
            id: 3,
            name: 'Career Spell',
            price: '₹ 501',
        },
        {
            id: 4,
            name: 'Career Spell',
            price: '₹ 501',
        },
        {
            id: 5,
            name: 'Career Spell',
            price: '₹ 501',
        },
        {
            id: 6,
            name: 'Career Spell',
            price: '₹ 501',
        },
        {
            id: 7,
            name: 'Career Spell',
            price: '₹ 501',
        },
        {
            id: 8,
            name: 'Career Spell',
            price: '₹ 501',
        },
    ];

    const search_product = () => {

    }

    const get_astrologer = () => {

    }

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data };
            return newData;
        });
    };

    const {
        refreshing,
        astroData,
        backClickCount,
        astrologerData,
        isLoading,
        activeFilter,
        filterData,
        searchableData,
        filterVisible,
        selectedCountryFilters,
        selectedLangaugeFilters,
        selectedOfferFilters,
        selectedSkillFilters,
        selectedSortFilters,
        selectedGenderFilters,
        currentIndex,
        isExtraLoading,
        bannerData,
        searchText
    } = state

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
                            {searchInfo()}
                            {data && bannerInfo()}
                            {categoryData && eCommerceDataInfo()}
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

    function eCommerceDataInfo() {
        const navigate_to = (type, item) => {
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
                        <ImageBackground
                            source={require('../../assets/images/spell.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <LinearGradient
                                colors={['rgba(0, 0, 0, 0.35)', 'rgba(0, 0, 0, 0.35)']}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginHorizontal: Sizes.fixPadding * 0.8,
                                    paddingHorizontal: Sizes.fixPadding * 1,
                                    bottom: 12,
                                    position: "absolute",
                                    backgroundColor: 'transparent'
                                }}>

                                <Text
                                    style={{
                                        flex: 1,
                                        fontWeight: "600",
                                        fontSize: 10,
                                    }}
                                >
                                    {item.name}</Text>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        fontSize: 10
                                    }}
                                >
                                    {item.price}
                                </Text>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
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
            <View
                style={{
                    borderBottomWidth: 1,
                    borderColor: Colors.gray + '30',
                }}>
                <CustomCrousel />
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

    function searchInfo() {
        return (
            <View
                style={{
                    paddingVertical: Sizes.fixPadding,
                    borderBottomWidth: 1,
                    borderColor: Colors.gray + '30',
                    ...styles.row,
                }}>
                <Input
                    value={searchText}
                    placeholder={`Search for ${categoryData?.name}`}
                    placeholderTextColor={Colors.gray}
                    onChangeText={text => search_product(text)}
                    inputStyle={{ ...Fonts.black14InterMedium }}
                    containerStyle={{
                        height: 36,
                        flex: 1,
                        flexGrow: 1.3,
                    }}
                    inputContainerStyle={{
                        borderBottomWidth: 0,
                        margin: 0,
                        padding: 0,
                        paddingVertical: 0,
                        paddingTop: 0,
                        backgroundColor: Colors.grayLight + '90',
                        borderRadius: 1000,
                        paddingHorizontal: Sizes.fixPadding,
                        height: 36,
                    }}
                    rightIcon={
                        <Image
                            source={require('../../assets/icons/search.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    }
                />
                <TouchableOpacity
                    onPress={() => updateState({ filterVisible: true })}
                    style={{ flex: 0.2, marginLeft: Sizes.fixPadding }}>
                    <Image
                        source={require('../../assets/icons/filter.png')}
                        style={{ width: 20, height: 20 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

};

export default Spell;

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

