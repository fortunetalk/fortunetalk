import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import MyHeader from '../../components/MyHeader'
import HistoryTab from './components/HistoryTab'
import { secondsToHMS, showNumber } from '../../utils/services'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import * as HistoryActions from '../../redux/actions/historyActions'
import moment from 'moment'

const WalletHistory = ({ route, navigation, customerData, dispatch, walletHistory }) => {
    useEffect(() => {
        dispatch(HistoryActions.getWalletHistory())
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Wallet Transaction'} />
            <HistoryTab activeTab={route.params.type} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={<>
                        {balanceInfo()}
                        {walletHistory && historyInfo()}
                    </>}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding }}
                />
            </View>
        </View>
    )

    function historyInfo() {
        const getTitle = (item) => {
            switch (item.type) {
                case 'WALLET_RECHARGE':
                    return 'Wallet Recharged'
                case 'LIVE_VIDEO_CALL':
                    return `Live Video Call with ${item?.astrologerId?.name} for ${secondsToHMS(item?.referenceId?.durationInSeconds)}`
                case 'LIVE_VOICE_CALL':
                    return `Live Voice Call with ${item?.astrologerId?.name} for ${secondsToHMS(item?.referenceId?.durationInSeconds)}`
                case 'GIFT':
                    return `Gift send to ${item?.astrologerId?.name}`
                case 'CALL':
                    return `Call with ${item?.astrologerId?.name} for ${secondsToHMS(item?.referenceId?.durationInSeconds)}`
                case 'CHAT':
                    return `Chat with ${item?.astrologerId?.name} for ${secondsToHMS(item?.referenceId?.durationInSeconds)}`
                default:
                    return ''
            }
        }
        const renderItem = ({ item, index }) => {
            return (
                <View style={{ backgroundColor: Colors.grayL, marginBottom: Sizes.fixPadding, padding: Sizes.fixPadding, borderRadius: Sizes.fixPadding, elevation: 5, shadowColor: Colors.blackLight }}>
                    <Text style={{ ...Fonts._15InterMedium, color: Colors.grayM }}>{getTitle(item)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ ...Fonts._13InterMedium, color: Colors.grayN, marginBottom: Sizes.fixPadding }}>{moment(item?.createdAt).format('DD MMM YY, hh:mm A')}</Text>
                            <Text style={{ ...Fonts._15InterMedium, color: Colors.grayN }}>{item?.invoiceId}</Text>
                        </View>
                        <View style={{ paddingHorizontal: Sizes.fixPadding * 1.5, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }} >
                            <Text style={{ ...Fonts._18RobotoMedium, color: item?.transactionType == 'CREDIT' ? Colors.greenLight : Colors.red, }}>{item?.transactionType == 'CREDIT' ? ' +' : "-"} ₹{(item?.amount).toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                <FlatList data={walletHistory} renderItem={renderItem} initialNumToRender={10} maxToRenderPerBatch={10} />
            </View>
        )
    }

    function balanceInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingVertical: Sizes.fixPadding * 2, borderBottomWidth: 1, borderBottomColor: Colors.grayLight, paddingHorizontal: Sizes.fixPadding, marginBottom: Sizes.fixPadding }}>
                <View>
                    <Text style={{ ...Fonts._15InterRegular, color: Colors.grayO }}>Available Balance</Text>
                    <Text style={{ ...Fonts._18RobotoBold, fontSize: 28, color: Colors.primaryLight }}>{showNumber(customerData?.walletBalance)}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('wallet')}>
                    <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]} style={{ paddingHorizontal: Sizes.fixPadding * 1.5, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }} >
                        <Text style={{ ...Fonts._15RobotMedium, color: Colors.white, }}>Recharge Now</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    walletHistory: state.history.walletHistory,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(WalletHistory)