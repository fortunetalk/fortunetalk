import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import MyHeader from '../../components/MyHeader'
import HistoryTab from './components/HistoryTab'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import * as HistoryActions from '../../redux/actions/historyActions'
import * as ChatActions from '../../redux/actions/chatActions'
import { secondsToHMS, showNumber } from '../../utils/services'
import moment from 'moment'

const ChatHistory = ({ route, chatHistory, dispatch, navigation }) => {
    useEffect(() => {
        dispatch(HistoryActions.getChatHistory())
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <MyHeader title={'Chat History'} />
            <HistoryTab activeTab={route.params.type} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={<>
                        {chatHistory && historyInfo()}
                    </>}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding }}
                />
            </View>
        </View>
    )

    function historyInfo() {
        const onChat = (item) => {
            const payload = {
              navigation,
              astrologerId: item?.astrologerId?._id,
              astrologerName: item?.astrologerId?.name,
              astrologerImage: item?.astrologerId?.profileImage,
            }
            dispatch(ChatActions.sendChatRequest(payload))
          }
        const renderItem = ({ item, index }) => {
            return (
                <View style={{ backgroundColor: Colors.grayL, marginBottom: Sizes.fixPadding, padding: Sizes.fixPadding, borderRadius: Sizes.fixPadding, elevation: 5, shadowColor: Colors.blackLight }}>
                    <Text style={{ ...Fonts._15InterMedium, color: Colors.grayM }}>{`Chat with ${item?.astrologerId?.name} for ${secondsToHMS(item?.durationInSeconds ?? 0)}`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ ...Fonts._13InterMedium, color: Colors.grayN,}}>{moment(item?.createdAt).format('DD MMM YY, hh:mm A')}</Text>
                            <Text style={{ ...Fonts._13InterMedium, color: Colors.grayN}}>Chat Price: {showNumber(item?.chatPrice)}</Text>
                            <Text style={{ ...Fonts._13InterMedium, color: Colors.grayN, }}>Deducted Price: {showNumber(item?.deductedAmount)}</Text>
                            <Text style={{ ...Fonts._13InterMedium, color: Colors.grayN, marginBottom: Sizes.fixPadding, textTransform: 'capitalize'}}>Status: {item?.status}</Text>
                            <Text style={{ ...Fonts._15InterMedium, color: Colors.grayN, textTransform: 'uppercase' }}>#{item?.transactionId}</Text>
                        </View>
                        <View>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('chatSummary', { chatData: item })} style={{ marginVertical: Sizes.fixPadding }}>
                                <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]} style={{ paddingHorizontal: Sizes.fixPadding * 1.5, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }} >
                                    <Text style={{ ...Fonts._11RobotoMedium, color: Colors.white, fontSize: 12 }}>View Chat</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={()=>onChat(item)}>
                                <LinearGradient colors={[Colors.primaryLight, Colors.primaryDark]} style={{ paddingHorizontal: Sizes.fixPadding * 1.5, paddingVertical: Sizes.fixPadding * 0.5, borderRadius: 1000 }} >
                                    <Text style={{ ...Fonts._11RobotoMedium, color: Colors.white, fontSize: 12 }}>Chat Again</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }} >
                        <Text style={{ ...Fonts._13InterMedium, color: Colors.black, }}>Deducted Amount:</Text>
                        <Text style={{ ...Fonts._15InterMedium, color: Colors.black }}>{showNumber(item?.deductedAmount ?? 0)}</Text>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <FlatList data={chatHistory} renderItem={renderItem} initialNumToRender={10} maxToRenderPerBatch={10} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    chatHistory: state.history.chatHistory,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory)