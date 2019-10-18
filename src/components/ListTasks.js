import React, { useState } from 'react'
import { removeTask, editTask, editTaskStatus } from '../actions/projectActions'
import { connect } from 'react-redux'
import EditTask from './EditTask'
import moment from 'moment'
import EditTaskStatus from './EditTaskStatus'

const ListTasks = (props) => {
     let tasks = [props.tasks]
     let [formOpen, setformOpen] = useState(0);
     let [statusFormOpen, setStatusFormOpen] = useState(0);
     let [taskId, setTaskId] = useState('');

     function handleToggle() {
          setformOpen(formOpen + 1)
     }

     function handleEditTask(formData) {
          // console.log(formData)
          let editedTask = {
               name: formData.name,
               startDate: formData.startDate,
               endDate: formData.endDate,
               status: formData.status,
               notes: formData.notes,
               users: formData.users
          }
          // console.log('TASK - ',taskId)
          // console.log('ID - ', id)
          props.editTask(taskId, props.id, editedTask);
     }

     function handleToggleForStatus() {
          setStatusFormOpen(statusFormOpen + 1) 
     }

     function handleEditTaskStatus(status) {
          props.editTaskStatus(taskId, props.id, status);
     }

     console.log('Users - ',props.users)
     console.log('Task - ', tasks)

     let getTaskUsers = []
     let refinedUser;
     if(tasks[0].users) {
          tasks[0].users.forEach(user => {
               refinedUser = props.users.find(u => {
                    return u.id === user.id
               })
               getTaskUsers.push(refinedUser)
          });
     }
     // console.log(getTaskUsers)
     return (
          tasks.map(task => {
               return (
                    <div>
                         {/* <div class="col s6"> */}
                              <div class="card blue lighten-1">
                                   <div class="card-content white-text">
                                        <span class="card-title" style={{fontSize: '28px'}}>{task.name} 
                                        {props.isAdmin ? 
                                             <a href="#!" onClick={() => {
                                                  // console.log(props.id)
                                                  props.removeTask(task.id, props.id);
                                                  }} style={{color: 'white'}}><i class="material-icons right">delete</i></a>
                                             :
                                             ''
                                        }

                                        <a href="#!" class="secondary-content" 
                                             onClick={() => {
                                                  // console.log('clicked edit')
                                                  setTaskId(task.id);
                                                  setformOpen(formOpen + 1)
                                             }}
                                        style={{color: 'white'}}><i class="material-icons">edit</i></a>
                                        </span> 
                                        <p>{task.notes}.</p>
                                        <br></br><br></br><br></br><br></br>

                                        <a href="#!" class="secondary-content white-text" onClick={() => {
                                             // console.log('Task-id', task.id)
                                             setTaskId(task.id);
                                             setStatusFormOpen(statusFormOpen + 1)
                                             // props.editTaskStatus(task.id, props.id, status);
                                        }}><i class="material-icons">mode_edit</i>{task.status}</a>

                                        {getTaskUsers.length > 0 ?
                                             getTaskUsers.map(user => {
                                                  return (
                                                       <span class="chip">
                                                            {user.name ? 
                                                                 user.name : 'Loading...'}
                                                            <i class="close material-icons">face</i>
                                                       </span>
                                                  )
                                             }): 
                                             <span className='chip'>No users <i class="close material-icons">mood_bad</i></span>
                                             }    
                                        <br></br>
                                   </div>
                                   <div class="card-action blue lighten-2">
                                        <p>Start date - {task.startDate} | End date - {task.endDate}</p>
                                   </div>
                                   <div className='card-action blue lighten-3'>
                                        <p>Created At - {moment(task.createdAt.toDate()).calendar()}</p>
                                   </div>
                              </div>

                         {/* </div> */}
                         
                         {/* Form modal to edit the task */}
                         {formOpen % 2 !== 0 ? 
                         <EditTask handleToggle={handleToggle} handleEditTask={handleEditTask} users={props.users} tasks={props.tasks} taskId={taskId}/>
                         : ''}

                         {/* Form modal to edit the task status */}
                         {statusFormOpen % 2 !== 0 ? 
                         <EditTaskStatus handleToggleForStatus={handleToggleForStatus} handleEditTaskStatus={handleEditTaskStatus} />
                         : ''}

                    </div>
               )
          })
     )
}


const mapDispatchToProps = dispatch => {
     return {
               removeTask: (taskId, id) => {
               dispatch(removeTask(taskId, id))
          },
               editTask: (taskId, id, editedTask) => {
               dispatch(editTask(taskId, id, editedTask))     
          }, 
               editTaskStatus: (taskId, id, status) => {
                    dispatch(editTaskStatus(taskId, id, status))
               }
     }
}

export default connect(null, mapDispatchToProps)(ListTasks)