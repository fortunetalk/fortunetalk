import * as actionTypes from "../actionTypes"

export const getCourseBanner = payload => ({
    type: actionTypes.GET_COURSE_BANNER,
    payload
})

export const getCourseList = payload => ({
    type: actionTypes.GET_COURSES_LIST,
    payload
})
