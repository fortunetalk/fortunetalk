import React from 'react'
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { base_url } from '../../../config/constants';
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Sizes, Fonts, Colors } from '../../../assets/styles';

const AstrologerReviews = ({ astrolgoerReviewData, dispatch, astrologerId }) => {
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
                        source={{ uri: base_url + item?.customerId?.profileImage }}
                        style={{ width: 25, height: 25, borderRadius: 100 }}
                    />
                    <Text
                        style={{
                            ...Fonts.gray12RobotoMedium,
                            marginHorizontal: Sizes.fixPadding,
                        }}>
                        {item?.customerId?.customerName}
                    </Text>
                    <Stars
                        default={item?.rating}
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
                    {item?.comments}
                </Text>
                {false && (
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
    if (!astrolgoerReviewData) return
    if (astrolgoerReviewData?.reviews.length == 0) return
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
                data={astrolgoerReviewData?.reviews}
                renderItem={renderItem}
                onEndReached={() => dispatch(AstrologerActions.getAstrologerReviews({astrologerId, page: astrolgoerReviewData?.currentPage + 1, limit: 10}))}
            //   keyExtractor={item => item.rating_id}
            />
        </View>
    );
}

const mapStateToProps = state => ({
    astrolgoerReviewData: state.astrologer.astrolgoerReviewData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerReviews)

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
