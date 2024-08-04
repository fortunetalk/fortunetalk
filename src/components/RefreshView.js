import { View, Text, RefreshControl } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'

const RefreshView = ({ isRefreshing, onRefresh, refreshing, }) => {
    return (
        <RefreshControl refreshing={true} />
    )
}

const mapStateToProps = state => ({
    isRefreshing: state.settings.isRefreshing
})

export default connect(mapStateToProps, null)(RefreshView)