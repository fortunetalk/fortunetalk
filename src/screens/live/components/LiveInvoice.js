import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Fonts, Sizes } from '../../../assets/styles'
import { BlurView } from "@react-native-community/blur";
import { Divider } from '@rneui/themed'
import { secondsToHMS, showNumber } from '../../../utils/services'
import { connect } from 'react-redux'
import * as LiveActions from '../../../redux/actions/liveActions'
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
const LiveInvoice = ({ liveInvoiceData, dispatch }) => {
    const onClose = () => {
        dispatch(AstrologerActions.setAstrologerRatingData({
            visible: true,
            data: {
                astrologerId: liveInvoiceData?.data?.roomId?.astrologerId?._id,
                astrolgoerName: liveInvoiceData?.data?.roomId?.astrologerId?.displayName,
                profileImage: liveInvoiceData?.data?.roomId?.astrologerId?.profileImage,
                skill: liveInvoiceData?.data?.astrologerId?.roomId?.remedies
            }
        }))
        dispatch(LiveActions.setLiveInvoiceData({ visible: false, data: null }))
    }
    return (
        <Modal
            visible={liveInvoiceData?.visible}
            contentContainerStyle={{ flex: 1 }}
            onDismiss={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <BlurView
                    style={styles.absolute}
                    blurType="light"
                    blurAmount={2}
                    reducedTransparencyFallbackColor="white"
                />
                <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{ paddingVertical: Sizes.fixPadding, width: '75%', alignSelf: 'center', borderRadius: Sizes.fixPadding, elevation: 5 }}
                >
                    <Text style={{ ...Fonts._15RobotoBold, fontSize: 16, textAlign: 'center', color: Colors.white, marginTop: Sizes.fixPadding * 0.5 }}>Thanks for Choosing {'\n'} Fortune Talk</Text>
                    <Divider orientation='horizontal' width={1.5} color={Colors.white} style={{ marginVertical: Sizes.fixPadding * 1.5 }} />
                    <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Finished ID:</Text>
                            <Text style={[styles.itemText, { textTransform: 'uppercase' }]}>{liveInvoiceData?.data?.streamId.slice(11, -1)}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Time:</Text>
                            <Text style={styles.itemText}>{secondsToHMS(liveInvoiceData?.data?.durationInSeconds)}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Charge:</Text>
                            <Text style={styles.itemText}>{showNumber(liveInvoiceData?.data?.amount)}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Promotion:</Text>
                            <Text style={styles.itemText}>{showNumber(0)}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Total Charge:</Text>
                            <Text style={styles.itemText}>{showNumber(liveInvoiceData?.data?.amount)}</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.buttonContainer}>
                        <Text style={{ ...Fonts._18RobotoBold, textAlign: 'center', color: Colors.primaryDark }}>OK</Text>
                    </TouchableOpacity>
                </LinearGradient>

            </View>

        </Modal>
    )
}


const mapStateToProps = state => ({
    liveInvoiceData: state.live.liveInvoiceData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(LiveInvoice)


const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding
    },
    itemText: {
        ...Fonts._13RobotoMedium,
        color: Colors.white
    },
    buttonContainer: {
        width: '30%',
        backgroundColor: Colors.white,
        alignSelf: 'center',
        paddingVertical: Sizes.fixPadding * 0.8,
        borderRadius: 1000,
        elevation: 5,
        marginTop: Sizes.fixPadding * 2,
        marginBottom: Sizes.fixPadding
    }
})