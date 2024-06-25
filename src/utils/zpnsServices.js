import {ZPNs} from 'zego-zpns-react-native';

export const addZpnsListener = () => {
  ZPNs.getInstance().on('registered', function (message) {
    console.log(
      '[ZPNs] registered. pushID: ' +
        message.pushID +
        ', error: ' +
        message.errorCode,
    );
  });
  ZPNs.getInstance().on('notificationArrived', ()=>{
    console.log('notificationArrived');
  });
  console.log('registered')
};

// const zpns = ZPNs.getInstance();

// zpns.on('notificationArrived', console.log('hiii'));
