import { zego_call_app_id, zego_call_app_sign } from '../config/constants';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  GROUP_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

export const onUserLogin = async (userID, userName, props) => {
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
        const callConfig =
          data.invitees.length > 1
            ? ZegoInvitationType.videoCall === data.type
              ? GROUP_VIDEO_CALL_CONFIG
              : GROUP_VOICE_CALL_CONFIG
            : ZegoInvitationType.videoCall === data.type
              ? ONE_ON_ONE_VIDEO_CALL_CONFIG
              : ONE_ON_ONE_VOICE_CALL_CONFIG;
        return callConfig;
      },
      androidNotificationConfig: {
        channelID: 'ZegoUIKit',
        channelName: 'ZegoUIKit',
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

export const sendCallInvitation = ({ navigation, callTo }) => {
  try {
    ZegoUIKitPrebuiltCallService.sendCallInvitation(callTo, false, navigation, {
      resourceID: 'fortunetalk_call',
      timeout: 60,
      callID: '123456789',
      notificationTitle: 'Title',
      notificationMessage: 'Message',
      customData: '',
    });
  } catch (e) {
    console.log(e);
  }
};

export const onUserLogout = async () => {
  return ZegoUIKitPrebuiltCallService.uninit();
};
