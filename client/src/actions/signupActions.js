import axios from 'axios';
import {SERVER_URL} from '../constants';

export function userSignupRequest(userData) {
	return dispatch => {
	  	console.log("USer data",userData,SERVER_URL)
	  	let header = new Headers({
		    'Access-Control-Allow-Origin':'*',
		    'Content-Type': 'application/json'
		});
	    return axios.post(SERVER_URL+"/api/user/register/",userData,{headers : header})
	}
}