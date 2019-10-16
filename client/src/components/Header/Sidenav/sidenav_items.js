import React from 'react'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'
const SideNavItems = (props) =>{
    const items = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Admins',
            link: '/user/register',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My Profile',
            link: '/user',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'fa-sign-in',
            text: 'Login',
            link: '/Login',
            restricted: false,
            exclude: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My Reviews',
            link: '/user/user-reviews',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Reviews',
            link: '/user/add',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'fa-sign-out',
            text: 'Logout',
            link: '/logout',
            restricted: true
        }
    ]

    const element = (item, i) =>{
        return(
            <div key={i} className={item.type}>
                <Link to={item.link}>
                    <FontAwesome name={item.icon} />
                    {item.text}
                </Link>
            </div>
        )
    }

    const showitems =() =>{
         
        return props.user.login ? 
            items.map((item, i)=>{
                if(props.user.login.isAuth){
                    return !item.exclude ?
                        element(item, i)
                    : null
                }else{
                    return !item.restricted ? 
                        element(item, i)
                    : null
                }
                // return 
            })
        : null
    }

    return(
        <div>
            {showitems()}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        user: state.users
    }
}

export default connect(mapStateToProps)(SideNavItems)