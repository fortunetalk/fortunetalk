import { zego_call_app_id, zego_call_app_sign } from '../config/constants';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  GROUP_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  ZegoInvitationType,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { ZegoLayoutMode } from '@zegocloud/zego-uikit-rn'
import { View } from 'react-native';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../assets/styles';
import MyForegroundView from '../screens/call/components/MyForegroundView';
import { navigate, resetToScreen } from './navigationServices';

export const onUserLogin = async (userID, userName) => {
  return ZegoUIKitPrebuiltCallService.init(
    zego_call_app_id, // You can get it from ZEGOCLOUD's console
    zego_call_app_sign, // You can get it from ZEGOCLOUD's console
    userID, // It can be any valid characters, but we recommend using a phone number.
    userName,
    [ZIM, ZPNs],
    {
      ringtoneConfig: {
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      },
      requireConfig: data => {
        console.log(data)
        let numbersBeforeFortunetalk = data?.callID?.match(/^\d+(?=fortunetalk)/i);
        return {
          ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          durationConfig: {
            isVisible: true,
            onDurationUpdate: duration => {
              // dispatch(CallActions.setCallTimer(duration))
              if (duration == numbersBeforeFortunetalk[0]) {
                ZegoUIKitPrebuiltCallService.hangUp();
              }
            },
          },

          foregroundBuilder: () => {
            return (<MyForegroundView />);
          },
          layout: {
            mode: ZegoLayoutMode.pictureInPicture,
            config: {
              smallViewBackgroundColor: Colors.primaryLight,
              largeViewBackgroundColor: Colors.black,
              smallViewBackgroundImage: "your_server_image_url",
              largeViewBackgroundImage: "http://97.74.83.200:4000/uploads/customerApp/call_backgroud.png",
            }
          },
          onWindowMinimized: () => {
            resetToScreen('home');
          },
          onWindowMaximized: () => {
            // Navigate to the ZegoUIKitPrebuiltCallInCallScreen, but be sure to cannot include any parameters of the page.
            navigate('ZegoUIKitPrebuiltCallInCallScreen');
          },
          topMenuBarConfig: {
            buttons: [
              ZegoMenuBarButtonName.minimizingButton,
            ],
          },
        };
      },
      notifyWhenAppRunningInBackgroundOrQuit: true,
      isIOSSandboxEnvironment: true,
      androidNotificationConfig: {
        channelID: 'ZegoUIKit',
        channelName: 'ZegoUIKit',
      },
    },
  ).then(() => {
    ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
      message: 'We need your consent for the following permissions in order to use the offline call function properly',
      allow: 'Allow',
      deny: 'Deny',
    });
  });
};

export const sendCallInvitation = ({ navigation, callTo, customData }) => {
  try {
    ZegoUIKitPrebuiltCallService.sendCallInvitation(callTo, false, navigation, {
      resourceID: 'fortunetalk_call',
      timeout: 10,
      callID: customData,
      notificationTitle: 'Title',
      notificationMessage: 'Message',
      customData
    });
  } catch (e) {
    console.log(e);
  }
};

export const onUserLogout = async () => {
  return ZegoUIKitPrebuiltCallService.uninit();
};
