import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import Filter from "../../../components/Filter";
import SearchInfo from "../components/SearchInfo";
import MyStatusBar from "../../../components/MyStatusBar";
import LinearGradient from "react-native-linear-gradient";
import CustomCrousel from "../../../components/CustomCrousel";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useFocusEffect } from "@react-navigation/native";
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from "../../../assets/styles";
import * as EcommerceActions from '../../../redux/actions/eCommerceActions'
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { navigate } from "../../../utils/navigationServices";

const Product = ({
    dispatch,
    navigation,
    route,
    productCategoryWaiseList,
    productDetailsBanner
}) => {
    const id = route.params.categoryId
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
        screenType: route.params.screenType,
        categoryData: productCategoryWaiseList?.products
    })

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data };
            return newData;
        });
    };

    const get_astrologer = () => {

    }

    useFocusEffect(
        useCallback(() => {
            updateState({ categoryData: productCategoryWaiseList?.products })
        }, [productCategoryWaiseList]))

    useEffect(() => {
        dispatch(EcommerceActions.getProductCategoryWaiseList({ id }))
        dispatch(EcommerceActions.getProductDetailsBanner())
    }, [id])

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
        screenType,
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
                categoryData={route.params.screenType}
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
                                {productDetailsBanner &&
                                    <CustomCrousel data={productDetailsBanner} />
                                }
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
                    onPress={() => navigation.navigate('productdetails', { details: item })}
                    style={{
                        width: SCREEN_WIDTH * 0.37,
                        height: SCREEN_WIDTH * 0.4,
                        borderRadius: Sizes.fixPadding,
                        marginBottom: Sizes.fixPadding * 1.5,
                        borderWidth: 3,
                        borderColor: Colors.primaryLight,
                    }}>
                    <ImageBackground
                        source={{ uri: item.image }}
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
                                    {item?.title}
                                </Text>
                                <Text
                                    style={{
                                        ...Fonts.white11InterMedium,
                                        fontSize: 9,
                                        flex: 0.4,
                                        textAlign: 'right',
                                    }}>
                                    ₹ {item?.price}
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
                    data={categoryData}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
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
                    {screenType}
                </Text>
                <TouchableOpacity onPress={() => navigate("cart")} >
                    <Image
                        source={require('../../../assets/icons/cart.png')}
                        style={{ width: 22, height: 22 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    productCategoryWaiseList: state.eCommerce.productCategoryWaiseList,
    productDetailsBanner: state.eCommerce.productDetailsBanner,
    isLoading: state.settings.isLoading,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Product)


const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
