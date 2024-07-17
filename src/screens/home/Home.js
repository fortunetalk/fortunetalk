import { connect } from 'react-redux'
import Search from './components/Search'
import { Colors } from '../../assets/styles'
import HomeHeader from './components/HomeHeader'
import HomeBanner from './components/HomeBanner'
import React, { useEffect, useRef } from 'react'
import LatestBlogs from './components/LatestBlogs'
import FreeInsights from './components/FreeInsights'
import PoojaCategory from './components/PoojaCategory'
import {
  View,
  FlatList,
  Animated,
  LayoutAnimation,
  SafeAreaView
} from 'react-native'
import MyStatusBar from '../../components/MyStatusBar'
import LiveAstrologers from './components/LiveAstrologers'
import RemedySuggestions from './components/RemedySuggestions'
import OfferAstrologers from './components/OfferAstrologers'
import TrendingAstrologers from './components/TrendingAstrologers'
import OnlineAstrologers from './components/OnlineAstrologers'
import RecentAstrologers from './components/RecentAstrologers'
import LearningSections from './components/LearningSections'
import ClientTestimonials from './components/ClientTestimonials'
import * as SettingActions from '../../redux/actions/settingActions'
import CustomCrousel from '../../components/CustomCrousel'
import ProductCategory from './components/ProductCategory'
import * as CourseActions from '../../redux/actions/courseActions'
import * as CustomerAction from '../../redux/actions/authActions'
import WorkshopClass from './components/WorkshopClass'

const Home = ({
  dispatch,
  tabVisible,
  courseBanner,
  workshopWithoutId
}) => {

  useEffect(() => {
    dispatch(CourseActions.getCourseBanner())
    dispatch(CourseActions.getWorkshopWithoutId())
    dispatch(CourseActions.getAllDemoClass())
    dispatch(CustomerAction.onCustomerblogs())
    dispatch(CustomerAction.onCustomerTestimonials())
  }, [])

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
            {learningBanner()}
            {
              (workshopWithoutId && workshopWithoutId.length > 0) &&
              <WorkshopClass />
            }
            <LearningSections />
            <PoojaCategory />
            <ProductCategory />
            <LatestBlogs />
            <ClientTestimonials />
          </>}
          onScroll={onScroll}
        />
      </View>
    </View>
  )

  function learningBanner() {
    return (
      <SafeAreaView edges={['bottom']} style={{
        flex: 1,
        borderBottomColor: Colors.grayLight,
        borderBottomWidth: 1,
      }}>
        {courseBanner && <CustomCrousel data={courseBanner} />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  tabVisible: state.settings.tabVisible,
  courseBanner: state.courses.courseBanner,
  workshopWithoutId: state.courses.workshopWithoutId
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Home)