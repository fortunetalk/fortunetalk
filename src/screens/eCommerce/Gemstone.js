import { useState } from "react";
import Loader from "../../components/Loader";
import Filter from "../../components/Filter";
import SearchInfo from "./components/SearchInfo";
import MyStatusBar from "../../components/MyStatusBar";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from "../../assets/styles";
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomCrousel from "../../components/CustomCrousel";

const Gemstone = ({ navigation }) => {
    const [state, setState] = useState({
        isLoading: false,
        searchText: '',
        filterVisible: null,
        selectedCountryFilters: [],
        selectedLangaugeFilters: [],
        selectedOfferFilters: [],
        selectedSkillFilters: [],
        selectedSortFilters: [],
        selectedGenderFilters: [],
        activeFilter: 3,
        screeType: "Gemstone",
        categoryData: ""
    })

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data };
            return newData;
        });
    };

    const get_astrologer = () => {

    }

    const data = [
        {
            id: 1,
            title: 'Gemstone 1',
            price: '₹ 501/-',
        },
        {
            id: 2,
            title: 'Gemstone 2',
            price: '₹ 702/-',
        },
        {
            id: 3,
            title: 'Gemstone 3',
            price: '₹ 803/-',
        },
        {
            id: 4,
            title: 'Gemstone 3',
            price: '₹ 803/-',
        },
    ];

    const search_product = () => {

    }

    const {
        isLoading,
        searchText,
        filterVisible,
        selectedCountryFilters,
        selectedLangaugeFilters,
        selectedOfferFilters,
        selectedSkillFilters,
        selectedSortFilters,
        selectedGenderFilters,
        activeFilter,
        screeType,
        categoryData,
    } = state

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryLight}
                barStyle={'light-content'}
            />
            <Loader visible={isLoading} />
            {header()}
            <SearchInfo
                searchText={searchText}
                categoryData={categoryData}
                search_product={search_product}
                updateState={updateState}
            />

            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: Colors.gray + '30',
                                }}>
                                <CustomCrousel />
                            </View>
                            {GemstoneInfo()}
                        </>
                    }
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
                />
            </View>
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
    )

    function GemstoneInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.navigate('productdetails')}
                    style={{
                        width: SCREEN_WIDTH * 0.37,
                        height: SCREEN_WIDTH * 0.4,
                        borderRadius: Sizes.fixPadding,
                        marginBottom: Sizes.fixPadding * 1.5,
                        borderWidth: 3,
                        borderColor: Colors.primaryLight,
                    }}>
                    <ImageBackground
                        source={require("../../assets/images/astro.jpg")}
                        resizeMode="cover"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}>
                        <LinearGradient
                            colors={[Colors.black + '00', Colors.black, Colors.black]}
                            locations={[0.5, 1, 1]}
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'flex-end',
                            }}>
                            <View
                                style={[
                                    styles.row,
                                    {
                                        justifyContent: 'space-between',
                                        padding: Sizes.fixPadding * 0.4,
                                    },
                                ]}>
                                <Text
                                    style={{ ...Fonts.white11InterMedium, fontSize: 9, flex: 0.6 }}>
                                    Love Honey Spell
                                </Text>
                                <Text
                                    style={{
                                        ...Fonts.white11InterMedium,
                                        fontSize: 9,
                                        flex: 0.4,
                                        textAlign: 'right',
                                    }}>
                                    ₹ 501/-
                                </Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
            );
        };
        return (
            <View
                style={{
                    paddingTop: Sizes.fixPadding * 1
                }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={{}}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
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
                    {screeType}
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
}

export default Gemstone

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
