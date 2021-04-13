import { http, authHttp } from './http';

export default {
    createUsersByAdmin: (data) => {
        return authHttp.post('/api/admin/users/create-users-by-admin', data)
    },
    login: (data) => {
        return http.post('/api/admin/login', data)
    },
    getUserLogin: () => {
        return authHttp().get('/api/admin/users/user-login')
    },
    logout: () => {
        return authHttp().post('api/admin/users/logout')
    },
    getAllUsers: () => {
        return authHttp().get('/api/admin/users/all-users')
    },
    getUserDataById: (data) => {
        return authHttp().post('/api/admin/users/get-user-by-id', data)
    },
    searchUserByAdmin: (data) =>  {
        return authHttp().post('/api/admin/users/search-user', data)
    },
    updateUserByAdmin: (data) => {
        return authHttp().post('/api/admin/users/update-users-by-admin', data)
    },
    updateStatusUserByAdmin: (data) => {
        return authHttp().post('api/admin/users/update-status-users', data)
    }
}
