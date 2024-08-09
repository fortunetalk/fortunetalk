import * as actionTypes from '../actionTypes'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { getRequest, postRequest } from '../../utils/apiRequests'
import {
    app_api_url,
    book_demo_class,
    check_customer_demo_class_booked,
    get_all_demo_class,
    get_completed_live_courses,
    get_course_banner,
    get_course_list,
    get_current_live_courses,
    get_demo_class_list,
    get_live_class_list,
    get_registered_live_class,
    get_single_demo_class_by_id,
    get_single_live_class_by_id,
    get_teachers_list,
    get_workshop_list,
    get_workshop_list_without_id,
    is_registered_for_live_class,
    live_class_of_class,
    live_course_payment,
    register_for_live_class
} from '../../config/constants'
import { showToastMessage } from '../../utils/services'
import { navigate } from '../../utils/navigationServices'
import { razorpayPayment } from '../../utils/razorpay'

function* getCourseBanner() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_course_banner,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_COURSE_BANNER, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getCourseList() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_course_list,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_COURSES_LIST, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getLiveClassList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions


        const response = yield postRequest({
            url: app_api_url + get_live_class_list,
            data: payload
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_LIVE_CLASS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getDemoClassList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        const response = yield postRequest({
            url: app_api_url + get_demo_class_list,
            data: payload
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_DEMO_CLASS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getWorkshopsList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        const response = yield postRequest({
            url: app_api_url + get_workshop_list,
            data: payload
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_WORKSHOP, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getWorkshopsListWithoutId() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_workshop_list_without_id,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_WORKSHOP_WITHOUT_ID, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getTeachersList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        const response = yield postRequest({
            url: app_api_url + get_teachers_list,
            data: payload
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_TEACHERS_LIST, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* bookDemoClass(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        console.log("payload  =====>>>>", payload)

        const response = yield postRequest({
            url: app_api_url + book_demo_class,
            data: {
                customerName: payload.customerName,
                mobileNumber: payload.mobileNumber,
                astrologerId: payload.astrologerId,
                demoClassId: payload.demoClassId,
                courseId: payload.courseId,
                customerId: payload.customerId,
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.BOOKED_DEMO_CLASS, payload: response?.data })
            yield call(showToastMessage, { message: "Class Registered Successfully" })
            navigate(payload.navigateUrl, {
                id: response?.data?.demoClassId,
                title: "Demo",
                isRegister: false
            })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getSingleDemoClass(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        // console.log("url: app_api_url + get_single_demo_class_by_id,", { url: app_api_url + get_single_demo_class_by_id, })

        const response = yield postRequest({
            url: app_api_url + get_single_demo_class_by_id,
            data: payload
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_SINGLE_DEMO_CLASS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getSingleLiveClass(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        // console.log("url: app_api_url + get_single_demo_class_by_id,", { url: app_api_url + get_single_demo_class_by_id, })

        const response = yield postRequest({
            url: app_api_url + get_single_live_class_by_id,
            data: payload
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_SINGLE_LIVE_CLASS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* liveClassofClass(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        // console.log("liveClassofClass ====>>>>", payload)

        const response = yield postRequest({
            url: app_api_url + live_class_of_class,
            data: payload
        })

        if (response?.success) {
            yield put({ type: actionTypes.LIVE_CLASS_OF_CLASS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}


function* IsDemoClassBooked(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        const response = yield postRequest({
            url: app_api_url + check_customer_demo_class_booked,
            data: payload
        })

        if (response?.success) {
            yield put({ type: actionTypes.CHECK_CUSTOMER_DEMO_CLASS_BOOKED, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* allDemoClass() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_all_demo_class,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_ALL_DEMO_CLASSS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* registerLiveClass(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const { payload } = actions

        const rayzorPayResponse = yield razorpayPayment({
            amount: payload?.amount,
            email: customerData?.email,
            contact: payload?.mobileNumber,
            name: payload?.customerName
        })

        // console.log("rayzorPayResponse  ====>>>", rayzorPayResponse)

        if (rayzorPayResponse) {
            const response = yield postRequest({
                url: app_api_url + register_for_live_class,
                data: payload
            })

            // console.log("resp dmd registerLiveClass", response?.data)

            if (response?.success) {
                yield put({ type: actionTypes.REGISTER_FOR_LIVE_CLASS, payload: response?.data })
                yield call(showToastMessage, { message: "Class Registered Successfully" })
                navigate("liveclassdetails", {
                    id: response?.data?.liveClassId,
                    title: "Live"
                })
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* IsRegisterForLiveClass(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        const response = yield postRequest({
            url: app_api_url + is_registered_for_live_class,
            data: payload
        })
        if (response?.success) {
            yield put({ type: actionTypes.IS_REGISTER_FOR_LIVE_CLASS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* onLiveCoursePayment(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const { payload } = actions

        const rayzorPayResponse = yield razorpayPayment({
            amount: parseInt(payload?.amount),
            email: customerData?.email,
            name: customerData?.customerName,
            contact: customerData?.phoneNumber
        })

        // console.log("rayzorPayResponse  ====>>>", rayzorPayResponse)

        if (rayzorPayResponse) {
            const response = yield postRequest({
                url: app_api_url + live_course_payment,
                data: {
                    customerId: customerData?._id,
                    liveId: payload.liveClassId,
                    amount: parseInt(payload?.amount),
                    isPartial: payload?.isPartial,
                    isCompleted: false,
                    paymentType: payload?.type
                }
            })

            if (response?.success) {
                yield call(showToastMessage, { message: "Payment Successfull" })
                navigate("mycourse")
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getCurrentLiveCourse() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: app_api_url + get_current_live_courses,
            data: {
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_CURRENT_LIVE_COURSE_HISTORY, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getCompletedLiveCourse() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: app_api_url + get_completed_live_courses,
            data: {
                customerId: customerData?._id
            }
        })

        console.log("getCompletedLiveCourse ==========>>>>>>>", response)

        if (response?.success) {
            yield put({ type: actionTypes.GET_COMPLETED_LIVE_COURSE_HISTORY, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getRegisterdLiveClass(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const { payload } = actions

        // console.log("payload  ====>>" , payload)

        const response = yield postRequest({
            url: app_api_url + get_registered_live_class,
            data: {
                customerId: customerData?._id,
                liveClassId: payload.liveClassId,
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_REGISTERED_LIVE_CLASS, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}


export default function* coursesSaga() {
    yield takeLeading(actionTypes.GET_COURSE_BANNER, getCourseBanner)
    yield takeLeading(actionTypes.GET_COURSES_LIST, getCourseList)

    yield takeLeading(actionTypes.GET_DEMO_CLASS, getDemoClassList)
    yield takeLeading(actionTypes.GET_LIVE_CLASS, getLiveClassList)
    yield takeLeading(actionTypes.GET_WORKSHOP, getWorkshopsList)
    yield takeLeading(actionTypes.GET_TEACHERS_LIST, getTeachersList)

    yield takeLeading(actionTypes.BOOKED_DEMO_CLASS, bookDemoClass)
    yield takeLeading(actionTypes.GET_SINGLE_DEMO_CLASS, getSingleDemoClass)

    yield takeLeading(actionTypes.LIVE_CLASS_OF_CLASS, liveClassofClass)
    yield takeLeading(actionTypes.CHECK_CUSTOMER_DEMO_CLASS_BOOKED, IsDemoClassBooked)

    yield takeLeading(actionTypes.GET_WORKSHOP_WITHOUT_ID, getWorkshopsListWithoutId)
    yield takeLeading(actionTypes.GET_ALL_DEMO_CLASSS, allDemoClass)

    yield takeLeading(actionTypes.REGISTER_FOR_LIVE_CLASS, registerLiveClass)
    yield takeLeading(actionTypes.IS_REGISTER_FOR_LIVE_CLASS, IsRegisterForLiveClass)
    yield takeLeading(actionTypes.GET_SINGLE_LIVE_CLASS, getSingleLiveClass)

    yield takeLeading(actionTypes.LIVE_COURSE_PAYMENT, onLiveCoursePayment)
    yield takeLeading(actionTypes.GET_CURRENT_LIVE_COURSE_HISTORY, getCurrentLiveCourse)
    yield takeLeading(actionTypes.GET_COMPLETED_LIVE_COURSE_HISTORY, getCompletedLiveCourse)

    yield takeLeading(actionTypes.GET_REGISTERED_LIVE_CLASS, getRegisterdLiveClass)

}