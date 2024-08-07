import { View, Text, TouchableOpacity, Linking, BackHandler, ImageBackground, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import notifee from '@notifee/react-native';
import axios from 'axios';
import { Colors, Fonts, SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../../components/MyStatusBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { base_url } from '../../config/constants';

const ChatRequest = () => {
  const [notificationData, setNotificationData] = useState(null)
  let timeout;
  
  useEffect(() => {
    getNotificationData()
    timeout = setTimeout(async () => {
      BackHandler.exitApp()
      await notifee.cancelDisplayedNotification()
    }, 30 * 1000)
    return () => clearTimeout(timeout)
  }, [])

  const getNotificationData = async () => {
    try {
      const notification = await notifee.getDisplayedNotifications()
      if (notification) {
        console.log(notification[0].notification.id)
        setNotificationData(notification[0])
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onAccept = async () => {
    try {
      await notifee.cancelNotification(notificationData?.notification?.id);
      await axios.post('http://97.74.83.200:4000/api/app/chat/accept_chat', { chatId: notificationData?.notification?.data?.historyId, type: 'customer' })
      BackHandler.exitApp()
      Linking.openURL(`fortunetalk://chat/:${notificationData?.notification?.data?.chatId}/:${notificationData?.notification?.data?.historyId}`)
    } catch (e) {
      console.log(e)
    }
  }

  const onReject = async () => {
    try {
      await notifee.cancelNotification(notificationData?.notification?.id);
      await axios.post('http://97.74.83.200:4000/api/app/chat/reject_chat', { chatId: notificationData?.notification?.data?.historyId, type: 'customer' })
      BackHandler.exitApp()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primaryDark]}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={{ uri: notificationData?.notification?.data?.image }}
          style={{ width: SCREEN_WIDTH * 0.4, height: SCREEN_WIDTH * 0.4, borderRadius: 10000 }}
        />
        <Text style={{ ...Fonts._18RobotoMedium, color: Colors.white }}>{notificationData?.notification?.data?.astrologerName}</Text>
        <Text style={{ ...Fonts._13RobotoMedium, color: Colors.white, marginVertical: Sizes.fixPadding * 2.5 }}>Please accept Chat Request</Text>
        <Image
          source={require('../../assets/icons/logo.png')}
          style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3, borderRadius: 10000 }}
        />
        <Text style={{ ...Fonts._18RobotoMedium, color: Colors.white }}>FortuneTalk</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => onAccept()} style={{ backgroundColor: Colors.green_a, paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding * 3, borderRadius: 1000, elevation: 5, marginTop: Sizes.fixPadding * 3 }}><Text style={{ ...Fonts._18RobotoMedium, color: Colors.white }}>Start Chat</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => onReject()} style={{ backgroundColor: Colors.red_a, paddingVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding * 3, borderRadius: 1000, elevation: 5, marginTop: Sizes.fixPadding * 2 }}><Text style={{ ...Fonts._18RobotoMedium, color: Colors.white }}>Reject Chat</Text></TouchableOpacity>
      </LinearGradient>
    </SafeAreaProvider>
  )
}

export default ChatRequest