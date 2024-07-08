import * as actionTypes from '../actionTypes'

const initialState = {
    courseBanner: null,
    courseList: null,
    demoClass: null,
    liveClass: null,
    workshop: null,
    teachersList: null
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
        case actionTypes.GET_DEMO_CLASS: {
            return {
                ...state,
                demoClass: payload
            }
        }
        case actionTypes.GET_LIVE_CLASS: {
            return {
                ...state,
                liveClass: payload
            }
        }
        case actionTypes.GET_WORKSHOP: {
            return {
                ...state,
                workshop: payload
            }
        }
        case actionTypes.GET_TEACHERS_LIST: {
            return {
                ...state,
                teachersList: payload
            }
        }
        default: {
            return state
        }
    }
}

export default courses