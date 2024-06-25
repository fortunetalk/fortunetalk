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

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <RNRedux />;
}

const RNRedux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);

messaging().setBackgroundMessageHandler(handleIncomingNotification);

notifee.registerForegroundService((notification) => {
  return new Promise(() => {
    console.log(notification)
  });
});

notifee.onForegroundEvent(async ({ type, detail }) => {
  console.log(detail.notification.id)
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'chat_accept') {
    console.log('User pressed an action with the id: ', detail.pressAction.id);
    Linking.openURL('fortunetalk://chat/:dsfsfsdfsdfs/:sdfsfsdf')
    await notifee.cancelNotification(detail.notification.id);
  } else if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'chat_reject') {
    console.log('User pressed an action with the id: ', detail.pressAction.id);
    await notifee.cancelNotification(detail.notification.id);
  }
});


notifee.onBackgroundEvent(async ({ type, detail, headless }) => {
  const { notification, pressAction } = detail;
  if (type === EventType.ACTION_PRESS && pressAction.id === 'chat_accept') {
    Linking.openURL('fortunetalk://chat/:dsfsfsdfsdfs/:sdfsfsdf')
    await notifee.cancelNotification(notification.id);
  } else if (type === EventType.ACTION_PRESS && pressAction.id === 'chat_reject') {
    await notifee.cancelNotification(notification.id);
  }
});

