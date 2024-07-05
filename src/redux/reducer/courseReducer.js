import * as actionTypes from '../actionTypes'

const initialState = {
    courseBanner: null,
    courseList:null
}

const courses = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.GET_COURSE_BANNER: {
            return {
                ...state,
                courseBanner: payload
            }
        }
        case actionTypes.GET_COURSES_LIST: {
            return {
                ...state,
                courseList: payload
            }
        }
        default: {
            return state
        }
    }
}

export default courses