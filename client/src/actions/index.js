import axios from 'axios'

export function getBooks(limit = 3, start = 0, order='asc', list= ''){
    const req = axios.get(`/api/Books?limit=${limit}&skip=${start}&order=${order}`)
    .then(responce => {
        if(list){
            return [...list, ...responce.data]
        }else{
            return responce.data
        }
    })
    return {
        type: 'GET_BOOKS',
        payload: req
    }
}

export function getBookreviewer(id){
    const req = axios.get(`/api/getBook?id=${id}`)
    // console.log(req)
    return (dispatch)=>{
        req.then(({data})=>{
            let book = data
            // console.log(book)

            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data})=>{
                let responce = {
                    book: book,
                    reviewer: data
                }
                // console.log(responce)
                dispatch({
                    type: 'GET_BOOK_REVIEWER',
                    payload: responce
                })
            })
        })
    }
}

export function clearbookre(){
    return {
        type: 'CLEAR_BOOK',
        payload: {
            book: false,
            reviewer: {}
        }
    }
}

export function addBook(book){

    const req = axios.post('/api/book', book)
    .then(responce => responce.data)

    return{
        type: 'ADD_BOOK',
        payload: req
    }
}

export function clearNewBook(){
    return{
        type: 'CLEAR_NEWBOOK',
        payload: {}
    }
}

export function getBook(id){
    const req = axios.get(`/api/getBook?id=${id}`)
    .then(responce => responce.data)

    return{
        type: 'GET_BOOK',
        payload: req
    }
}

export function updateBook(data){
    const req = axios.post(`/api/book_update`, data)
    .then(responce => responce.data)


    return{
        type: 'UPDATE_BOOK',
        payload: req
    }
}

export function deleteBook(id){
    const req = axios.delete(`/api/delete_book?id=${id}`)
    .then(responce => responce.data)

    return{
        type: 'DELETE_BOOK',
        payload: req
    }
}

export function clearBook(){
    return{
        type: 'CLEAR_EDIT_BOOK',
        payload: {
            book: false,
            updateBook: false,
            deleteBook: false
        }
    }
}

// ***** USER ***** //

export function loguserin({email, password}){
    const req = axios.post('/api/login', {email, password})
    .then(responce => responce.data)
    console.log(req)
    return {
        type: 'LOG_USER_IN',
        payload: req
    }
}

export function auth(){
    const req = axios.get('/api/auth')
    .then(responce => responce.data)
    // console.log(req)
    return{
        type: 'USER_AUTH',
        payload: req
    }
}

export function userPost(id){
    const req = axios.get(`/api/user_post?user=${id}`)
    .then(responce => responce.data)

    return {
        type: 'USER_POST',
        payload: req
    }

}

export function getAllUser(){
    const req = axios.get('/api/users')
    .then(responce => responce.data)

    return {
        type: 'GET_ALL_USER',
        payload: req
    }
}

export function addUser(user, userlist){
    const req = axios.post('/api/register', user);

   return (dispatch)=>{
        req.then(({data})=>{
            let users = data.success ? [...userlist, data.user] : userlist
            let responce = {
                success: data.success,
                users
            }

            console.log(responce)

            dispatch({
                type: 'ADD_NEW_USER',
                payload: responce
            })
        })
   }
    
}

