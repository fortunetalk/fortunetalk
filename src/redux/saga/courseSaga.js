import { call, put, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest, postRequest } from '../../utils/apiRequests'
import {
    app_api_url,
    book_demo_class,
    get_course_banner,
    get_course_list,
    get_demo_class_list,
    get_live_class_list,
    get_teachers_list,
    get_workshop_list,
    live_class_of_class
} from '../../config/constants'
import { showToastMessage } from '../../utils/services'

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

        const response = yield postRequest({
            url: app_api_url + book_demo_class,
            data: payload
        })

        if (response?.success) {
            yield call(showToastMessage, { message: response?.message })
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

export default function* coursesSaga() {
    yield takeLeading(actionTypes.GET_COURSE_BANNER, getCourseBanner)
    yield takeLeading(actionTypes.GET_COURSES_LIST, getCourseList)

    yield takeLeading(actionTypes.GET_DEMO_CLASS, getDemoClassList)
    yield takeLeading(actionTypes.GET_LIVE_CLASS, getLiveClassList)
    yield takeLeading(actionTypes.GET_WORKSHOP, getWorkshopsList)
    yield takeLeading(actionTypes.GET_TEACHERS_LIST, getTeachersList)

    yield takeLeading(actionTypes.BOOKED_DEMO_CLASS, bookDemoClass)
    yield takeLeading(actionTypes.LIVE_CLASS_OF_CLASS, liveClassofClass)
}