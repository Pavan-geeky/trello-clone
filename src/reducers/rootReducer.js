import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
     auth: authReducer,
     project: projectReducer,
     users: usersReducer,
     firestore: firestoreReducer,
     firebase: firebaseReducer
});

export default rootReducer
