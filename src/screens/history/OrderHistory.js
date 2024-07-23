import React from 'react';
import MyHeader from '../../components/MyHeader';
import MyStatusBar from '../../components/MyStatusBar';
import { Colors, Fonts, SCREEN_WIDTH, Sizes } from '../../assets/styles';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const data = [
    {
        name: 'Wallet',
        icon: require('../../assets/icons/wallet_history.png'),
        navigateTo: 'walletHistory',
        params: { type: 'Wallet' },
    },
    {
        name: 'Call',
        icon: require('../../assets/icons/call_history.png'),
        navigateTo: 'callHistory',
        params: { type: 'Call' },
    },
    {
        name: 'Chat',
        icon: require('../../assets/icons/chat_history.png'),
        navigateTo: 'chatHistory',
        params: { type: 'Chat' },
    },
    {
        name: 'Fortune Store',
        icon: require('../../assets/icons/astromall_history.png'),
        navigateTo: 'astromallHistory',
        params: { type: 'Shopmall' },
    },
    {
        name: 'Courses',
        icon: require('../../assets/icons/courses.png'),
        navigateTo: 'coursesHistory',
        params: { type: 'Reports' },
    },
    {
        name: 'Remedy',
        icon: require('../../assets/icons/numerology_a.png'),
        navigateTo: 'remedyHistory',
        params: { type: 'Remedy' },
    },
    {
        name: 'Live',
        icon: require('../../assets/icons/live_call.png'),
        navigateTo: 'liveCallHistory',
        params: { type: 'Live Call' },
    },
];

const OrderHistory = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} />
            <MyHeader title={'Order History'} />
            <FlatList ListHeaderComponent={<>{historyTabInfo()}</>} contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }} />
        </View>
    );

    function historyTabInfo() {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={item.name}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate(item.navigateTo, item.params)}
                            style={{
                                width: SCREEN_WIDTH * 0.25,
                                height: SCREEN_WIDTH * 0.25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Colors.whiteDark,
                                marginLeft: SCREEN_WIDTH * 0.06,
                                marginBottom: SCREEN_WIDTH * 0.06,
                                borderRadius: Sizes.fixPadding,
                                elevation: 3,
                                shadowColor: Colors.blackLight
                            }}>
                            <Image
                                source={item.icon}
                                style={{ width: '40%', height: '40%', resizeMode: 'contain' }}
                            />
                            <Text style={{ ...Fonts._13RobotoMedium, marginTop: Sizes.fixPadding }}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
};

export default OrderHistory;
