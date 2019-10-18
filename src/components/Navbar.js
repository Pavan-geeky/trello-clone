import React from 'react'
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {
     const font = "'Pacifico', cursive";
     const { auth } = props;
     const links = auth.uid ? <SignedInLinks name={auth.email}/> : <SignedOutLinks />;
     // let date = new Date();
     // let hours = date.getHours();
     // let time = ''
     // if(hours > 0 && hours < 12) {
     //      time = 'lime'
     // } else if(hours > 12 && hours < 18) {
     //      time = 'blue'
     // } else {
     //      time = 'black'
     // }
     return (
          <div >
               <nav>
                    <div className="nav-wrapper blue">
                         <a href="#!" className="brand-logo center" style={{fontFamily: font, fontSize: '32px', color: 'white'}}>  <i className="material-icons" style={{fontSize: '35px'}}>assignment</i>Trello</a>
                         { links }
                    </div>
               </nav>
          </div>
     )
}

const mapStateToProps = state => {
     return {
          auth: state.firebase.auth
     }
}

export default connect(mapStateToProps)(Navbar)