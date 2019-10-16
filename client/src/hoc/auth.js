import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../actions'

export default function(ComposedClass, reload){
    
    class Auth extends Component{

        constructor(props){
            
            super(props)

            this.state = {
                loading: true
            }
        }

        componentWillMount(){
            console.log(this.props)
            this.props.dispatch(auth())
            // console.log(this.props)
        }

        componentWillReceiveProps(nextProps){
            this.setState({
                loading: false
            })

            if(!nextProps.user.login.isAuth){
                if(reload){
                    this.props.history.push('/login')
                }
            }else{
                if(reload === false){
                    this.props.history.push('/user')
                }
            }
        }

        render(){
            if(this.state.loading){
                return <div className="loader">loading...</div>
            }
            return(
                <div>
                    <ComposedClass {...this.props} user={this.props.user}/>
                </div>
            )
        }
    }

    const mapStateToProps = (state) =>{
        return{
            user: state.users
        }
    }

    return connect(mapStateToProps)(Auth)

}