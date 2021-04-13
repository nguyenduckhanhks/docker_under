import { SET_USER_LOGIN, LOGOUT }  from '../actions/usersActions';

const merge = (prev, next) => Object.assign({}, prev, next);

export const usersReducers = (state={}, action) => {
    switch (action.type) {
        case SET_USER_LOGIN:
            return merge(state, action.payload)
        case LOGOUT:
            return action.payload
        default:
            return state
    }
}
