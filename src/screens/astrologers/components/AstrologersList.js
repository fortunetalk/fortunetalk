import { View, Text, FlatList, ImageBackground, Image, StyleSheet } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../../assets/styles'
import { TouchableOpacity } from 'react-native';
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { showNumber } from '../../../utils/services';
import { navigate } from '../../../utils/navigationServices';
import { connect } from 'react-redux';
import * as CallActions from '../../../redux/actions/callActions'
import { useNavigation } from '@react-navigation/native';

const AstrologerItems = memo(({ item, index, type = 'chat', dispatch }) => {
    const navigation = useNavigation()
    const onSubmit = () => {
        if (type === 'chat') {

        } else {
            dispatch(CallActions.sendCallRequest({ navigation }))
        }
    }
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate('astrologerDetails', { _id: item?._id })}
            style={styles.itemContainer}>
            <ImageBackground
                source={require('../../../assets/images/astro.jpg')}
                style={{ width: '100%', height: SCREEN_WIDTH * 0.2 }}>
                {item?.Offer_list != 0 && (
                    <View
                        style={{
                            transform: [{ rotate: '-45deg' }],
                            backgroundColor: Colors.primaryLight,
                            width: '60%',
                            left: -20,
                            top: 15,
                        }}>
                        <Text style={{ ...Fonts.white11InterMedium, textAlign: 'center' }}>
                            Offer
                        </Text>
                    </View>
                )}
                <Image source={{ uri: item?.profileImage }} style={styles.imageContainer} />
                <Image
                    source={require('../../../assets/icons/verify.png')}
                    style={{
                        width: 30,
                        height: 30,
                        zIndex: 99,
                        position: 'absolute',
                        alignSelf: 'center',
                        bottom: -25,
                        zIndex: 2,
                    }}
                />
            </ImageBackground>
            <View
                style={{
                    width: '100%',
                    height: SCREEN_WIDTH * 0.45,
                    justifyContent: 'space-between',
                    paddingTop: Sizes.fixPadding * 2.5,
                    zIndex: -1,
                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.gray11RobotoRegular }}>
                        ({item?.follower_count ?? 0})
                    </Text>
                    <Stars
                        default={item?.avgRating ?? 1}
                        count={5}
                        half={true}
                        starSize={14}
                        disabled={true}
                        fullStar={
                            <Ionicons name={'star'} size={14} color={Colors.primaryLight} />
                        }
                        emptyStar={
                            <Ionicons
                                name={'star-outline'}
                                size={14}
                                color={Colors.primaryLight}
                            />
                        }
                    // halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                    />
                    <Text numberOfLines={1} style={{ ...Fonts.black14InterMedium }}>
                        {item?.name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{ ...Fonts.gray12RobotoMedium, fontSize: 9, textAlign: 'center' }}>
                        (Tarot reader, Relationships)
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.gray12RobotoMedium, fontSize: 9, textAlign: 'center' }}>
                        {item?.language.join(', ')}
                    </Text>
                    <View style={{ ...styles.row, marginTop: Sizes.fixPadding * 0.2 }}>
                        <Ionicons
                            name={type == 'chat' ? "chatbubble-ellipses-outline" : 'call-outline'}
                            color={item?.moa == '1' ? Colors.primaryLight : Colors.black}
                            size={16}
                        />
                        {item?.Offer_list != 0 ? (
                            <Text
                                style={{
                                    ...Fonts.black11InterMedium,
                                    marginLeft: Sizes.fixPadding * 0.5,
                                }}>
                                {item?.moa == '1' && (
                                    <Text style={{ fontSize: 13, color: Colors.primaryLight }}>
                                        {'Free '}
                                    </Text>
                                )}
                                {showNumber(item?.chatPrice + item?.companyChatPrice)}
                                /min{' '}
                                {item?.moa != '1' && <Text style={{ fontSize: 9, textDecorationLine: 'line-through' }}>
                                    {showNumber(10)}
                                    /min{' '}
                                </Text>}

                            </Text>
                        ) : (
                            <Text
                                style={{
                                    ...Fonts.black11InterMedium,
                                    marginLeft: Sizes.fixPadding * 0.5,
                                }}>
                                {item?.moa == '1' && (
                                    <Text style={{ fontSize: 13, color: Colors.primaryLight }}>
                                        {'Free '}
                                    </Text>
                                )}
                                <Text
                                    style={{
                                        textDecorationLine:
                                            item?.moa == '1' ? 'line-through' : 'none',
                                    }}>
                                    {showNumber(10)}
                                    /min{' '}
                                </Text>
                            </Text>
                        )}
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onSubmit}
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        borderRadius: Sizes.fixPadding * 1.5,
                        marginTop: Sizes.fixPadding,
                        backgroundColor: Colors.green_a,
                        paddingVertical: Sizes.fixPadding * 0.5,
                    }}>
                    <Text style={{ ...Fonts.white14RobotoMedium }}>
                        {type == 'chat' ? 'Chat Now' : 'Call Now'}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
});

const AstrologersList = ({ astroChatList, dispatch, type, astroCallList }) => {
    const data = type === 'chat' ? astroChatList : astroCallList;

    const renderItem = useCallback(({ item, index }) => {
        return <AstrologerItems item={item} index={index} type={type} dispatch={dispatch} />;
    }, []);

    const keyExtractor = useCallback((item, index) => index.toString(), []);

    const getItemLayout = useCallback((data, index) => ({
        length: SCREEN_WIDTH * 0.65, // Height of each item
        offset: SCREEN_WIDTH * 0.65 * index,
        index,
    }), []);

    return (
        <View
            style={{
                marginTop: Sizes.fixPadding,
            }}>
            {data && <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                // ListEmptyComponent={<NoDataFound />}
                numColumns={2}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                getItemLayout={getItemLayout}
                onEndReachedThreshold={0.1}
                contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
                onEndReached={() => {
                    // get_astrologer_on_end_reach(activeFilter, currentIndex + 1);
                }}
            />}
        </View>
    )
}

const mapStateToProps = state => ({
    astroChatList: state.astrologer.astroChatList,
    astroCallList: state.astrologer.astroCallList,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstrologersList)

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: Colors.grayLight,
    },
    itemContainer: {
        width: '43.45%',
        height: SCREEN_WIDTH * 0.65,
        marginLeft: Sizes.fixPadding * 1.5,
        borderRadius: Sizes.fixPadding * 1.5,
        overflow: 'hidden',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        marginBottom: Sizes.fixPadding * 1.5,
        shadowColor: Colors.black,
        backgroundColor: Colors.grayLight,
        alignItems: 'center',
    },
    imageContainer: {
        width: SCREEN_WIDTH * 0.18,
        height: SCREEN_WIDTH * 0.18,
        borderRadius: 1000,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: Colors.white,
        marginVertical: Sizes.fixPadding * 0.5,
        position: 'absolute',
        bottom: -22,
        zIndex: 2,
    },
});