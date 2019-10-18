const initialState = { 
     projects: []
}
 
const projectReducer = (state = initialState, action) => {
     switch(action.type) {
          case 'CREATE_PROJECT':
               return {
                    projects: [ ...state.projects, action.formData ]
               }
          case 'GET_PROJECTS': 
               return {
                    projects: action.payload
               }
          default: 
          return state;
     }
}

 
export default projectReducer;
 
 