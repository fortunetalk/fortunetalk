import * as actionTypes from '../actionTypes'

const initialState = {
    courseBanner: null,
    courseList: null,
    demoClass: null,
    liveClass: null,
    workshop: null,
    teachersList: null,
    liveClassOfClass:null,
    demoClassBooked:null,
    workshopWithoutId:null,
    allDemoClass:null,
    registerDemoclass:null,
    isRegisterForLive:null,
    singleDemoClass : null,
    singleLiveClass : null,
    currentLiveCourse:null,
    completedLiveCourse:null,
    registeredLiveClass: null
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
        case actionTypes.GET_TEACHERS_LIST: {
            return {
                ...state,
                teachersList: payload
            }
        }
        case actionTypes.LIVE_CLASS_OF_CLASS: {
            return {
                ...state,
                liveClassOfClass: payload
            }
        }
        case actionTypes.CHECK_CUSTOMER_DEMO_CLASS_BOOKED: {
            return {
                ...state,
                demoClassBooked: payload
            }
        }
        case actionTypes.GET_WORKSHOP_WITHOUT_ID: {
            return {
                ...state,
                workshopWithoutId: payload
            }
        }
        case actionTypes.GET_ALL_DEMO_CLASSS: {
            return {
                ...state,
                allDemoClass: payload
            }
        }
        case actionTypes.BOOKED_DEMO_CLASS: {
            return {
                ...state,
                registerDemoclass: payload
            }
        }
        case actionTypes.IS_REGISTER_FOR_LIVE_CLASS: {
            return {
                ...state,
                isRegisterForLive: payload
            }
        }
        case actionTypes.GET_SINGLE_DEMO_CLASS: {
            return {
                ...state,
                singleDemoClass: payload
            }
        }
        case actionTypes.GET_SINGLE_LIVE_CLASS: {
            return {
                ...state,
                singleLiveClass: payload
            }
        }
        case actionTypes.GET_CURRENT_LIVE_COURSE_HISTORY: {
            return {
                ...state,
                currentLiveCourse: payload
            }
        }
        case actionTypes.GET_COMPLETED_LIVE_COURSE_HISTORY: {
            return {
                ...state,
                completedLiveCourse: payload
            }
        }
        case actionTypes.GET_REGISTERED_LIVE_CLASS: {
            return {
                ...state,
                registeredLiveClass: payload
            }
        }
        default: {
            return state
        }
    }
}

export default courses