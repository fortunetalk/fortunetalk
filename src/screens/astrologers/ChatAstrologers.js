import { View, Text, FlatList, LayoutAnimation, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Colors } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import ChatCallHeader from './components/ChatCallHeader'
import Category from './components/Category'
import Banner from './components/Banner'
import AstrologersList from './components/AstrologersList'
import * as SettingActions from '../../redux/actions/settingActions'
import { connect } from 'react-redux'
import Filters from './components/Filters'
import * as AstrologerActions from '../../redux/actions/astrologerActions'
import Loader from '../../components/Loader'

const ChatAstrologers = ({ dispatch, tabVisible, isLoading, }) => {
  const scrollY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    dispatch(AstrologerActions.getChatCallAstrologerList({ type: 'chat' }))
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
      <ChatCallHeader title={'Chat'} />
      <Category />
      <View style={{ flex: 1 }}>
        <FlatList
          onScroll={onScroll}
          ListHeaderComponent={<>
            <Banner />
            <AstrologersList type={'chat'} />
          </>}
        />
      </View>
      {/* <Filters /> */}
    </View>
  )

}

const mapStateToProps = state => ({
  tabVisible: state.settings.tabVisible,
  isLoading: state.settings.isLoading,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatAstrologers)