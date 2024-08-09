import React from 'react'
import { View, TouchableOpacity, FlatList, Image } from 'react-native'
import { Colors, SCREEN_WIDTH, Sizes } from '../../../assets/styles';
import { connect } from 'react-redux';

const Banner = ({ type, chatBannerData, callBannerData }) => {
    const data = type === 'chat' ? chatBannerData : callBannerData
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    width: SCREEN_WIDTH * 0.97,
                    height: SCREEN_WIDTH * 0.16,
                    marginRight: Sizes.fixPadding,
                    borderRadius: Sizes.fixPadding * 1.2,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: Colors.grayLight,
                }}>
                <Image
                    source={{uri: item?.image}}
                    style={{ width: '100%', height: '100%' }}
                />
            </TouchableOpacity>
        );
    };
    return (
        <>
            {
                data && <View
                    style={{
                        paddingVertical: Sizes.fixPadding,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.grayLight,
                    }}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 0.7 }}
                        pagingEnabled
                    />
                </View>
            }
        </>

    );
}

const mapStateToProps = state => ({
    callBannerData: state.call.callBannerData,
    chatBannerData: state.chat.chatBannerData
})

export default connect(mapStateToProps, null)(Banner)