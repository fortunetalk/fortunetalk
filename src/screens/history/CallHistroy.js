import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Sizes, Fonts } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import MyHeader from '../../components/MyHeader'
import HistoryTab from './components/HistoryTab'
import LinearGradient from 'react-native-linear-gradient'

const CallHistroy = ({ route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Wallet Transaction'} />
            <HistoryTab activeTab={route.params.type} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={<>
                        {historyInfo()}
                    </>}
                    contentContainerStyle={{paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding}}
                />
            </View>
        </View>
    )

    function historyInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <View style={{backgroundColor: Colors.grayL, marginBottom: Sizes.fixPadding, padding: Sizes.fixPadding, borderRadius: Sizes.fixPadding, elevation: 5, shadowColor: Colors.blackLight}}>
                    <Text style={{...Fonts._15InterMedium, color: Colors.grayM}}>Call with Astro Me for 7 Minutes</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{...Fonts._13InterMedium, color: Colors.grayN, marginBottom: Sizes.fixPadding}}>26 Jul 23, 02:51 PM</Text>
                            <Text style={{...Fonts._15InterMedium, color: Colors.grayN}}>#CHAT NEW40607702</Text>
                        </View>
                        <TouchableOpacity>
                            <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]} style={{paddingHorizontal: Sizes.fixPadding*1.5, paddingVertical: Sizes.fixPadding*0.5, borderRadius: 1000}} >
                                <Text style={{...Fonts._11RobotoMedium, color: Colors.white, fontSize: 12}}>Call Again</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <FlatList data={Array.from({ length: 5 })} renderItem={renderItem} initialNumToRender={10} maxToRenderPerBatch={10} />
            </View>
        )
    }

}

export default CallHistroy

const styles = StyleSheet.create({
    container:{

    }
})