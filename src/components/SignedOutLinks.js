import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const SignedOutLinks = ()=>  {
     return (
          <ul id="nav-mobile" class="right hide-on-med-and-down">
               <li><Link to='/login' style={{color: 'white'}}>Log In</Link></li>
               <li><Link to='/signup' style={{color: 'white'}}>Sign Up</Link></li>
          </ul>
     )
}

const mapDispatchToProps = dispatch => {
     return {
          
     }
}

const mapStateToProps = state => {
     // console.log(state)
     return {
          
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedOutLinks)