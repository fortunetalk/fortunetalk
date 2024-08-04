import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Input } from '@rneui/themed'
import { Colors, Fonts, Sizes } from '../../../assets/styles'
import { Image } from 'react-native'
import * as AstrologerActions from '../../../redux/actions/astrologerActions'
import { connect } from 'react-redux'
let timeout;

const SearchInput = ({ dispatch, astrologerSearchText }) => {
    const onChangeText = (text) => {
        dispatch(AstrologerActions.setAstrolgoerSearchText(text))
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            dispatch(AstrologerActions.onAstrologerSearch({ page: 1 }))
            clearTimeout(timeout)
        }, 2000)
    }
    return (
        <Input
            value={astrologerSearchText}
            placeholder='Search Astrologer'
            placeholderTextColor={Colors.grayB}
            inputContainerStyle={{ borderWidth: 1, borderRadius: 1000, height: 40, paddingHorizontal: Sizes.fixPadding, borderColor: Colors.grayE }}
            inputStyle={{ ...Fonts._15RobotoRegular }}
            containerStyle={{ height: 40, marginVertical: Sizes.fixPadding }}
            onChangeText={onChangeText}
            leftIcon={<Image
                source={require('../../../assets/icons/search.png')}
                style={{ width: 20, height: 20 }}
            />
            }
        />
    )
}

const mapStateToProps = (state) => ({
    astrologerSearchText: state.astrologer.astrologerSearchText
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)