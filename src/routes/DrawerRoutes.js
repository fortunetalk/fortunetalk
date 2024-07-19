import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Colors, SCREEN_WIDTH, Sizes } from '../assets/styles';
import BottomTabs from './BottomTabs';
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => (
                <CustomDrawerContent
                    drawerProps={props}
                />
            )}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'left',
                drawerStyle: {
                    width: SCREEN_WIDTH * 0.85,
                    backgroundColor: Colors.grayLight,
                    elevation: 10,
                    shadowColor: Colors.blackLight,
                    borderTopRightRadius: Sizes.fixPadding * 2,
                    borderBottomRightRadius: Sizes.fixPadding * 2,
                },
            }}>
            <Drawer.Screen name="home2" component={BottomTabs} />
        </Drawer.Navigator>
    );
}

export default DrawerRoutes