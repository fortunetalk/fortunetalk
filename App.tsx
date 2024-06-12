import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import StackRoutes from './src/routes/StackRoutes';
import {setTopLevelNavigator} from './src/utils/navigationServices.js';
import Notifications from './src/utils/notifiactionManager.js';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const App = () => {
  useEffect(() => {
    Notifications.initialize();
  }, []);
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <PaperProvider>
        <NavigationContainer ref={ref => setTopLevelNavigator(ref)}>
          <ZegoCallInvitationDialog />
          <StackRoutes />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
