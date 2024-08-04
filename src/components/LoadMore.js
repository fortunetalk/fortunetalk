import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { Colors } from '../assets/styles'

const LoadMore = ({ isLoadingMore }) => {
    if (!isLoadingMore) return
    return (
        <View>
            <ActivityIndicator color={Colors.primaryLight} />
        </View>
    )
}


const mapStateToProps = state => ({
    isLoadingMore: state.settings.isLoadingMore
})

export default connect(mapStateToProps, null)(LoadMore)