import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBookreviewer, clearbookre} from '../../actions'
class BooksVeiw extends Component{
    
    componentWillMount(){
        this.props.dispatch(getBookreviewer(this.props.match.params.id))
    }

    // componentWillUnmount(){
    //     this.props.dispatch(clearbookre())
    // }

    renderbooks = (books)=>{
        // console.log(this.props)
        return books.book ? 
            <div className="br_container">
                <div className="br_header">
                    <h2>{books.book.name}</h2>
                    <h5>{books.book.author}</h5>
                    <div className="br_reviewer">
                        <span>Review By:</span> {books.reviewer.name} {books.reviewer.lastname}
                    </div>
                </div>
                <div className="br_review">
                    {books.book.review}
                </div>
                <div className="br_box">
                    <div className="left">
                        <div>
                            <span>Pages:</span> {books.book.pages}
                        </div>
                        <div>
                            <span>PRice:</span> {books.book.price}
                        </div>
                    </div>
                    <div className="right">
                        <span>Rating</span>
                        <div>
                            {books.book.rating}/5
                        </div>
                    </div>
                </div>
            </div> : null
        
    }

    render(){
        let book = this.props.book
        console.log(this.props)
        return(
            <div>
                {this.renderbooks(book)}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        book: state.books
    }
}

export default connect(mapStateToProps)(BooksVeiw)