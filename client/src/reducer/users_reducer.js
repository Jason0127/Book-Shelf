export default function(state ={}, action){
    switch(action.type){
        case('LOG_USER_IN'):
            return {...state, login: action.payload}
        case("USER_AUTH"):
            return {...state, login: action.payload}

        case("USER_POST"):
            return {...state, userpost: action.payload}

        case("GET_ALL_USER"):
            return {...state, users: action.payload}

        case("ADD_NEW_USER"):
            return {
                ...state, 
                users: action.payload.users,
                register: action.payload.success
            }
        default:
            return state
    }
}