import * as actionTypes from '../actionTypes'

const initialState = {
    homeTopBannerData: null,
}

const banners = (state = initialState, actions) =>{
    const { type, payload } = actions
    switch(type){
        case actionTypes.SET_HOME_TOP_BANNER:
            return {
               ...state,
                homeTopBannerData: payload
            }
        default:
            return state
    }
 
}

export default banners;