import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions/authActions'
import Navbar from './Navbar'
import { Button, Form, Input } from 'semantic-ui-react'
import SweetAlert from 'sweetalert2-react';
import { isAdmin } from '../actions/usersActions'


export class Login extends Component {
     state = {
          email: '',
          password: '',
          isShow: false
     }

     handleChange = e => {
          this.setState({
               [e.target.name]: e.target.value,
               [e.target.name]: e.target.value
          })
     }
     render() {
          const font = "'Comfortaa', cursive"
          // console.log('Auth - ',this.props.authErr)
          if(this.props.auth.uid) {
               this.props.isAdmin(this.props.auth.uid)
               this.props.history.push('/usershome')
          } 

          return (
               <div className=''>
                    <Navbar />
                    <div className='container' style={{fontFamily: font}}>
                         <div className='container col-5' style={{"marginTop": "10%"}}>
                              <h3 className='text-center' >Log in to Trello</h3><br></br>
                              <Form onSubmit={e => {
                                   e.preventDefault();
                                   this.props.signIn(this.state)
                                   }}>
                                   <Form.Field>
                                        <label>Email</label>
                                        <Input placeholder='Email' icon='mail' iconPosition='left' name='email' onChange={this.handleChange} required/>
                                   </Form.Field>
                                   <Form.Field>
                                        <label>Password</label>
                                        <Input placeholder='Password' icon='barcode' iconPosition='left' name='password' type='password' onChange={this.handleChange} required/>
                                   </Form.Field>
                                   Don't have account? <Link to='/signup'>Click here</Link><br></br><br></br>
                                   <Button type='submit' primary fluid size='big'>Submit</Button>
                              </Form>
                         </div>
                         {this.props.authErr ? 
                              <SweetAlert
                              show={true}
                              title="Email/Password is incorrect!!!"
                              type="error"
                              onConfirm={() => false}
                              /> : ''} 
                    </div>
               </div>
          )
     }
}

const mapDispatchToProps = dispatch => {
     return {
          signIn: (formData) => {
               dispatch(signIn(formData))
          },
          signOut: () => {
               dispatch(signOut())
          },
          isAdmin: (id) => {
               dispatch(isAdmin(id))
          }
     }
}

const mapStateToProps = state => {
     // console.log(state)
     return {
          authErr: state.auth.error,
          auth: state.firebase.auth,
          isAdmin: state.isAdmin
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
