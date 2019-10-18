
// For creating new project
export const createProject = (formData, userId) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('projects').add({
               ...formData,
               users: [userId],
               tasks: [],
               createdAt: new Date()
          }).then(() => {
               dispatch({ type: 'CREATE_PROJECT', formData })
          }).catch(err => {
               console.log(err)
          })
     }
}

// For removing a project
export const deleteProject = (id) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('projects').doc(id).delete();
     }
}

//For getting projects
export const getProject = () => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          // let projects = []
          firestore.collection('projects').get().then((result) => {
               let projects =[]
               result.docs.forEach(doc => {
                    projects.push({ id: doc.id, name: doc.data().name, createdAt: doc.data().createdAt, createdBy: doc.data().createdBy, tasks: doc.data().tasks, users: doc.data().users })
               })
               // console.log(projects)
               dispatch({ type: 'GET_PROJECTS', payload:  projects})
          }).catch(err => {
               console.log(err)
          })
     }
}

// For adding a task
export const addTask = (newTask, id) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('projects').doc(id).get().then(data => {
               // console.log(data.data())
               let tasks = data.data().tasks;
               console.log(tasks)
               const AddTaskQuery = firestore.collection('projects').doc(id);
               AddTaskQuery.update({
                    tasks: [...tasks, newTask]
               }).then(() => {

               }).catch(err => {
                    
               })
          }).catch(err => {
               console.log(err)
          })
     }
}

//For adding a user
export const addUser = (userData, id) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('projects').doc(id).get().then(data => {
               // console.log(data.data())
               let users = data.data().users;
               // console.log(tasks)
               const AddUserQuery = firestore.collection('projects').doc(id);
               AddUserQuery.update({
                    users: [...users, userData]
               }).then(() => {

               }).catch(err => {
                    
               })
          }).catch(err => {
               console.log(err)
          })
     }
}

// For removing a user from a projects
export const removeUser = (userId, id) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('projects').doc(id).get().then(data => {
               // console.log(data.data())
               let users = data.data().users;
               // console.log(tasks)
               let updatedUsers = users.filter(user => {
                    return user.id !== userId
               })
               const RemoveUserQuery = firestore.collection('projects').doc(id);
               RemoveUserQuery.update({
                    users: updatedUsers
               }).then(() => {

               }).catch(err => {
                    
               })
          }).catch(err => {
               console.log(err)
          })
     }
}

//For removing a task
export const removeTask = (taskId, id) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('projects').doc(id).get().then(data => {
               let tasks = data.data().tasks;
               // console.log(tasks)
               let updatedTasks = tasks.filter(task => {
                    return task.id !== taskId
               })
               const RemoveTaskQuery = firestore.collection('projects').doc(id);
               RemoveTaskQuery.update({
                    tasks: updatedTasks
               }).then(() => {

               }).catch(err => {
                    
               })
          }).catch(err => {
               console.log(err)
          })
     }
}

//For editing task
export const editTask = (taskId, id, editedTask) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('projects').doc(id).get().then(data => {
               let tasks = data.data().tasks;
               // console.log('Old task', tasks)
               let editTask = tasks.filter(task => {
                    return task.id === taskId
               })
               console.log('Task - ', editTask[0]);
               let users = []
               // console.log(users.length)
               if(editTask[0].users.length === 0) {
                    // editTask.users[0] = editedTask.users[0]
                    users.push(editedTask.users[0])
                    // users = []
               } else {
                    // editTask.users.push(editedTask.users[0])
                    editTask[0].users.forEach(user => {
                         users.push(user)
                    })
                    users.push(editedTask.users[0])
               }
               // console.log(users)
               // users.push(editedTask.users[0])
               editedTask.users = users
               let e = editTask[0]
               // console.log('DATA - ', editedTask)
               // console.log('TASK - ', editTask)
               Object.assign(e, editedTask)
               console.log('New task - ', tasks)
               const EditTaskQuery = firestore.collection('projects').doc(id);
               EditTaskQuery.update({
                    tasks
               }).then(() => {

               }).catch(err => {
                    
               })
          }).catch(err => {
               console.log(err)
          })
     }
}

//For editing task status
export const editTaskStatus = (taskId, id, status) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          const firestore = getFirestore();
          firestore.collection('projects').doc(id).get().then(data => {
               let tasks = data.data().tasks;

               let editTask = tasks.filter(task => {
                    return task.id === taskId
               })
               let updatedtasks = tasks.filter(task => {
                    return task.id !== taskId
               })
               editTask[0].status = status

               console.log('Edit Task - ', editTask)
               updatedtasks.push(editTask[0])
               // Object.assign(tasks, editTask)
               console.log('Updated Task - ',updatedtasks)
               const EditTaskQuery = firestore.collection('projects').doc(id);
               EditTaskQuery.update({
                    tasks: updatedtasks
               }).then(() => {

               }).catch(err => {
                    
               })
          }).catch(err => {
               console.log(err)
          })
     }
}