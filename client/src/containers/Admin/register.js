import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUser, addUser} from '../../actions'
class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            userdata: {
                name: '',
                lastname: '',
                email: '',
                password: '',
                error: ''
            },
            load: false
        }
    }

    componentWillMount(){
        this.props.dispatch(getAllUser())
    }

    getUser = (user) =>{
        return user.users ?
            user.users.map(item =>{
                return(
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.lastname}</td>
                        <td>{item.email}</td>
                    </tr>
                )
            })
        : null
    }

    handleInput = (e, name) =>{
        let handleName = {
            ...this.state.userdata
        }


        handleName[name] = e.target.value
        
        this.setState({
            userdata: {
                name: handleName.name,
                lastname: handleName.lastname,
                email: handleName.email,
                password: handleName.password
            }
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            load: false
        })
        if(nextProps.user.register === false){
            this.setState({
                userdata: {
                    error: 'Error, Try Again'
                }
            })
        }else{
            console.log('else')
            this.setState({
                userdata: {
                    name: '',
                    lastname: '',
                    email: '',
                    password: '',
                    error: ''
                }
            })
        }
    }

    submitForm = (e)=>{
        e.preventDefault();
        this.setState({
            load: true
        })
        this.props.dispatch(addUser(this.state.userdata, this.props.user.users))     
        
    }

    render(){
        console.log(this.state)
        if(this.state.load){
            return <div className="loader">Loading..</div>
        }
        
        return(
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add</h2>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Name"
                            value={this.state.userdata.name}
                            onChange={(e)=>this.handleInput(e, 'name')}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter LastName"
                            value={this.state.userdata.lastname}
                            onChange={(e)=>this.handleInput(e, 'lastname')}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.userdata.email}
                            onChange={(e)=>this.handleInput(e, 'email')}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.userdata.password}
                            onChange={(e)=>this.handleInput(e, 'password')}
                        />
                    </div>

                    <button type="submit">Add</button>

                    <div className="error">
                        {this.state.userdata.error}
                    </div>

                </form>

                <div className="current_user">
                    <h4>Current User:</h4>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.getUser(this.props.user)}
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Register)

