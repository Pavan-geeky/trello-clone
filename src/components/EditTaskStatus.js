import React, { Component } from 'react'
import Modal from 'react-awesome-modal';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';

export class EditTaskStatus extends Component {
     constructor(props) {
          super(props) 
          this.state = {
               visible: true,
               status: '',
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
          this.props.handleToggleForStatus()
     }

     handleChange = e => {
          this.setState({ 
               [e.target.name]: e.target.value
          })
     }

     render() {
          return (
               <section className='container'> 
               <div className='container' style={{ margin: '5px' }}>
                    <Modal visible={this.state.visible} width="600" height="350" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                         <br></br>
                         <h3 className='center-align'>Edit Task Status</h3>
                         <form onSubmit={ (e) => {
                              e.preventDefault()
                              this.props.handleEditTaskStatus(this.state.status)
                              this.props.handleToggleForStatus()
                              // console.log(this.state)
                         } }>
                              <div class="input-field col s10 " >
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

export default EditTaskStatus
