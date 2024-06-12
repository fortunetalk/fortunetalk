import notifee from '@notifee/react-native';

class Notifications {
    static initialize = async () => {
        const permissions = await notifee.requestPermission()
        console.log(permissions)
    }
}

export default Notifications