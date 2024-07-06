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

export const getLiveClass = payload => ({
    type: actionTypes.GET_LIVE_CLASS,
    payload
})

export const getWorkshop = payload => ({
    type: actionTypes.GET_WORKSHOP,
    payload
})

export const getTeachersList = payload => ({
    type: actionTypes.GET_TEACHERS_LIST,
    payload
})
