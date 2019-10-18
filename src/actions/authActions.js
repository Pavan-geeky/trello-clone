function createUserCollection(dispatch, getState, { getFirestore }, id, formData) {
    //creating user collection
        const firestore = getFirestore();
        firestore.collection('users').doc(id).set({ 
            ...formData,
            roles: ['developer']
        })
        .then(() => {
            console.log('user collection created!!!')
        }).catch(err => {
            console.log(err)
        })
}

//For signing in
export const createUser = (formData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
        .then((u) => {
            console.log(u.user.uid)
            console.log('SignUp success!!!')
            createUserCollection(dispatch, getState, { getFirestore }, u.user.uid, formData)
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch(err => {
            console.log(err.code)
        })
    }
}

//For logging in
export const signIn = (formData) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
            console.log('Login Success!!!')
        }).catch(err => {
            dispatch({ type: 'LOGIN_ERROR', err })
            console.log(err.code)
        })
    }
}

//For logout
export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
        .then(() => {
            console.log('Signout Success!!!')
            dispatch({ type: 'LOGOUT_SUCCESS' })
        }).catch(err => {
            console.log(err.code)
        })
    }
}
