import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import Register from '../screens/auth/Register';
import SearchLocation from '../screens/locations/SearchLocation';
import DrawerRoutes from './DrawerRoutes';
import AstrologerDetails from '../screens/astrologers/AstrologerDetails';
import ImageGallary from '../screens/ImageGallary';
import ImageView from '../screens/ImageView';
import Profile from '../screens/customer/Profile';
import Wallet from '../screens/payments/Wallet';
import { ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import ECommerce from '../screens/eCommerce/ECommerce';
import Spell from '../screens/eCommerce/Spell';
import BookPooja from '../screens/eCommerce/BookPooja';
import Gemstone from '../screens/eCommerce/Gemstone';
import PoojaAstrologerList from '../screens/eCommerce/PoojaAstrologerList';
import PoojaDetails from '../screens/eCommerce/PoojaDetails';
import BookingDetails from '../screens/eCommerce/BookingDetails';
import SuccessfullyBooked from '../screens/eCommerce/SuccessfullyBooked';
import ProductDetails from '../screens/eCommerce/ProductDetails';
import Cart from '../screens/eCommerce/Cart';
import PersonalDetails from '../screens/eCommerce/PersonalDetails';
import ProductSuccessBooking from '../screens/eCommerce/ProductSuccessBooking';

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="otp" component={Otp} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="searchLocation" component={SearchLocation} />
            <Stack.Screen name='home' component={DrawerRoutes} />
            <Stack.Screen name='astrologerDetails' component={AstrologerDetails} />
            <Stack.Screen name='imageGallary' component={ImageGallary} />
            <Stack.Screen name='imageView' component={ImageView} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name='wallet' component={Wallet} />
            <Stack.Screen name="ZegoUIKitPrebuiltCallWaitingScreen" component={ZegoUIKitPrebuiltCallWaitingScreen} />
            <Stack.Screen name="ZegoUIKitPrebuiltCallInCallScreen" component={ZegoUIKitPrebuiltCallInCallScreen} />

            <Stack.Screen name="eCommerce" component={ECommerce} />
            <Stack.Screen name="spell" component={Spell} />
            <Stack.Screen name="bookPooja" component={BookPooja} />
            <Stack.Screen name="gemstone" component={Gemstone} />
            <Stack.Screen name="astrologerlist" component={PoojaAstrologerList} />
            <Stack.Screen name="poojadetails" component={PoojaDetails} />
            <Stack.Screen name="bookingdetails" component={BookingDetails} />
            <Stack.Screen name="successfulybooked" component={SuccessfullyBooked} />
            <Stack.Screen name="productdetails" component={ProductDetails} />
            <Stack.Screen name="cart" component={Cart} />
            <Stack.Screen name="personalDetails" component={PersonalDetails} />
            <Stack.Screen name="productSuccessBooking" component={ProductSuccessBooking} />

        </Stack.Navigator>
    )
}

export default StackRoutes