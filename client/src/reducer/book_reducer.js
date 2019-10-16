export default function(state ={}, action){
    switch(action.type){
        case("GET_BOOKS"):
            return {...state, list: action.payload}
        case("GET_BOOK_REVIEWER"):
            return {
                ...state, 
                book: action.payload.book, 
                reviewer: action.payload.reviewer
            }
        case("CLEAR_BOOK"):
            return {
                ...state, 
                book: action.payload.book, 
                reviewer: action.payload.reviewer
            }
        case("ADD_BOOK"):
            return {...state, newBook: action.payload}

        case("CLEAR_NEWBOOK"):
            return {...state, newBook: action.payload}

        case("CLEAR_EDIT_BOOK"):
            return {
                ...state,
                book: action.payload.book,
                deleteBook: action.payload.deleteBook,
                updateBook: action.payload.updateBook
            }

        case("GET_BOOK"):
            return {...state, book: action.payload}

        case("UPDATE_BOOK"):
            return {
                ...state, 
                updateBook: action.payload.success,
                book: action.payload.docs
            }

        case("DELETE_BOOK"):
            return {
                ...state,
                deleteBook: action.payload.success,
                bookD: action.payload.docs
            }
        default:
            return state
    }
}