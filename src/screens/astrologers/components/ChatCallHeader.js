import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors, Sizes, Fonts } from '../../../assets/styles'
import { connect } from 'react-redux'
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
import { goBack, navigate } from '../../../utils/navigationServices'

const ChatCallHeader = ({ title, dispatch }) => {
    return (
        <View
            style={{
                margin: Sizes.fixPadding * 1.5,
                ...styles.row,
                justifyContent: 'space-between',
            }}>
            <TouchableOpacity
                onPress={() => goBack()}
                style={{
                    alignSelf: 'flex-start',
                    flex: 0.2,
                }}>
                <AntDesign
                    name="leftcircleo"
                    color={Colors.primaryLight}
                    size={Sizes.fixPadding * 2.2}
                />
            </TouchableOpacity>
            <Text
                style={{
                    ...Fonts._18RobotoMedium,
                    color: Colors.primaryLight,
                    fontSize: 16,
                    textAlign: 'center',
                    flex: 0.65,
                }}>
                {title} with Astrologer
            </Text>
            <View style={{ ...styles.row }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        navigate('searchAstrologer')
                    }
                >
                    <AntDesign
                        name="search1"
                        color={Colors.primaryLight}
                        size={Sizes.fixPadding * 2}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => dispatch(AstrologerActions.setAstrologerFiltersVisible(true))}
                    style={{ marginLeft: Sizes.fixPadding * 1 }}>
                    <AntDesign
                        name="filter"
                        color={Colors.primaryLight}
                        size={Sizes.fixPadding * 2}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    astrologerFilterVisible: state.astrologer.astrologerFilterVisible
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatCallHeader)

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
})