import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { signOut } from '../actions/authActions'

const SignedInLinks = (props) => {
     let { name } = props
     // console.log(name.slice(0,2).toUpperCase())
     return (
          <ul id="nav-mobile" class="right hide-on-med-and-down">
               <li><a href='#!' onClick={() => {
                    props.signOut()
                    props.history.push('/')
               }} style={{color: 'white'}}>Logout</a></li>
               <li><a href='#!' className='btn btn-floating blue lighten-1' style={{color: 'white'}}>{name.slice(0,2).toUpperCase()}</a></li>
          </ul>
     )
}

const mapDispatchToProps = dispatch => {
     return {
          signOut: () => {
               dispatch(signOut())
          }
     }
}

export default connect(null, mapDispatchToProps)(withRouter(SignedInLinks))