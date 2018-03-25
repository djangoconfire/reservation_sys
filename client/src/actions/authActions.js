import axios from 'axios';
// import setAuthorizationToken from '../utils/setAuthorizationToken';
import decode from 'jwt-decode';
import {SERVER_URL} from '../constants';

export default class AuthService {

    login(username, password) {
        // Get a token
        return this.fetch(`${SERVER_URL}/api/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token)
            return Promise.resolve(res);
        })
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('token', idToken)
    }

     getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) 
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        console.log("Options",options,url)
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

}

