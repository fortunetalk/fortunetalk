/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import messaging from '@react-native-firebase/messaging'
import { handleIncomingNotification } from './src/utils/notifiactionManager';
import notifee, { EventType } from '@notifee/react-native';
import { Linking } from 'react-native';
import ChatRequest from './src/screens/chat/ChatRequest';
import axios from 'axios';

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

const RNRedux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);

AppRegistry.registerComponent('custom', ()=>ChatRequest); 

messaging().setBackgroundMessageHandler(handleIncomingNotification);

notifee.registerForegroundService((notification) => {
  return new Promise(() => {
    console.log(notification)
  });
});

notifee.onForegroundEvent(async ({ type, detail }) => {
  try{
    console.log(detail.notification.data, 'details')
    if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'chat_accept') {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
      await notifee.cancelNotification(detail.notification.id);
      await axios.post('http://97.74.83.200:4000/api/app/chat/accept_chat', { chatId: detail.notification.data.historyId, type: 'customer' })
      Linking.openURL(`fortunetalk://chat/:${detail.notification.data.chatId}/:${detail.notification.data.historyId}`)
  
    } else if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'chat_reject') {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
      await notifee.cancelNotification(detail.notification.id);
      await axios.post('http://97.74.83.200:4000/api/app/chat/reject_chat', { chatId: detail.notification.data.historyId, type: 'customer' })
    }
  }catch(e){
    console.log(e)
  }
 
});

notifee.onBackgroundEvent(async ({ type, detail, headless }) => {
  try{
    console.log(detail.notification.data, 'details',)
    if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'chat_accept') {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
      await notifee.cancelNotification(detail.notification.id);
      await axios.post('http://97.74.83.200:4000/api/app/chat/accept_chat', { chatId: detail.notification.data.historyId, type: 'customer' })
      Linking.openURL(`fortunetalk://chat/:${detail.notification.data.chatId}/:${detail.notification.data.historyId}`)
  
    } else if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'chat_reject') {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
      await notifee.cancelNotification(detail.notification.id);
      await axios.post('http://97.74.83.200:4000/api/app/chat/reject_chat', { chatId: detail.notification.data.historyId, type: 'customer' })
    }
  }catch(e){
    console.log(e)
  }
  
});

