import React, { Component } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import AddProject from './AddProject'
import { createProject } from '../actions/projectActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ListProjects from './ListProjects'
import { getUsers } from '../actions/usersActions'



export class UsersHome extends Component {
     state = {
          isLoading: false,
          darkMode: false
     }

     componentDidMount = () => {
          setTimeout(() => {
               this.setState({
                    isLoading: true
               })
          }, 2900)
          this.props.getUsers();
     }

     handleCreateProject = formData => {
          formData['createdBy'] = this.props.auth.email;
          let userId = {
               id: this.props.auth.uid
          }
          // formData['users'] = userId
          // console.log(formData)
          this.props.createProject(formData, userId)
     }

     render() {
          const { auth, projects, users } = this.props;
          // console.log(this.props.isAdmin)
          console.log('Projects - ', projects)
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

          function isIncludes(projects, userId) {
               let is;
               let isProject = {}
               projects.forEach(project => {
                    is = project.users.find(user => {
                         return user.id === userId
                    })
                    isProject[project.id] = is
               })
               return isProject;
          }
          let isProject;
          let projectIncluded = [];
          let filteredProject;
          if(projects) {
               isProject = isIncludes(projects, auth.uid);
               for(let key in isProject) {
                    if(isProject[key]) 
                         // console.log(key)
                         // console.log(isProject[key])
                         // isUserIncludes.push(isProject[key])
                         projectIncluded.push(key)
               }
               filteredProject = projects.filter(project => {
                    return projectIncluded.includes(project.id)
               })
          }

          // console.log('Filtered Projects - ',filteredProject)

          if(!auth.uid && this.state.isLoading) {
               return <Redirect to='/login' />
          }
          
          return (
               this.state.isLoading ? 
               <div>
                    <Navbar />
                    <br></br>

                    <div className='right-align' style={{ margin: '10px' }}>
                         <div class="switch">
                              <label>
                                   Dark mode
                                   <input type="checkbox" onChange={(e) => {
                                        // console.log('Dark mode - ', e.target.checked)
                                        this.setState({ darkMode: e.target.checked })
                                        // console.log('Dark mode - ', this.state.darkMode)
                                   }}/>
                                   <span class="lever"></span>
                              </label>
                         </div>
                    </div>
                   
                    <AddProject handleCreateProject={this.handleCreateProject} isAdmin={isAdmin}/>
                    <br></br><br></br>
               
                    {/* List Projects */}
                    <div className='container'>
                         <div className='row'>
                              {filteredProject.map(project => (
                                   <ListProjects project={project} isAdmin={isAdmin} darkMode={this.state.darkMode}/>
                              ))}
                         </div>
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
          createProject: (formData, userId) => {
               dispatch(createProject(formData, userId))
          },
          getUsers: () => {
               dispatch(getUsers())
          }
     }
}

const mapStateToProps = state => {
     return {
          auth: state.firebase.auth,
          projects: state.firestore.ordered.projects,
          // isAdmin: state.users
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
)(UsersHome)
