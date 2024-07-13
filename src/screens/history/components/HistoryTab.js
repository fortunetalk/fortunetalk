import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Colors, Sizes, Fonts } from '../../../assets/styles';
import { navigate } from '../../../utils/navigationServices';

const data = [
    {
        name: 'Wallet',
        navigateTo: 'walletHistory',
        params: { type: 'Wallet' },
    },
    {
        name: 'Call',
        navigateTo: 'callHistory',
        params: { type: 'Call' },
    },
    {
        name: 'Chat',
        navigateTo: 'chatHistory',
        params: { type: 'Chat' },
    },
    {
        name: 'Fortune Store',
        navigateTo: 'astromallHistory',
        params: { type: 'Shopmall' },
    },
    {
        name: 'Courses',
        navigateTo: 'coursesHistory',
        params: { type: 'Reports' },
    },
    {
        name: 'Remedy',
        navigateTo: 'remedyHistory',
        params: { type: 'Remedy' },
    },
    {
        name: 'Live',
        navigateTo: 'liveCallHistory',
        params: { type: 'Live Call' },
    },
];

const HistoryTab = ({activeTab = ''}) => {
    const renderItem = ({item, index})=>{
        return(
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>navigate(item.navigateTo, item.params)}
            style={{paddingVertical: Sizes.fixPadding*0.5, paddingHorizontal: Sizes.fixPadding*2, borderRadius: 1000, backgroundColor: activeTab == item.params.type ? Colors.primaryLight : Colors.grayJ, marginHorizontal: Sizes.fixPadding}}
            >
                <Text style={{...Fonts._13InterRegular, color: activeTab == item.params.type ? Colors.white : Colors.grayK}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{paddingVertical: Sizes.fixPadding, borderBottomWidth: 1, borderBlockColor: Colors.grayLight}}>
            <FlatList data={data} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false}/>
        </View>
    )
}

export default HistoryTab