import moment from 'moment'
import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import HistoryTab from './components/HistoryTab'
import MyHeader from '../../components/MyHeader'
import MyStatusBar from '../../components/MyStatusBar'
import { Colors, Sizes, Fonts } from '../../assets/styles'
import LinearGradient from 'react-native-linear-gradient'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import * as HistoryActions from '../../redux/actions/historyActions'

const AstromallHistory = ({ route, fortuneHistory, dispatch }) => {

    useEffect(() => {
        dispatch(HistoryActions.onProductHistory())
    }, [])

    const productHistory = fortuneHistory && fortuneHistory.flatMap((order) => order.items)
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Fortune Store History'} />
            <HistoryTab activeTab={route.params.type} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {historyInfo()}
                        </>
                    }
                />
            </View>
        </View>
    )

    function historyInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <View style={{ backgroundColor: Colors.grayL, marginBottom: Sizes.fixPadding, padding: Sizes.fixPadding, borderRadius: Sizes.fixPadding, elevation: 5, shadowColor: Colors.blackLight }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('chatSummary', { chatData: item })}
                        style={{
                            justifyContent: "flex-end",
                            flexDirection: "row",
                        }}
                    >
                        <Text style={{
                            ...Fonts._11RobotoMedium,
                            color: Colors.white,
                            fontSize: 12,
                            backgroundColor: Colors.gray,
                            paddingHorizontal: Sizes.fixPadding * 1,
                            paddingVertical: Sizes.fixPadding * 0.5,
                            borderRadius: Sizes.fixPadding * 2
                        }}>Details</Text>
                    </TouchableOpacity>

                    <Text style={{ ...Fonts._15InterMedium, color: Colors.grayM }}>{item?.productId?.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ ...Fonts._13InterMedium, color: Colors.grayN, marginBottom: Sizes.fixPadding }}>{moment(fortuneHistory[index]?.createdAt).format('DD MMM YY, hh:mm A')}</Text>
                            <Text style={{ ...Fonts._15InterMedium, color: Colors.grayN }}>Price: {item?.productId?.price}</Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]} style={{ paddingHorizontal: Sizes.fixPadding * 1.5, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }} >
                                    <Text style={{ ...Fonts._11RobotoMedium, color: Colors.white, fontSize: 12 }}>Order Again</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View
                style={{
                    paddingHorizontal: Sizes.fixPadding * 1,
                    paddingVertical: Sizes.fixPadding * 2
                }}
            >
                <FlatList
                    data={productHistory}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    fortuneHistory: state.history.fortuneHistory,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstromallHistory)