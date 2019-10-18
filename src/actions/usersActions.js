// For getting users
export const getUsers = () => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('users').get().then((result) => {
               let users =[]
               result.docs.forEach(doc => {
                    users.push({ id: doc.id, name: doc.data().name, email: doc.data().email, roles: doc.data().roles })
               })
               // console.log(users)
               dispatch({ type: 'GET_USERS', payload:  users})
          }).catch(err => {
               console.log(err)
          })
     }
}

// For finding is admin
export const isAdmin = (id) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('users').doc(id).get().then(result => {
               // console.log(result.data())
               let rolesArr = result.data().roles
               // console.log(resultArr)
               let isAdmin = rolesArr.includes('admin')
               // console.log(isAdmin)
               dispatch({ type: 'IS_ADMIN', payload: isAdmin })
          }).catch(err => {
               console.log(err)
          })
     }
}