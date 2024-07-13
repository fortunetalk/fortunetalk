import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import MyHeader from '../../components/MyHeader'
import HistoryTab from './components/HistoryTab'
import LinearGradient from 'react-native-linear-gradient'
import * as HistoryActions from '../../redux/actions/historyActions'
import { connect } from 'react-redux'
import moment from 'moment'
import { secondsToHMS } from '../../utils/services'

const CallHistory = ({ route, callHistory, dispatch }) => {
    useEffect(() => {
        dispatch(HistoryActions.getCallHistory())
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Wallet Transaction'} />
            <HistoryTab activeTab={route.params.type} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={<>
                        {callHistory && historyInfo()}
                    </>}
                    contentContainerStyle={{paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding}}
                />
            </View>
        </View>
    )

    function historyInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <View style={{ backgroundColor: Colors.grayL, marginBottom: Sizes.fixPadding, padding: Sizes.fixPadding, borderRadius: Sizes.fixPadding, elevation: 5, shadowColor: Colors.blackLight }}>
                <Text style={{ ...Fonts._15InterMedium, color: Colors.grayM }}>{`Chat with ${item?.astrologerId?.name} for ${secondsToHMS(item?.durationInSeconds ?? 0)}`}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ ...Fonts._13InterMedium, color: Colors.grayN, marginBottom: Sizes.fixPadding }}>{moment(item?.createdAt).format('DD MMM YY, hh:mm A')}</Text>
                        <Text style={{ ...Fonts._15InterMedium, color: Colors.grayN, textTransform: 'uppercase' }}>#{item?.transactionId}</Text>
                    </View>
                    <TouchableOpacity>
                        <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]} style={{ paddingHorizontal: Sizes.fixPadding * 1.5, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }} >
                            <Text style={{ ...Fonts._11RobotoMedium, color: Colors.white, fontSize: 12 }}>Call Again</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            )
        }
        return (
            <View>
                <FlatList data={callHistory} renderItem={renderItem} initialNumToRender={10} maxToRenderPerBatch={10} />
            </View>
        )
    }

}


const mapStateToProps = state => ({
    callHistory: state.history.callHistory,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CallHistory)

const styles = StyleSheet.create({
    container:{

    }
})