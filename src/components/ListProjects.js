import React, { useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { deleteProject, addTask } from '../actions/projectActions'
import AddTask from './AddTask'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ListProjects = (props)=> {
     let [formOpen, setformOpen] = useState(0);
     const { project } = props
     // console.log(project)

     function handleToggle() {
          setformOpen(formOpen + 1)
     }

     function handleAddTask(formData) {
          // console.log(formData)
          const taskData = {
               id: formData.id,
               name: formData.taskName,
               startDate: formData.startDate,
               endDate: formData.endDate,
               status: formData.status,
               notes: formData.notes,
               createdAt: formData.createdAt,
               users: formData.users
          }
          // console.log(taskData)
          props.addTask(taskData, project.id)
     }
     // console.log(props.isAdmin)
     // console.log(props.darkMode)

     // let color = ''

     return ( 
          <div className='col s6'>
               <div className="card blue lighten-1">
                    <div className="card-content white-text">
                         <span className="card-title" ><Link to={`/project/${project.id}`} style={{color: 'white'}}>{project.name}</Link> 
                         {props.isAdmin ? 
                              <a href="#!" onClick={() => {
                                   // console.log(project.id)
                                   props.deleteProject(project.id)
                              }} style={{color: 'white'}}><i className="material-icons right">delete</i></a>
                              :
                         ''}
                         </span>
                    </div>
                    <div className="card-action white-text blue lighten-2">
                         <a href="#!" onClick={() =>{
                              // console.log('clicked')
                              // props.addTask(project.id)
                              setformOpen(formOpen + 1)
                         }}
                         class="secondary-content" style={{color: 'white'}}><i class="material-icons">add_circle_outline</i></a>
                         List of Tasks - {project.tasks.length} 
                         <ul className="collection with-header" key={project.id}>
                              {project.tasks.map(task => {
                              return(
                                   <li  className='collection-item blue lighten-2'>
                                        <div> 
                                             {task.status === 'New' ? <span class="new badge red lighten-3"></span> : ''}
                                             {task.name}
                                        </div>
                                   </li>
                              )
                              })}
                         </ul>
                    </div>
                    <div className='card-action blue lighten-4'>
                         <p>Created At- {moment(project.createdAt.toDate()).calendar()}</p>
                         {/* <p>Contributors - {project.users.map(user => {
                              return (
                                   <p>{user.name} |</p>
                              )
                         })}</p> */}
                         {/* <p>{createdAt}</p> */}
                    </div>
               </div>

               {formOpen % 2 !== 0 ? 
                    <AddTask handleToggle={handleToggle} handleAddTask={handleAddTask}/>
                    : ''}

          </div>
               
               
     )
}

const mapDispatchToProps = dispatch => {
     return {
          deleteProject: (id) => {
               dispatch(deleteProject(id))
          },
          addTask: (newTask, id) => {
               dispatch(addTask(newTask, id))
          }
     }
}

const mapStateToProps = state => {
     console.log(state)
     return {
          auth: state.firebase.auth
     }
}

export default compose(
     connect(mapStateToProps, mapDispatchToProps),
     firestoreConnect([
          {
               collection: 'projects'
          }
     ])
)(ListProjects)