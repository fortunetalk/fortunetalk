import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../assets/styles'
import MyHeader from '../../components/MyHeader'
import AstrologersList from './components/AstrologersList'
import SearchInput from './components/SearchInput'
import { connect } from 'react-redux'
import * as AstrologerActions from '../../redux/actions/astrologerActions'

const SearchAstrologer = ({dispatch}) => {
    useEffect(()=>{
        return ()=>{
            dispatch(AstrologerActions.setAstrolgoerSearchText(''))
            dispatch(AstrologerActions.setAstrologerSearchedData(null))
        }
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyHeader title={'Search Astrolgoer'} />
            <SearchInput />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={<>
                        <AstrologersList type={'searched'} />
                    </>}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state.settings.isLoading,
    isRefreshing: state.settings.isRefreshing,
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(SearchAstrologer)