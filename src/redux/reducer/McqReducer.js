import * as  actionTypes from '../actionTypes'

const initialState = {
    getMCQ: null,
}

const Mcq = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.GET_MCQ:
            return {
                ...state,
                getMCQ: payload
            }
        default:
            return state
    }
}

export default Mcq;
