import React from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
import firstImg from '../images/1.png'
import secondImg from '../images/2.png'
import thirdImg from '../images/3.png'


export default function Home() {
     const fonts = "'Comfortaa', cursive"
     return (
          <div>
               <Navbar />
               <br></br><br></br>
               <div className='container'>
                    <h4 class="center-align" style={{fontFamily: fonts, fontSize: '32px'}}><b>Trello your way</b></h4>
                    <p class="center-align" style={{fontFamily: fonts, fontSize: '16px'}}>Use Trello the way your team works best. We’ve got the<br></br>flexibility & features to fit any team’s style.</p>
               </div>
               <br></br><br></br>
               <div className='container'>
                    <div className='row'>
                         <Cards image={firstImg}/>
                         <Cards image={secondImg}/>
                         <Cards image={thirdImg}/>
                    </div>
               </div>
          </div>
     )
}
