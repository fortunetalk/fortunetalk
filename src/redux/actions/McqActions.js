import * as actionTypes from "../actionTypes"

export const onGetMCQ = (payload) => ({
    type: actionTypes.GET_MCQ,
    payload
})

export const onSubmitMCQ = (payload) => ({
    type: actionTypes.SUBMIT_MCQ,
    payload
})

export const onAttemptedTimesMCQc= (payload) => ({
    type: actionTypes.ATTEMPTED_MCQ_TIMES,
    payload
})


