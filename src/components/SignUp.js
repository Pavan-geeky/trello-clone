import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createUser } from '../actions/authActions'
import Navbar from './Navbar'
import { Button, Form, TextArea, Input } from 'semantic-ui-react'


export class SignUp extends Component {
     constructor(props) {
          super(props) 
          this.state = {
               name: '',
               email: '',
               password: '',
               bio: ''
          }
     }
     
     handleChange = e => {
          this.setState({
               [e.target.name]: e.target.value,
               [e.target.name]: e.target.value
          })
     }
     render (){
          const font = "'Comfortaa', cursive"
          return (
               <div className=''>
                    <Navbar />
                    <div className='container' style={{fontFamily: font}}>
                         <div className='container col-5' style={{"marginTop": "8%"}}>
                              <h3 className='text-center'>Create a Trello Account</h3><br></br>
                              <Form onSubmit={e => {
                                        e.preventDefault();
                                        this.props.createUser(this.state)
                                        if(!this.props.authErr) {
                                             this.props.history.push('/usershome')
                                        }
                                   }}>
                                   <Form.Field>
                                        <label>Name</label>
                                        <Input placeholder='Name' name='name' icon='user' iconPosition='left' onChange={this.handleChange} required/>
                                   </Form.Field>
                                   <Form.Field>
                                        <label>Email</label>
                                        <Input placeholder='Email' name='email' icon='mail' iconPosition='left' onChange={this.handleChange} required/>
                                   </Form.Field>
                                   <Form.Field>
                                        <label>Password</label>
                                        <Input placeholder='Password' name='password' icon='barcode' iconPosition='left' type='password' onChange={this.handleChange} required/>
                                   </Form.Field>
                                   Bio <TextArea col='5' name='bio' placeholder='Bio...' onChange={this.handleChange} style={{ minHeight: 100 }} required/><br></br><br></br>
                                   Already have an account?<Link to='/login'> Click here</Link><br></br><br></br>
                                   <Button type='submit' primary fluid size='big'>Submit</Button>
                              </Form>
                              <br></br><br></br><br></br><br></br>
                         </div>
                    </div>
               </div>
          )
     }
}

const mapDispatchToProps = dispatch => {
     return {
          createUser: (formData) => {
               dispatch(createUser(formData))
          }
     }
}

const mapStateToProps = state => {
     // console.log(state)
     return {
          authErr: state.auth.error,
          auth: state.firebase.auth
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)