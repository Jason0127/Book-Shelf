import React, {Component} from 'react'
import {loguserin} from '../../actions'
import {connect} from 'react-redux'
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            success: false
        }
    }

    handleInputEmail = (e) =>{
        this.setState({
            email: e.target.value
        })
    }

    handleInputPassword = (e) =>{
        this.setState({
            password: e.target.value
        })
    }

    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(loguserin(this.state))
    }

    componentWillReceiveProps(nextprops){
        console.log(nextprops)
        if(nextprops.user.login.isAuth){
            this.props.history.push('/user')
        }
    }

    render(){
        // console.log(this.props)
        let user = this.props.user
        return(
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log in here</h2>

                    <div className="form_element">
                        <input 
                            type="email"
                            placeholder="Enter your mail"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type="submit">Log in</button>

                    <div className="error">
                        {
                            user.login ? 
                            <div>{user.login.message}</div>  
                            : null
                        }
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Login)