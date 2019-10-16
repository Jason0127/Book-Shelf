import React, {Component} from 'react'
import {connect} from 'react-redux'
import {userPost} from '../../actions'
import moment from 'moment-js'
import {Link} from 'react-router-dom'

class UserPost extends Component{

    componentWillMount(){
        let id = this.props.user.login.id
        this.props.dispatch(userPost(id))
    }

    showUserPost = (user)=>{
        return(
            user.userpost ? 
                user.userpost.map(item => {
                    return(
                        <tr key={item._id}>
                            <td><Link to={`/user/edit-post/${item._id}`}>{item.name}</Link></td>
                            <td>{item.author}</td>
                            <td>
                                {moment(item.createdAt).format("MM/DD/YY")}
                            </td>
                        </tr>
                    )
                })           
            : null
        )
    }

    render(){
        console.log(this.props)
        let user = this.props.user
        return(    
            <div className="user_posts">
                <h4>Your reviews</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.showUserPost(user)}
                    </tbody>

                </table>

            </div> 
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        userpost: state.users
    }
}

export default connect(mapStateToProps)(UserPost)