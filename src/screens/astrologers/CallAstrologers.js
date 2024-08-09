import { connect } from 'react-redux'
import Banner from './components/Banner'
import Category from './components/Category'
import Loader from '../../components/Loader'
import { Colors } from '../../assets/styles'
import React, { useEffect, useRef } from 'react'
import MyStatusBar from '../../components/MyStatusBar'
import ChatCallHeader from './components/ChatCallHeader'
import AstrologersList from './components/AstrologersList'
import * as SettingActions from '../../redux/actions/settingActions'
import * as AstrologerActions from '../../redux/actions/astrologerActions'
import { View, FlatList, LayoutAnimation, Animated, RefreshControl } from 'react-native'

const CallAstrologers = ({ dispatch, tabVisible, isLoading, isRefreshing }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(AstrologerActions.getChatCallAstrologerList({ page: 1, type: 'call', remediesId: 'All' }))
  }, [dispatch])

  const onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > 0 && currentOffset > scrollY._value ? 'down' : 'up';
    scrollY.setValue(currentOffset);
    if (direction === 'down') {
      dispatch(SettingActions.setTabVisible(false))
      LayoutAnimation.configureNext({
        duration: 100,
        update: { type: 'linear', property: 'opacity' },
      });
    } else if (direction === 'up' && !tabVisible) {
      dispatch(SettingActions.setTabVisible(true))
      LayoutAnimation.configureNext({
        duration: 100,
        update: { type: 'linear', property: 'opacity' },
      });
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
      <Loader visible={isLoading} />
      <ChatCallHeader title={'Call'} />
      <Category type={'call'} />
      <View style={{ flex: 1 }}>
        <FlatList
          onScroll={onScroll}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => dispatch(AstrologerActions.getChatCallAstrologerList({ page: 1, type: 'call', remediesId: 'All' }))} />}
          ListHeaderComponent={<>
            <Banner type={'call'} />
            <AstrologersList type={'call'} />
          </>}
        />
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  tabVisible: state.settings.tabVisible,
  isLoading: state.settings.isLoading,
  isRefreshing: state.settings.isRefreshing,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CallAstrologers)