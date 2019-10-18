import React, { Component } from 'react'
// import { Button } from 'semantic-ui-react'
import Select from 'react-select';


export class AddUser extends Component {
     state = {
          id: ''
     }
     render() {
          // console.log('Users - ', this.props.users)
          let isDisabled = true;
          if(this.props.isAdmin) {
               isDisabled = false
          }
          this.props.users.forEach(user => {
               user['value'] = user.id
               user['label'] = user.name
          })
          return (
               // <div class="row">
               //      <div class="col s12 m12">
               //           <div class="card white lighten-4">
               //                <div class="card-content">
                                   <div className='row'>
                                        <form onSubmit={(e) => {
                                             e.preventDefault()
                                             this.props.handleAddUser(this.state)
                                             // console.log(this.state)
                                             }}>
                                             <div className='row'>
                                                  <div className='col s6'>
                                                       <Select
                                                            placeholder="Select user..."
                                                            isSearchable={true}
                                                            isClearable={true}
                                                            isDisabled={isDisabled}
                                                            options={this.props.users}
                                                            onChange={(e) => this.setState({ id: e.value }) }
                                                            styles
                                                       />
                                                  </div>
                                                  <div className='col s6'>
                                                       <button href="#!" disabled={isDisabled} class="btn-floating btn-large waves-effect waves-light blue"> <i class="material-icons">add</i></button>
                                                  </div>
                                             </div>
                                             {/* <div className='col s12'> */}
                                                  
                                             {/* </div> */}
                                        </form>
                                   </div>
                              // </div>
               //           <div class="card-action">
               //                <p>Add user</p>
               //           </div> 
               //           </div>
               //      </div>
               // </div>
          )
     }
}

export default AddUser
