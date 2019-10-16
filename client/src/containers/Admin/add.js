import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addBook, clearNewBook} from '../../actions'


class AddBook extends Component{
    constructor(props){
        super(props)

        this.state = {
            load: false,
            formdata: {
                name: '',
                author: '',
                review: '',
                pages: '',
                rating: '',
                price: ''
            }
        }
    }

    handleInput = (e, name)=>{
        let newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = e.target.value
        this.setState({
            formdata: newFormdata
        })
    }

    submitForm = (e) =>{
        e.preventDefault();
        let id = this.props.user.login.id
        console.log(this.state.formdata, id)
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId: id
        }))

        this.setState({
            load: true
        })

    }

    newBookpost = (book) =>{
        return(
            book.post ? 
                <div className="conf_link">
                    <Link to={`/books/${book.bookId}`}>
                        Click the link to see the post
                    </Link>
                </div>
            : null
        )
    }
    
    componentWillUnmount(){
        this.props.dispatch(clearNewBook())
    }

    componentWillReceiveProps(nextprops){
        this.setState({
            load: false
        })
    }

    render(){
        console.log(this.props)
        if(this.state.load){
            return <div className="loader">loading...</div>
        }
        return(
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add Review</h2>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Name"
                            value={this.state.formdata.name}
                            onChange={(e)=>this.handleInput(e, 'name')}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Author"
                            value={this.state.formdata.author}
                            onChange={(e)=>this.handleInput(e, 'author')}
                        />
                    </div>

                    <textarea 
                        value={this.state.formdata.review}
                        onChange={(e)=>this.handleInput(e, 'review')}
                    />

                    <div className="form_element">
                        <input 
                            type="number"
                            placeholder="Enter Pages"
                            value={this.state.formdata.pages}
                            onChange={(e)=>{this.handleInput(e, 'pages')}}
                        />
                    </div>

                    <div className="form_element">
                        <select 
                            value={this.state.formdata.rating}
                            onChange={(e)=>this.handleInput(e, 'rating')}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input 
                            type="number"
                            placeholder="Enter Price"
                            value={this.state.formdata.price}
                            onChange={(e)=>this.handleInput(e, 'price')}
                        />
                    </div>
            
                    <button type="submit">Add Review</button>
                    {
                        this.props.book.newBook? 
                            this.newBookpost(this.props.book.newBook)
                        : null
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        book: state.books
    }
}


export default connect(mapStateToProps)(AddBook)