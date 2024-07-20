import React from 'react'
import Stars from 'react-native-stars';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import LottieView from "lottie-react-native";
import { showNumber } from '../../utils/services';
import MyHeader from '../../components/MyHeader';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import * as CallActions from '../../redux/actions/callActions'
import * as ChatActions from '../../redux/actions/chatActions'
import { SCREEN_WIDTH, Sizes, Fonts, Colors } from '../../assets/styles';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import { Input } from 'react-native-elements';

const OnlineAstrologers = ({ dispatch, onlineAstrologerData, isLoading }) => {
    const navigation = useNavigation()

    const onChat = (item) => {
        const payload = {
            navigation,
            astrologerId: item?._id,
            astrologerName: item?.name,
            astrologerImage: item?.profileImage,
        }
        dispatch(ChatActions.sendChatRequest(payload))
    }

    const onCall = (item) => {
        const payload = {
            navigation,
            astrologerId: item?._id,
            astrologerName: item?.name,

        }
        dispatch(CallActions.sendCallRequest(payload))
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                // onPress={() =>
                //   navigation.navigate('astrologerDetailes', {
                //     data: item?.id,
                //   })
                // }
                style={{
                    width: SCREEN_WIDTH * 0.4,
                    marginLeft: Sizes.fixPadding * 1.5,
                    borderRadius: Sizes.fixPadding,
                    overflow: 'hidden',
                    elevation: 5,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.2,
                    marginBottom: Sizes.fixPadding * 1.5,
                    shadowColor: Colors.black,
                    backgroundColor: Colors.white,
                    alignItems: 'center',
                }}>
                <ImageBackground
                    source={require('../../assets/images/astro.jpg')}
                    style={{ width: '100%', height: 50 }}>
                    <Image
                        source={{ uri: item?.profileImage }}
                        style={{
                            width: SCREEN_WIDTH * 0.14,
                            height: SCREEN_WIDTH * 0.14,
                            borderRadius: 1000,
                            alignSelf: 'center',
                            borderWidth: 1,
                            borderColor: Colors.white,
                            marginVertical: Sizes.fixPadding * 0.5,
                            position: 'absolute',
                            bottom: -15,
                            zIndex: 2,
                        }}
                    />
                    <LottieView
                        source={require('../../assets/animations/online.json')}
                        style={{ width: 15, height: 15, alignSelf: 'flex-end', margin: Sizes.fixPadding * 0.5 }}
                        autoPlay
                        loop
                    />

                </ImageBackground>
                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: Sizes.fixPadding * 0.3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: Sizes.fixPadding * 2,
                        backgroundColor: Colors.grayLight,
                        zIndex: -1,
                    }}>
                    <Stars
                        default={item?.rating ?? 1}
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
                        {item?.name}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.gray9RobotoRegular }}>
                        {item?.expertise.join(', ')}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.gray9RobotoRegular }}>
                        {item?.languages.join(', ')}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.black11InterMedium,
                            marginTop: Sizes.fixPadding * 0.2,
                        }}>
                        <Text
                            style={{
                                ...Fonts.black11InterMedium,
                                marginTop: Sizes.fixPadding * 0.2,
                                textDecorationLine:
                                    item?.moa == '1' ? 'line-through' : 'none',
                            }}>
                            {showNumber(item?.chatPrice + item?.companyChatPrice)}/min
                        </Text>

                    </Text>
                    <View
                        style={{
                            ...styles.row,
                            marginVertical: Sizes.fixPadding,
                            justifyContent: 'space-evenly',
                            width: '100%',
                        }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => onChat(item)}
                            style={{
                                flex: 0.4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: Colors.primaryLight,
                                borderRadius: Sizes.fixPadding * 0.5,
                            }}>
                            <Text style={{ ...Fonts.primaryDark11InterMedium }}>
                                Chat
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => onCall(item)}
                            style={{
                                flex: 0.4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: Colors.primaryLight,
                                borderRadius: Sizes.fixPadding * 0.5,
                            }}>
                            <Text style={{ ...Fonts.primaryDark11InterMedium }}>Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ backgroundColor: "white", flex: 1 }} >
            <Loader visible={isLoading} />
            <MyHeader title={"Online Astrologers"} />
            {Search()}
            {onlineAstrologerData ? onlineAstrologerData.length != 0 &&
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.grayLight,
                        paddingTop: Sizes.fixPadding * 1
                    }}>
                    <FlatList
                        data={onlineAstrologerData}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
                    />
                </View> : null
            }
        </View>

    );
}

const Search = () => {
    return (
        <View
            style={{
                paddingVertical: Sizes.fixPadding,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: Colors.gray + '30',
                ...styles.row,
            }}>
            <Input
                placeholder={`Search Here...`}
                placeholderTextColor={Colors.gray}
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
        </View>
    )
}

const mapStateToProps = state => ({
    onlineAstrologerData: state.astrologer.onlineAstrologerData,
    isLoading: state.settings.isLoading,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(OnlineAstrologers)

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});