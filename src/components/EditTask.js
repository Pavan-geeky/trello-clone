import React, { Component } from 'react'
import Modal from 'react-awesome-modal';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';
import Select from 'react-select';


export class EditTask extends Component {
     constructor(props) {
          super(props) 
          this.state = {
               visible: true,
               name: '',
               startDate: '',
               endDate: '',
               status: '',
               notes: '',
               users: []
          }
     } 

     openModal() {
          this.setState({
              visible : true
          });
     }
   
     closeModal() {
          this.setState({
              visible : false
          });
          this.props.handleToggle()
     }

     handleChange = e => {
          this.setState({ 
               [e.target.name]: e.target.value
          })
     }

     render() {
          // console.log('Tasks - ', this.props.tasks);
          // console.log('Task ID - ', this.props.taskId)
          const task = this.props.tasks;
          console.log(task)
          // console.log(this.props.users)
          this.props.users.forEach(user => {
               user['value'] = user.id
               user['label'] = user.name
          })
          return (
               <section className='container'> 
               <div className='container'>
                    <Modal visible={this.state.visible} width="600" height="700" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                         <br></br>
                         <h3 className='center-align'>Edit Task</h3>
                         <form onSubmit={ (e) => {
                              e.preventDefault()
                              this.props.handleEditTask(this.state)
                              this.props.handleToggle()
                              // console.log(this.state)
                         } }>
                              <div class="col s12" >
                                <label for="taskName" style={{color: 'black'}}>Task title</label>
                                   <input id="taskName" type="text" name='name' placeholder={task.name} onChange={this.handleChange}/>
                                   Start date:
                                   <input type='date' name='startDate' onChange={this.handleChange}/>
                                   End date:
                                   <input type='date' name='endDate' onChange={this.handleChange}/>
                                   Add User: 
                                   <Select
                                        placeholder="Select user..."
                                        isSearchable={true}
                                        isClearable={true}
                                        options={this.props.users}
                                        onChange={(e) => this.setState({ users: [ { id: e.value} ] }) }
                                   />
                                   Status: 
                                   <RadioGroup onChange={ (e) => {
                                        this.setState({ status: e })
                                   } }  horizontal>
                                        <ReversedRadioButton value="In Progress" iconInnerSize={-1} name='status'>
                                        In Progress
                                        </ReversedRadioButton>
                                        <ReversedRadioButton value="Review" iconInnerSize={-1} name='status'>
                                        Review
                                        </ReversedRadioButton>
                                        <ReversedRadioButton value="Done" iconInnerSize={-1} name='status'>
                                        Done
                                        </ReversedRadioButton>
                                   </RadioGroup>
                                   Notes: 
                                   <textarea id="textarea1" class="materialize-textarea" name="notes" onChange={(this.handleChange)} placeholder={task.notes}></textarea>

                                   <br></br><br></br>
                                   <button class="blue lighten-2 btn-large">Submit </button> 
                              </div>
                         </form>
                    </Modal>
                    </div>
               </section>
          )
     }
}

export default EditTask
