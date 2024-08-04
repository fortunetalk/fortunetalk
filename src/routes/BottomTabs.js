import { View, Text, Animated, Easing, Platform, UIManager } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LiveAstrologers from '../screens/astrologers/LiveAstrologers';
import ChatAstrologers from '../screens/astrologers/ChatAstrologers';
import Home from '../screens/home/Home';
import CallAstrologers from '../screens/astrologers/CallAstrologers';
import Learn from '../screens/courses/Learn';
import CustomBottomTab from './components/CustomBottomTab';
import { connect } from 'react-redux';

const Tab = createBottomTabNavigator();

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const BottomTabs = ({ tabVisible }) => {

    return (
        <Tab.Navigator
            initialRouteName={'home3'}
            backBehavior='history'
            tabBar={props => <View style={{  bottom: tabVisible ? 0 : -92, position: 'absolute' }}><CustomBottomTab {...props} /></View>}
            screenOptions={{tabBarStyle: {backgroundColor: 'red'}}}
        >
            <Tab.Group
                screenOptions={{ headerShown: false, headerShadowVisible: false }}>
                <Tab.Screen name="liveAstrologers" component={LiveAstrologers} options={{ tabBarLabel: 'Live', }} />
                <Tab.Screen name="chatAstrologers" component={ChatAstrologers} options={{ tabBarLabel: 'Chat' }} />
                <Tab.Screen name="home3" component={Home} options={{ tabBarLabel: 'Home' }} />
                <Tab.Screen name="callAstrologers" component={CallAstrologers} options={{ tabBarLabel: 'Call' }} />
                <Tab.Screen name="learn" component={Learn} options={{ tabBarLabel: 'Learn' }} />
            </Tab.Group>
        </Tab.Navigator>
    );
}

const mapStateToProps = state => ({
    tabVisible: state.settings.tabVisible
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabs)