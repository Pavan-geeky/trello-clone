const initialState = { 
     users: [],
     isAdmin: []
}
 
const usersReducer = (state = initialState, action) => {
     switch(action.type) {
          case 'GET_USERS': 
               return {
                    users: [...action.payload]
               }
          case 'IS_ADMIN':
               return {
                    isAdmin: [action.payload]
               }
          default: 
          return state;
     }
}

 
export default usersReducer;
 
 