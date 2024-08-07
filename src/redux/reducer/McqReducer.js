import * as  actionTypes from '../actionTypes'

const initialState = {
    getMCQ: null,
    submittedMcq: null,
    successModal: null,
    attemptedMCQ: null
}

const Mcq = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.GET_MCQ:
            return {
                ...state,
                getMCQ: payload
            }
        case actionTypes.SUBMIT_MCQ:
            return {
                ...state,
                submittedMcq: payload
            }
        case actionTypes.SUCCESS_MCQ:
            return {
                ...state,
                successModal: payload
            }
        case actionTypes.ATTEMPTED_MCQ_TIMES:
            return {
                ...state,
                attemptedMCQ: payload
            }
        default:
            return state
    }
}

export default Mcq;
