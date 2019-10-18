import React from 'react'

export default function Cards(props) {
     const fonts = "'Comfortaa', cursive"
     return (
          <div className='col s4'>
               <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                         <img class="activator" src={props.image} alt="" />
                    </div>
               <div class="card-content">
                    <h4 className='center-align' style={{fontFamily: fonts}}>Nam consecte</h4>
                    <p className='center-align' style={{fontFamily: fonts}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar luctus sem, eget porta orci. Maecenas molestie dui id diam feugiat, eu tincidunt mauris aliquam.
                    </p>
               </div>
               </div>
          </div>
     )
}
