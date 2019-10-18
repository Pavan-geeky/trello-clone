import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
 
export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : true,
            taskName: '',
            id: '',
            notes: '',
            startDate: '',
            endDate: '', 
            status: 'New',
            createdAt: '',
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
        const uuidv1 = require('uuid/v1');
        let id = uuidv1();
        let createdAt = new Date()
        this.setState({
            [e.target.name]: e.target.value,
            id,
            createdAt
        })
    }
    // componentWillUpdate() {
    //     console.time('start')
    // }
 
    render() {
        return (
            <section className='container'> 
                    <Modal visible={this.state.visible} width="500" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                         <br></br>
                         <h3 className='center-align'>Add Task</h3>
                         <form onSubmit={ (e) => {
                              e.preventDefault()
                              this.props.handleAddTask(this.state)
                              this.props.handleToggle()
                         } }>
                              <div class="input-field col s12 " >
                                <label for="taskName">Add task</label>
                                   <input id="taskName" type="text" name='taskName' onChange={this.handleChange}/>
                                   Start date:
                                   <input type='date' name='startDate' onChange={this.handleChange}/>
                                   End date:
                                   <input type='date' name='endDate' onChange={this.handleChange}/>
                                   Notes: 
                                   <textarea id="textarea1" class="materialize-textarea" name="notes" onChange={(this.handleChange)}></textarea>
                                   <button class="waves-effect waves-light blue lighten-2 btn-large">Add </button> 
                              </div>
                         </form>
                    </Modal>
            </section>
        );
    }
}