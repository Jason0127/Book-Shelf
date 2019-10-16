import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBook, updateBook, deleteBook, clearBook} from '../../actions'


class EditBook extends Component{
    constructor(props){
        super(props)

        this.state = {
            load: true,
            formdata: {
                _id: this.props.match.params.id,
                name: '',
                author: '',
                review: '',
                pages: '',
                rating: '',
                price: ''
            }
        }
    }

    componentWillMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook())
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

    componentWillReceiveProps(nextProps){
        let book = nextProps.book.book;
        this.setState({
            load: false,
            formdata: {
                _id: book._id,
                name: book.name,
                author: book.author,
                review: book.review,
                pages: book.pages,
                rating: book.rating,
                price: book.price
            }
        })
    }

   deletePost = () =>{
        this.props.dispatch(deleteBook(this.props.match.params.id))
   }

    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(updateBook({
            ...this.state.formdata
        }))       
        
        this.setState({
            load: true
        })

    }


    redirectUser = () =>{
        setTimeout(()=>{
            this.props.history.push('/user/user-reviews')
        }, 1000)
    }
    

    render(){
        console.log(this.props)
        if(this.state.load){
            return <div className="loader">loading...</div>
        
        }
        return(
            <div className="rl_container article">

                {
                   this.props.book.updateBook ? 
                        <div className="edit_confirm">
                            post updated, <Link to={`/books/${this.props.book.book._id}`}>
                                Click here
                            </Link>
                        </div>
                   : null
                }

                {
                    this.props.book.deleteBook ?
                        <div className="red_tag">
                            Post Deleted 
                            {this.redirectUser()}
                        </div>
                    : null
                }

                <form onSubmit={this.submitForm}>
                    <h2>Edit Review</h2>

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
            
                    <button type="submit">Edit Review</button>
                    <div className="delete_post">
                        <div className="button" onClick={this.deletePost}>
                            Delete Review
                        </div>
                    </div>
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


export default connect(mapStateToProps)(EditBook)