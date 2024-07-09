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
import BookPooja from '../screens/eCommerce/BookPooja';
import PoojaAstrologerList from '../screens/eCommerce/PoojaAstrologerList';
import PoojaDetails from '../screens/eCommerce/PoojaDetails';
import BookingDetails from '../screens/eCommerce/BookingDetails';
import SuccessfullyBooked from '../screens/eCommerce/SuccessfullyBooked';
import ProductDetails from '../screens/eCommerce/ProductDetails';
import Cart from '../screens/eCommerce/Cart';
import PersonalDetails from '../screens/eCommerce/PersonalDetails';
import ProductSuccessBooking from '../screens/eCommerce/ProductSuccessBooking';
import ProductTracking from '../screens/eCommerce/ProductTracking';
import RateProduct from '../screens/eCommerce/RateProduct';
import Product from '../screens/eCommerce/Product';
import Payment from '../screens/payments/Payment';
import ChatScreen from '../screens/chat/ChatScreen';
import ViewProduct from '../screens/eCommerce/ViewProduct';
import ViewPooja from '../screens/eCommerce/ViewPooja';
import Learn from '../screens/courses/Learn';
import Courses from '../screens/courses/Courses';
import ClassDetails from '../screens/courses/demo/ClassDetails';
import ClassOverview from '../screens/courses/demo/ClassOverview';
import LiveScreen from '../screens/live/LiveScreen';
import OrderHistory from '../screens/history/OrderHistory';
import WalletHistory from '../screens/history/WalletHistory';
import ChatHistory from '../screens/history/ChatHistory';
import CallHistroy from '../screens/history/CallHistroy';
import LiveCallHistory from '../screens/history/LiveCallHistory';
import AstromallHistory from '../screens/history/AstromallHistory';
import RemedyHistory from '../screens/history/RemedyHistory';
import CoursesHistory from '../screens/history/CoursesHistory';
import MyCourses from '../screens/courses/live/MyCourses';
import CourseDetails from '../screens/courses/CourseDetails';
import WorkshopOverview from '../screens/courses/workshop/WorkshopOverview';
import WorkshopDetails from '../screens/courses/workshop/WorkshopDetails';

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

            <Stack.Screen name="viewProduct" component={ViewProduct} />
            <Stack.Screen name="viewPooja" component={ViewPooja} />

            <Stack.Screen name="bookPooja" component={BookPooja} />
            <Stack.Screen name="product" component={Product} />
            <Stack.Screen name="astrologerlist" component={PoojaAstrologerList} />
            <Stack.Screen name="poojadetails" component={PoojaDetails} />
            <Stack.Screen name="bookingdetails" component={BookingDetails} />
            <Stack.Screen name="successfulybooked" component={SuccessfullyBooked} />
            <Stack.Screen name="productdetails" component={ProductDetails} />
            <Stack.Screen name="cart" component={Cart} />
            <Stack.Screen name="personalDetails" component={PersonalDetails} />
            <Stack.Screen name="productSuccessBooking" component={ProductSuccessBooking} />
            <Stack.Screen name="productTracking" component={ProductTracking} />
            <Stack.Screen name="rateProduct" component={RateProduct} />
            <Stack.Screen name="mycourse" component={MyCourses} />
            <Stack.Screen name="workshopOverview" component={WorkshopOverview} />
            <Stack.Screen name="workshopDetails" component={WorkshopDetails} />


            <Stack.Screen name="payment" component={Payment} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="chatScreen" component={ChatScreen} />
            <Stack.Screen name="learn" component={Learn} />
            <Stack.Screen name="Courses" component={Courses} />
            <Stack.Screen name="courseDetails" component={CourseDetails} />
            <Stack.Screen name="classDetails" component={ClassDetails} />
            <Stack.Screen name="classOverview" component={ClassOverview} />
            <Stack.Screen name='liveScreen' component={LiveScreen} />
            <Stack.Screen name='orderHistory' component={OrderHistory} />
            <Stack.Group
            screenOptions={{animation: 'flip'}}
            >
                <Stack.Screen name='walletHistory' component={WalletHistory} />
                <Stack.Screen name='chatHistory' component={ChatHistory} />
                <Stack.Screen name='callHistroy' component={CallHistroy} />
                <Stack.Screen name='liveCallHistory' component={LiveCallHistory} />
                <Stack.Screen name='astromallHistory' component={AstromallHistory} />
                <Stack.Screen name='remedyHistory' component={RemedyHistory} /> 
                <Stack.Screen name='coursesHistory' component={CoursesHistory} /> 
            </Stack.Group>

        </Stack.Navigator>
    )
}

export default StackRoutes