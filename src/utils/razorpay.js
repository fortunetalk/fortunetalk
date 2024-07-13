import RazorpayCheckout from 'react-native-razorpay';
import { Colors } from '../assets/styles';
import { razorpay_key } from '../config/constants';


export const razorpayPayment = async ({ amount = 0, email = '', contact = '', name = '' }) => {
    try {

        // console.log(app_api_url + create_razorpay_order)

        // const orderResponse = await postRequest({
        //     url: app_api_url + create_razorpay_order,
        //     data: {
        //         amount
        //     }
        // })


        // if (!orderResponse?.status) {
        //     showToastMessage({ message: 'Payment Failed' })
        //     return
        // }

        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: razorpay_key, // Your api key
            // amount: orderResponse?.data?.amount,
            amount: amount*100,
            // order_id: orderResponse?.data?.id,
            name: name,
            prefill: {
                email: email,
                contact: contact,
                name: name
            },
            theme: { color: Colors.primaryLight }
        }

        const response = await RazorpayCheckout.open(options)
        // console.log('sdfsdf', response)
        return response
    } catch (e) {
        console.log('hii', e)
        return false
    }
} 