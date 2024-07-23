import notifee, { AndroidCategory, AndroidColor, AndroidImportance } from '@notifee/react-native';
import { showToastMessage } from './services';
import * as AstrologerActions from '../redux/actions/astrologerActions'
import { navigate } from './navigationServices';
import * as CallActions from '../redux/actions/callActions'

// Function to request notification permission
export async function initializeNotifications() {
    try {
        const permissions = await notifee.requestPermission();
        console.log('Notification permissions:', permissions);
    } catch (error) {
        console.log('Error requesting permission:', error);
    }
}

// Function to handle incoming notifications
export async function handleIncomingNotification(message, dispatch = null) {
    try {

        console.log('sdfjdskfhsdfdsf')
        console.log(message)
        const { data } = message;
        switch (data.type) {
            case 'CHAT_REQUEST':
                await displayChatNotification(data);
                break;
            case 'CALL_ENDED':
                dispatch(CallActions.getCallInovoiceData(data));
                break;
            case 'CHAT_REJECTED':
                showToastMessage({ message: 'Chat Request Failed' })
                if (dispatch) {
                    dispatch(AstrologerActions.setChatRequestModalData({ visible: false, data: null }))
                }
                break;

            case 'CHAT_ACCEPT':
                navigate('chatScreen', data)
                break;

            case 'CALL_ACCEPTED':
                await displayNotification(data);
                break;
            // Add more cases as needed
            default:
                break;
        }
    } catch (error) {
        console.log('Error handling notification:', error);
    }
}

// Function to display a chat notification
export async function displayChatNotification(data) {
    try {
        const channelId = await notifee.createChannel({
            id: 'chat_request',
            name: 'Chat Request',
            sound: 'chat_incoming',
            vibration: true,
            vibrationPattern: [300, 500],
            lights: true,
            lightColor: AndroidColor.RED,
            category: AndroidCategory.CALL,
            importance: AndroidImportance.HIGH,
        })

        await notifee.displayNotification({
            title: 'Chat Request',
            body: 'You have a new chat request.',
            data: data,
            android: {
                channelId: channelId,
                color: '#000000',
                smallIcon: 'ic_launcher', // Replace with your small icon name
                sound: 'chat_incoming',
                loopSound: true,
                timeoutAfter: 1000 * 30,
                autoCancel: false,
                vibrationPattern: [300, 500],
                lights: [AndroidColor.RED, 300, 600],
                ongoing: true,
                category: AndroidCategory.CALL,
                importance: AndroidImportance.HIGH,
                // largeIcon: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-png%2Favatar&psig=AOvVaw0dwmK3GzU3tNah8OjXMZ4y&ust=1718933316095000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjG896D6YYDFQAAAAAdAAAAABAE',
                actions: [
                    {
                        title: '<p style="color: #f44336;"><b>Reject</b> &#x1F6AB;</p>',
                        icon: 'https://my-cdn.com/icons/snooze.png',
                        pressAction: {
                            id: 'chat_reject',
                        },
                    },
                    {
                        title: '<p style="color: #2196F3;"><b>Accept</b> &#x1F4AC;</p>',
                        icon: 'https://my-cdn.com/icons/snooze.png',
                        pressAction: {
                            id: 'chat_accept',
                        },
                    }
                ],
                fullScreenAction: {
                    id: 'default',
                    launchActivity: 'com.fortunetalk.FullScreenActivity',
                },
                // asForegroundService: true,
            },
        });
    } catch (error) {
        console.log('Error displaying chat notification:', error);
    }
}

// Function to display a generic notification
export async function displayNotification(data) {
    try {
        const { name, message, token, type } = data;

        await notifee.displayNotification({
            title: name,
            body: message,
            data: { name, token, type },
        });
    } catch (error) {
        console.log('Error displaying notification:', error);
    }
}
