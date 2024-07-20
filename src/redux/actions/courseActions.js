import * as actionTypes from "../actionTypes"

export const getCourseBanner = payload => ({
    type: actionTypes.GET_COURSE_BANNER,
    payload
})

export const getCourseList = payload => ({
    type: actionTypes.GET_COURSES_LIST,
    payload
})

export const getDemoClass = payload => ({
    type: actionTypes.GET_DEMO_CLASS,
    payload
})

export const getAllDemoClass = payload => ({
    type: actionTypes.GET_ALL_DEMO_CLASSS,
    payload
})

export const getLiveClass = payload => ({
    type: actionTypes.GET_LIVE_CLASS,
    payload
})

export const getWorkshop = payload => ({
    type: actionTypes.GET_WORKSHOP,
    payload
})

export const getWorkshopWithoutId = payload => ({
    type: actionTypes.GET_WORKSHOP_WITHOUT_ID,
    payload
})

export const getTeachersList = payload => ({
    type: actionTypes.GET_TEACHERS_LIST,
    payload
})

export const bookdemoClass = payload => ({
    type: actionTypes.BOOKED_DEMO_CLASS,
    payload
})

export const liveClassOfClass = payload => ({
    type: actionTypes.LIVE_CLASS_OF_CLASS,
    payload
})

export const demoClassBooked = payload => ({
    type: actionTypes.CHECK_CUSTOMER_DEMO_CLASS_BOOKED,
    payload
})




