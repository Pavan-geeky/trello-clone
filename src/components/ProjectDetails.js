import React, { Component } from 'react'
import Navbar from './Navbar'
import ListTasks from './ListTasks'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { getProject, addUser, removeUser } from '../actions/projectActions'
import { getUsers } from '../actions/usersActions'
import AddUser from './AddUser'


export class ProjectDetails extends Component {
     constructor(props) {
          super(props)
          this.state = {
               isLoading: false
          }
     }

     componentDidMount = () => {
          setTimeout(() => {
               this.setState({
                    isLoading: true
               })
          }, 2000)
          this.props.getProject();
          this.props.getUsers();
     }

     handleAddUser = formData => {
          this.props.addUser(formData, this.props.match.params.id);
     }

     render() {
          let project = [];
          let newProjects = [], inProgressProjects = [], reviewProjects = [], doneProjects = [];
          // console.log(this.props.projects)
          let getProjectUsers = [];
          let refinedUser = []
          if(this.props.projects) {
               project = this.props.projects.find(project => {
                    return project.id === this.props.match.params.id
               });

               project.users.forEach(user => {
                    refinedUser = this.props.users.find(u => {
                         return u.id === user.id
                    });
                    getProjectUsers.push(refinedUser)
               });

               // console.log(project)
               newProjects = project.tasks.filter(task => {
                    return task.status === 'New'
               });
               inProgressProjects = project.tasks.filter(task => {
                    return task.status === 'In Progress'
               });
               reviewProjects = project.tasks.filter(task => {
                    return task.status === 'Review'
               });
               doneProjects = project.tasks.filter(task => {
                    return task.status === 'Done'
               })
               // console.log(newProjects)
          }

          // console.log('Projects - ', project)
          // console.log('New - ', newProjects);
          // console.log('New - ', newProjects.length);
          // console.log('Progress - ', inProgressProjects);
          // console.log('Review - ', reviewProjects);
          // console.log('Done - ', doneProjects)

          // console.log('New projects - ', project)
          // console.log('Project users - ', project.users)
          // console.log('User list - ', this.props.users)
          console.log('Refined User - ', getProjectUsers)

          const { auth, users } = this.props;

          var isAdmin;
          if(users) {
               // console.log('users')
               let currentUser = users.find(user => {
                    return user.id === auth.uid
               })
               // console.log('CurrentUser - ',currentUser)
               let roles
               if(currentUser){
                    roles = currentUser.roles;
                    isAdmin = roles.includes('admin')
               } 
          }

          if(!auth.uid && this.state.isLoading) {
               return <Redirect to='/login' />
          }

          
          return (
               this.state.isLoading ?
               <div>
                    <Navbar />
                    <div className='' >
                         <br></br>

                         <div className='row'>
                              <div className='col s2'>
                                   <h3 style={{ paddingLeft: '35px' }}><a href='#!' onClick={() => {
                                   this.props.history.push('/usershome')
                              }}><i className='material-icons'>arrow_back</i></a> {project.name}</h3>
                              </div>
                              <div className=' col s7'>     
                                   <div class="  lighten-2">
                                        <div class="card-content white-text">
                                             {/* <span class="card-title">Members</span> */}
                                             <p>
                                             {getProjectUsers.length > 0 ?
                                             getProjectUsers.map(user => {
                                                  return (
                                                       <div class="chip">
                                                            {user.name ? 
                                                            user.name : 'Loading...'}
                                                            {/* <a href='#!' onClick={() => {
                                                                 // console.log('clicked')
                                                                 this.props.removeUser(user.id, this.props.match.params.id)
                                                            }} style={{color: '#a5b0b4'}}><i class="close material-icons">cancel</i></a> */}
                                                            {user.roles.includes('admin') ? 
                                                                 <span>
                                                                      <i class="close material-icons">star</i>
                                                                      <i class="close material-icons">face</i>
                                                                 </span>
                                                            : <i class="close material-icons">face</i> }
                                                       </div>
                                                  )
                                             }): <div className='chip'>
                                                  Loading...
                                             </div>} 
                                             </p>
                                        </div>
                                             {/* <div class="card-action blue lighten-3">
                                                  <a href="#!" style={{color: 'black'}}>Members</a>
                                             </div> */}
                                        </div>   
                                   </div>

                              
                              <div className='col s3'>
                                   <AddUser users={this.props.users} handleAddUser={this.handleAddUser} isAdmin={isAdmin}/>     
                              </div>
                                   
                         </div>
                         
                         
                         <section class="" style={{ minWidth: '100%', minHeight: '200px', display: 'flex', overflowX: "auto", marginRight: '10px', marginLeft: '10px' }}>
                                        <div className='' style={{ minWidth: '450px', margin: '5px' }}>
                                             <div className='card blue white-text' style={{ borderRadius: '41px' }}>
                                                  <h5 style={{ padding: '10px' }} class="center-align">New</h5>
                                             </div>
                                             <div className='card-content' style={{ margin: '17px' }}>
                                             {/* <span className="card-title white-text">New<i className="material-icons left">info</i></span> */}
                                                  <div>
                                                       {newProjects.length > 0 ?
                                                            newProjects.map(task => {
                                                                 return (
                                                                      <ListTasks tasks={task} id={this.props.match.params.id} isAdmin={isAdmin} users={getProjectUsers}/>
                                                                 )
                                                            }): '' }
                                                  </div>
                                             </div>
                                        </div>
                                        <div className='' style={{ minWidth: '450px', margin: '5px' }}>
                                             <div className='card blue white-text' style={{ borderRadius: '35px' }}>
                                                  <h5 style={{ padding: '10px' }} class="center-align">In Progress</h5>
                                             </div>
                                             <div className='card-content ' style={{ margin: '17px' }}>
                                             {/* <span className="card-title white-text">In Progress<i className="material-icons left">info</i></span> */}
                                                  <div>
                                                       {inProgressProjects.length > 0 ?
                                                            inProgressProjects.map(task => {
                                                                 return (
                                                                      <ListTasks tasks={task} id={this.props.match.params.id} isAdmin={isAdmin} users={getProjectUsers}/>
                                                                 )
                                                            }) : ''
                                                       }
                                                  </div>
                                             </div>
                                        </div>
                                   
                                        <div className='' style={{ minWidth: '450px', margin: '5px' }}>
                                             <div className='card blue white-text' style={{ borderRadius: '35px' }}>
                                                  <h5 style={{ padding: '10px' }} class="center-align">Review</h5>
                                             </div>
                                             <div className='card-content ' style={{ margin: '17px' }}>
                                             {/* <span class="card-title white-text">Review<i class="material-icons left">info</i></span> */}
                                                  <div>
                                                       {reviewProjects.length > 0 ?
                                                       reviewProjects.map(task => {
                                                            return (
                                                                 <ListTasks tasks={task} id={this.props.match.params.id} isAdmin={isAdmin} users={getProjectUsers}/>
                                                            )
                                                       }) : '' }
                                                  </div>
                                             </div>
                                        </div>
                                   
                                        <div className='' style={{ minWidth: '450px', margin: '5px' }}>
                                             <div className='card blue white-text' style={{ borderRadius: '35px' }}>
                                                  <h5 style={{ padding: '10px' }} class="center-align">Done</h5>
                                             </div>
                                             <div className='card-content ' style={{ margin: '17px' }}>
                                             {/* <span class="card-title white-text">Done<i class="material-icons left">info</i></span> */}
                                                  <div>
                                                       {doneProjects.length > 0 ?
                                                       doneProjects.map(task => {
                                                            return (
                                                                 <ListTasks tasks={task} id={this.props.match.params.id} isAdmin={isAdmin} users={getProjectUsers} />
                                                            )
                                                       }) : ''}
                                                  </div>
                                             </div>
                                        </div>


                         </section> 
                    </div>
               </div>
               : 
               <div className="center-align" style={{marginTop: '250px'}}>
                    <Loader
                    type="Watch"
                    color="#3786ff"
                    height={50}
                    width={50}
                    timeout={3000} //3 secs
                    />
               </div>
          )
     }
}

const mapDispatchToProps = dispatch => {
     return {
          getProject: () => {
               dispatch(getProject())
          },
          getUsers: () => {
               dispatch(getUsers())
          },
          addUser: (userId, id) => {
               dispatch(addUser(userId, id))
          },
          removeUser: (userId, id) => {
               dispatch(removeUser(userId, id))
          }
     }
}

const mapStateToProps = state => {
     // console.log(state)
     return {
          auth: state.firebase.auth,
          projects: state.firestore.ordered.projects,
          users: state.users.users
     }
}

export default compose(
     connect(mapStateToProps, mapDispatchToProps),
     firestoreConnect([
          {
               collection: 'projects'
          }
     ])
)(ProjectDetails)