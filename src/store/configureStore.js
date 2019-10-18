import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from '../config/fbConfig'
import rootReducer from '../reducers/rootReducer'

const configureStore = () => {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(
                thunk.withExtraArgument({getFirebase, getFirestore})
            ),
            reduxFirestore(fbConfig),
            reactReduxFirebase(fbConfig, { attachAuthIsReady: true })
        )
    )
    return store
}

export default configureStore