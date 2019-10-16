import React from 'react'
import axios from 'axios'

const Logout = (props) =>{

    axios.get('/api/logout')
    .then(response =>{
        setTimeout(()=>{
            props.history.push('/')
        }, 2000)
    })

    return(
        <div>
            <div className="logout_container">
                <h1>Loging Out</h1>
            </div>
        </div>
    )
}

export default Logout