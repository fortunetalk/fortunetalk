import { connect } from 'react-redux'
import Search from './components/Search'
import HomeHeader from './components/HomeHeader'
import HomeBanner from './components/HomeBanner'
import React, { useEffect, useRef } from 'react'
import FreeInsights from './components/FreeInsights'
import PoojaCategory from './components/PoojaCategory'
import {
  View,
  FlatList,
  Animated,
  LayoutAnimation,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import ActiveChat from './components/ActiveChat'
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
import { navigate } from '../../utils/navigationServices'
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../assets/styles'
import HomeSimmer from './components/HomeSimmer'

const Home = ({
  dispatch,
  tabVisible,
  courseBanner,
  workshopWithoutId,
  testimonials,
  blogs,
  allDemoClass,
  homeSimmerVisible
}) => {
  useEffect(() => {
    dispatch(CourseActions.getCourseBanner())
    dispatch(CourseActions.getWorkshopWithoutId())
    dispatch(CourseActions.getAllDemoClass())
    dispatch(CustomerAction.onCustomerblogs())
    dispatch(CustomerAction.onCustomerTestimonials())
    dispatch(SettingActions.getHomeData())
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

  // console.log("allDemoClass", allDemoClass)

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
      <View style={{ flex: 1 }}>
        <HomeHeader />
        <ActiveChat />
        <FlatList
          ListHeaderComponent={<>
            <Search />
            {
              homeSimmerVisible ?
                <HomeSimmer /> : <>
                  <HomeBanner />
                  <LiveAstrologers />
                  <FreeInsights />
                  {/* <RemedySuggestions /> */}
                  <OfferAstrologers />
                  <TrendingAstrologers />
                  <OnlineAstrologers />
                  <RecentAstrologers />
                  {learningBanner()}
                  {(workshopWithoutId && workshopWithoutId.length > 0) && <WorkshopClass />}
                  {(allDemoClass && allDemoClass.length > 0) && <LearningSections />}
                  <PoojaCategory />
                  <ProductCategory />
                  {blogs && latestBlogInfo()}
                  {testimonials && <ClientTestimonials />}
                </>
            }

          </>}
          onScroll={onScroll}
        />
      </View>
    </View>
  )


  function latestBlogInfo() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate('blogDetails', { blogData: item })}
          style={{
            borderColor: Colors.primaryLight,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowColor: Colors.black,
            backgroundColor: Colors.whiteDark,
            padding: Sizes.fixPadding * 0.5,
            marginBottom: Sizes.fixPadding * 1.5,
            marginLeft: Sizes.fixPadding * 1.5,
            borderRadius: Sizes.fixPadding,
            overflow: 'hidden',
            width: SCREEN_WIDTH * 0.6
          }}
        >
          <Image
            source={{ uri: item?.image }}
            style={{
              width: '100%',
              height: SCREEN_WIDTH * 0.3,
              borderTopLeftRadius: Sizes.fixPadding,
              borderTopRightRadius: Sizes.fixPadding,
            }}
          />
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.white18RobotBold,
              color: Colors.black,
              fontSize: 9,
              padding: Sizes.fixPadding * 0.5,
            }}
          >
            {item?.title}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.grayLight,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Sizes.fixPadding * 1.5,
            paddingVertical: Sizes.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.black16RobotoMedium }}>Latest Blogs</Text>
          <TouchableOpacity
            onPress={() => navigate('astrologyBlogs')}
          >
            <Text style={{ ...Fonts.primaryLight15RobotoRegular }}>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={blogs}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ paddingRight: Sizes.fixPadding * 1.5 }}
        />
      </View>
    );
  }

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
  testimonials: state.customer.testimonials,
  blogs: state.customer.blogs,
  allDemoClass: state.courses.allDemoClass,
  homeSimmerVisible: state.settings.homeSimmerVisible
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Home)

