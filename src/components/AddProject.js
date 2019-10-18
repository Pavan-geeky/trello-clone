import React, { Component } from 'react'

export class AddProject extends Component {
     state = {
          name: ''
     }
     render() {
          let disabled = true;
          let value = '(Disabled)'
          if(this.props.isAdmin) {
               disabled = false
               value = ''
          }

          return (
               <div className='container'>
                    <form onSubmit={(e) => {
                         e.preventDefault();
                         this.props.handleCreateProject(this.state)
                         // console.log(e.target.name)
                         e.target.name.value = ""
                    }}>
                         <div class="input-field col s12">
                              <i className="material-icons prefix">add_circle_outline</i>
                              <input type='text' disabled={disabled} id="name" name='name' onChange={(e) => {
                                   this.setState({
                                        [e.target.name] : e.target.value
                                   })
                              }} />
                              <label for="name">Add Project {value}</label>
                         </div>
                    </form>
               </div>
          )
     }
}

export default AddProject
