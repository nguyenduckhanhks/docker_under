export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const LOGOUT = 'LOGOUT';

export const setUserLogin = userData => ({
    type: SET_USER_LOGIN,
    payload: userData
})

export const logout = () => ({
    type: LOGOUT,
    payload: {}
})
