import { View, Text, FlatList, Animated, LayoutAnimation } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '../../assets/styles'
import MyStatusBar from '../../components/MyStatusBar'
import HomeHeader from './components/HomeHeader'
import Search from './components/Search'
import HomeBanner from './components/HomeBanner'
import LiveAstrologers from './components/LiveAstrologers'
import FreeInsights from './components/FreeInsights'
import RemedySuggestions from './components/RemedySuggestions'
import OfferAstrologers from './components/OfferAstrologers'
import TrendingAstrologers from './components/TrendingAstrologers'
import OnlineAstrologers from './components/OnlineAstrologers'
import RecentAstrologers from './components/RecentAstrologers'
import LearningSections from './components/LearningSections'
import ECommerce from './components/ECommerce'
import LatestBlogs from './components/LatestBlogs'
import ClientTestimonials from './components/ClientTestimonials'
import { connect } from 'react-redux'
import * as SettingActions from '../../redux/actions/settingActions'

const Home = ({ dispatch, tabVisible }) => {
  // const [prevOffset, setPrevOffset] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

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
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <FlatList
          ListHeaderComponent={<>
            <Search />
            <HomeBanner />
            <LiveAstrologers />
            <FreeInsights />
            <RemedySuggestions />
            <OfferAstrologers />
            <TrendingAstrologers />
            <OnlineAstrologers />
            <RecentAstrologers />
            <LearningSections />
            <ECommerce />
            <LatestBlogs />
            <ClientTestimonials />
          </>}
          onScroll={onScroll}
        />
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  tabVisible: state.settings.tabVisible
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Home)