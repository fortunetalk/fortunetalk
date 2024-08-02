import React from 'react'
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, Sizes, Fonts } from '../../../assets/styles';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, } from 'react-native'

const AstrologerReviews = () => {
    const renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    backgroundColor: Colors.grayLight,
                    padding: Sizes.fixPadding,
                    borderRadius: Sizes.fixPadding,
                    marginBottom: Sizes.fixPadding * 1.5,
                    elevation: 5,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowColor: Colors.gray,
                }}>
                <View style={[styles.row]}>
                    <Image
                        source={require('../../../assets/images/user.png')}
                        style={{ width: 25, height: 25, borderRadius: 100 }}
                    />
                    <Text
                        style={{
                            ...Fonts.gray12RobotoMedium,
                            marginHorizontal: Sizes.fixPadding,
                        }}>
                        Ranjeet Kumar
                    </Text>
                    <Stars
                        default={4}
                        count={5}
                        half={true}
                        starSize={12}
                        fullStar={
                            <Ionicons name={'star'} size={12} color={Colors.primaryLight} />
                        }
                        emptyStar={
                            <Ionicons
                                name={'star-outline'}
                                size={12}
                                color={Colors.primaryLight}
                            />
                        }
                    />
                </View>
                <Text
                    style={{
                        ...Fonts.black11InterMedium,
                        marginTop: Sizes.fixPadding,
                        color: Colors.blackLight,
                    }}>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </Text>
                {true && (
                    <View style={{ marginTop: Sizes.fixPadding}}>
                        <Text style={{ ...Fonts.primaryLight14RobotoRegular }}>
                          reply  Astro Kuldeep
                        </Text>
                        <Text
                            style={{
                                ...Fonts.gray11RobotoRegular,
                                marginTop: Sizes.fixPadding * 0.2,
                                color: Colors.blackLight,
                            }}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </Text>
                    </View>
                )}
            </View>
        );
    };
    return (
        <View
            style={{
                padding: Sizes.fixPadding * 1.5,
                borderBottomWidth: 1,
                borderBottomColor: Colors.grayLight,
            }}>
            <View
                style={[
                    styles.row,
                    {
                        justifyContent: 'space-between',
                        marginBottom: Sizes.fixPadding * 2,
                    },
                ]}>
                <Text style={{ ...Fonts.black16RobotoMedium }}>Customer Reviews</Text>
                <TouchableOpacity>
                    <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={Array.from({ length: 10 })}
                renderItem={renderItem}
            />
        </View>
    );
}

export default AstrologerReviews

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
