import * as actionTypes from '../actionTypes'

const initialState = {
    isLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    locationData: null,
    tabVisible: true,
    homeSimmerVisible: false
}

const settings = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: payload
            }
        }
        case actionTypes.SET_IS_REFRECING: {
            return {
                ...state,
                isRefreshing: payload
            }
        }
        case actionTypes.SET_IS_LOADING_MORE: {
            return {
                ...state,
                isLoadingMore: payload
            }
        }
        case actionTypes.SET_LOCATION_DATA: {
            return {
                ...state,
                locationData: payload
            }
        }
        case actionTypes.SET_TAB_VISIBLE: {
            return {
                ...state,
                tabVisible: payload
            }
        }
        case actionTypes.SET_HOME_SIMMER_VISIBLE: {
            return {
                ...state,
                homeSimmerVisible: payload
            }
        }
        default: {
            return state
        }
    }
}

export default settings