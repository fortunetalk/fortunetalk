import * as actionTypes from '../actionTypes';

const initialState = {
    rechargePlanData: null,
}

const payment = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_WALLET_RECHARGE_PLANS:
            return {
                ...state,
                rechargePlanData: payload
            }
        default:
            return state
    }

}

export default payment;
