import { View, Text, LogBox, Platform, PermissionsAndroid } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import StackRoutes from './src/routes/StackRoutes.js';
import { setTopLevelNavigator } from './src/utils/navigationServices.js';
import { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallFloatingMinimizedView, } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import messaging from '@react-native-firebase/messaging'
import { handleIncomingNotification, initializeNotifications } from './src/utils/notifiactionManager.js';
import AstrologerRequest from './src/screens/astrologers/components/AstrologerRequest.js';
import { connect } from 'react-redux';
import socketServices from './src/utils/socket.js';
import ChatInvoice from './src/screens/chat/components/ChatInvoice.js';
import AstrologerRating from './src/screens/astrologers/components/AstrologerRating.js';
import WalletAlert from './src/screens/payments/components/WalletAlert.js';
import CallInvoice from './src/screens/call/components/CallInvoice.js';

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const App = ({ dispatch }) => {

  const getToken = async () => {
    const token = await messaging().getToken()
    console.log(token)
  }

  const onNotification = async (message) => {
    handleIncomingNotification(message, dispatch)
  }

  useEffect(() => {
    initializeNotifications()
    messaging().onMessage(onNotification);
    getToken()
    socketServices.initializeSocket(dispatch);
  }, []);

  const linking = {
    prefixes: ['fortunetalk://'],
    config: {
      screens: {
        chatScreen: {
          path: 'chat/:chatId/:historyId',
          parse: {
            chatId: (chatId) => `chat-${chatId}`,
            historyId: (historyId) => `${historyId}`, // Keep the leading colon
          },
          stringify: {
            chatId: (chatId) => chatId.replace(/^chat-/, ''),
            historyId: (historyId) => historyId.replace(/^:/, ''), // Remove the leading colon for URL
          },
        },
      },
    },
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer ref={ref => setTopLevelNavigator(ref)} linking={linking} fallback={<Text>...Loading</Text>} >
          <ZegoCallInvitationDialog />
          <StackRoutes />
          <ZegoUIKitPrebuiltCallFloatingMinimizedView />
        </NavigationContainer>
        <WalletAlert />
        <AstrologerRequest />
        <ChatInvoice />
        <CallInvoice />
        <AstrologerRating />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(App);
