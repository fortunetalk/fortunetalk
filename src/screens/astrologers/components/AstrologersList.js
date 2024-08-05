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
import * as ChatActions from '../../../redux/actions/chatActions'
import { useNavigation } from '@react-navigation/native';
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
import LoadMore from '../../../components/LoadMore';

const AstrologerItems = memo(({ item, index, type = 'chat', dispatch }) => {
    const navigation = useNavigation()

    const onSubmit = () => {
        const payload = {
            navigation,
            astrologerId: item?._id,
            astrologerName: item?.displayName,
            astrologerImage: item?.profileImage,
        }
        if (type === 'chat' || type === 'searched') {
            dispatch(ChatActions.sendChatRequest(payload))
        } else {
            console.log('hii')
            dispatch(CallActions.sendCallRequest(payload))
        }
    }

    const getStatusColor = (status) => {
        if (status === 'Online') return Colors.green_a
        else if (status === 'Offline') return Colors.gray
        else if (status === 'Busy') return 'red'
    }

    const getPrice = (item) => {
        if (type === "chat" || type == 'searched') {
            return item?.chatPrice + item?.companyChatPrice
        }
        return item?.callPrice + item?.companyCallPrice
    }

    const getOfferPrice = item => {
        if (type === "chat" || type === 'searched') {
            return (item?.chatPrice + item?.companyChatPrice) - (item?.chatPrice + item?.companyChatPrice) * item?.chatCallOffer?.discount / 100
        }
        return (item?.callPrice + item?.companyCallPrice) - (item?.callPrice + item?.companyCallPrice) * item?.chatCallOffer?.discount / 100

    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate('astrologerDetails', { _id: item?._id })}
            style={styles.itemContainer}>
            <ImageBackground
                source={require('../../../assets/images/astro.jpg')}
                style={{ width: '100%', height: SCREEN_WIDTH * 0.2 }}>
                {item?.chatCallOffer && (
                    <View
                        style={{
                            transform: [{ rotate: '-45deg' }],
                            backgroundColor: Colors.primaryLight,
                            width: '60%',
                            left: -20,
                            top: 15,
                        }}>
                        <Text style={{ ...Fonts.white11InterMedium, textAlign: 'center' }}>
                            {item?.chatCallOffer?.displayName}
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
                    />
                    <Text numberOfLines={1} style={{ ...Fonts.black14InterMedium }}>
                        {item?.displayName}
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
                            color={item?.moaStatus == '1' ? Colors.primaryLight : Colors.black}
                            size={16}
                        />
                        {item?.chatCallOffer ? (
                            <Text
                                style={{
                                    ...Fonts.black11InterMedium,
                                    marginLeft: Sizes.fixPadding * 0.5,
                                }}>
                                {showNumber(getOfferPrice(item))}
                                /min{' '}
                                {<Text style={{ fontSize: 9, textDecorationLine: 'line-through' }}>
                                    {showNumber(getPrice(item))}
                                    /min{' '}
                                </Text>}

                            </Text>
                        ) : (
                            <Text
                                style={{
                                    ...Fonts.black11InterMedium,
                                    marginLeft: Sizes.fixPadding * 0.5,
                                }}>
                                {item?.moaStatus && (
                                    <Text style={{ fontSize: 13, color: Colors.primaryLight }}>
                                        {'Free '}
                                    </Text>
                                )}
                                <Text
                                    style={{
                                        textDecorationLine:
                                            item?.moaStatus == '1' ? 'line-through' : 'none',
                                    }}>
                                    {showNumber(getPrice(item))}
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
                        backgroundColor: getStatusColor(type == 'chat' ? item?.chatStatus : item?.callStatus),
                        paddingVertical: Sizes.fixPadding * 0.5,
                    }}>
                    <Text style={{ ...Fonts.white14RobotoMedium }}>
                        {type == 'chat' || type === 'searched' ? 'Chat Now' : 'Call Now'}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
});

const AstrologersList = ({ astroChatList, dispatch, type, astroCallList, searchedAstrologerData }) => {
    const data = type === 'chat' ? astroChatList : type == 'call' ? astroCallList : searchedAstrologerData;

    const renderItem = useCallback(({ item, index }) => {
        return <AstrologerItems item={item} index={index} type={type} dispatch={dispatch} />;
    }, []);

    const keyExtractor = useCallback((item, index) => index.toString(), []);

    const getItemLayout = useCallback((data, index) => ({
        length: SCREEN_WIDTH * 0.65,
        length: SCREEN_WIDTH * 0.65,
        offset: SCREEN_WIDTH * 0.65 * index,
        index,
    }), []);

    return (
        <View
            style={{
                marginTop: Sizes.fixPadding,
            }}>
            {data && <FlatList
                data={data?.docs}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={2}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                getItemLayout={getItemLayout}
                onEndReachedThreshold={0.1}
                contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
                ListFooterComponent={() => <LoadMore />}
                onEndReached={() => {
                    if (type === 'searched') {
                        dispatch(AstrologerActions.onAstrologerSearch({ isLoadingMore: true, page: data?.nextPage }))
                    } else {
                        dispatch(AstrologerActions.getChatCallAstrologerList({ type, remediesId: 'All', page: data?.nextPage, isLoadingMore: true }))
                    }

                }}
            />}
        </View>
    )
}

const mapStateToProps = state => ({
    astroChatList: state.astrologer.astroChatList,
    astroCallList: state.astrologer.astroCallList,
    searchedAstrologerData: state.astrologer.searchedAstrologerData
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