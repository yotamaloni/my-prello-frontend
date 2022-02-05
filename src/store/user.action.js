import { userService } from "../services/user.service.js";
// import { showErrorMsg } from '../services/event-bus.service.js'
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            dispatch({ type: 'SHOW_MSG', msg: { type: 'success', txt: 'Logged in' } })

        } catch (err) {
            dispatch({ type: 'SHOW_MSG', msg: { type: 'danger', txt: 'Cannot Login' } })
            console.log('Cannot login', err)
        }
    }
}


export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            dispatch({ type: 'SHOW_MSG', msg: { type: 'success', txt: `Welcom ${user.username}, We're glad you joined us!` } })
        } catch (err) {
            dispatch({ type: 'SHOW_MSG', msg: { type: 'danger', txt: 'Something went wrong...' } })
            console.log('Cannot signup', err)
        }
    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
            dispatch({ type: 'SHOW_MSG', msg: { type: 'success', txt: 'Logged out' } })
        } catch (err) {
            dispatch({ type: 'SHOW_MSG', msg: { type: 'danger', txt: 'There was a problem' } })
            console.log('Cannot logout', err)
        }
    }
}

export function closeMsg() {
    return (dispatch) => {
        dispatch({ type: 'HIDE_MSG', msg: null })
    }
}

export function loadUsers(filterBy) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers(filterBy)
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function showMsg(txt) {
    return async dispatch => {
        dispatch({ type: 'SHOW_MSG', msg: { type: 'success', txt } })
    }
}



// export function removeUser(userId) {
//     return async dispatch => {
//         try {
//             await userService.remove(userId)
//             dispatch({ type: 'REMOVE_USER', userId })
//         } catch (err) {
//             console.log('UserActions: err in removeUser', err)
//         }
//     }
// }


// export function loadAndWatchUser(userId) {
//     return async (dispatch) => {
//         try {
//             const user = await userService.getById(userId);
//             dispatch({ type: 'SET_WATCHED_USER', user })
//             socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
//             socketService.off(SOCKET_EVENT_USER_UPDATED)
//             socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
//                 console.log('USER UPADTED FROM SOCKET');
//                 dispatch({ type: 'SET_WATCHED_USER', user })
//             })
//         } catch (err) {
//             showErrorMsg('Cannot load user')
//             console.log('Cannot load user', err)
//         }
//     }
// }
