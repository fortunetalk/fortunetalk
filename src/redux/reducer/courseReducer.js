import * as actionTypes from '../actionTypes'

const initialState = {
    courseBanner: null,
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
        default: {
            return state
        }
    }
}

export default courses