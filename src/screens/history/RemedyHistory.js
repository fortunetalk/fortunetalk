import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import MyHeader from '../../components/MyHeader'
import HistoryTab from './components/HistoryTab'

const RemedyHistory = ({route}) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Remedy History'} />
            <HistoryTab activeTab={route.params.type} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={<>

                    </>}
                />
            </View>
        </View>
    )
}

export default RemedyHistory