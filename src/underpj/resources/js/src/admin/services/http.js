import axios from 'axios';
import CookieService from '../cookies';

export const http = axios.create({
    baseURL: 'http://localhost'
})

export const authHttp = () => {

    const ACCESS_TOKEN = CookieService.get('access_token') ? CookieService.get('access_token') : '';
    const TOKEN_TYPE = CookieService.get('token_type') ? CookieService.get('token_type') : '';

    return axios.create({
        baseURL: 'http://localhost',
        headers: {
            'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`
        }
    })
}
