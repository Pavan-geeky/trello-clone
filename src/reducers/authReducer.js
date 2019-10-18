const initialState = { 
    error: null
}
 
const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR': 
            return {
                ...state, 
                error: action.err.code
            }
        case 'LOGIN_SUCCESS': 
            return {
                ...state,
                error: null
            }
        case 'LOGOUT_SUCCESS':
            return state
        default: 
            return state
    }
}

export default authReducer;
 
 