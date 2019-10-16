import {combineReducers} from 'redux'

import users from './users_reducer'
import books from './book_reducer'

const Rootuser = combineReducers({
    users,
    books
})

export default Rootuser