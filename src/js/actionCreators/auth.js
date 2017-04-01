import {push} from 'react-router-redux';
import xhr from '../helpers/asyncService';
import * as API_CONSTANTS from '../constants/authActions';
import * as SPINNER_CONSTANTS from '../constants/loadSpinner';

export function onUsernameFieldChange(value) {
	return function (dispatch) {
		dispatch({
			type: API_CONSTANTS.LOGIN_FIELD_CHANGE,
			payload: value
		});
	}
}

export function onPasswordFieldChange(value) {
	return function (dispatch) {
		
		dispatch({
			type: API_CONSTANTS.PASSWORD_FIELD_CHANGE,
			payload: value
		});
	}
}

export function onLoginBtnClick(userForm) {
	return function (dispatch) {
		
		dispatch({
			type: SPINNER_CONSTANTS.SHOW_SPINNER
		});
		
		xhr.post(`${API_CONSTANTS.API_HOST}/${API_CONSTANTS.API_LOGIN}`, userForm)
		   .then(function (data) {
			
			   if (data.code === API_CONSTANTS.SUCCESS_CODE) {
				   dispatch({
					   type: API_CONSTANTS.LOGGED_IN_SUCCESSFULLY,
					   payload: data.payload
				   });
				   dispatch(push('/'));
			   } else {
				   dispatch({
					   type: API_CONSTANTS.LOGIN_FAILED,
					   payload: data.message
				   });
			   }
		   })
		   .then(() => dispatch({
			   type: SPINNER_CONSTANTS.HIDE_SPINNER
		   }));
	}
}

export function onRegisterBtnClick(userForm) {
	return function (dispatch) {
		
		dispatch({
			type: SPINNER_CONSTANTS.SHOW_SPINNER
		});
		
		xhr.post(`${API_CONSTANTS.API_HOST}/${API_CONSTANTS.API_REGISTER}`, userForm)
		   .then(function (data) {
			
			   if (data.code === API_CONSTANTS.SUCCESS_CODE) {
				   dispatch({
					   type: API_CONSTANTS.REGISTERED_SUCCESSFULLY,
					   payload: data.payload
				   });
				   dispatch(push('/'));
			   } else {
				   dispatch({
					   type: API_CONSTANTS.REGISTRATION_FAILED,
					   payload: data.message
				   });
			   }
		   })
		   .then(() => dispatch({
			   type: SPINNER_CONSTANTS.HIDE_SPINNER
		   }));
	}
}

export function onLoggedInState() {
	return function (dispatch) {
		dispatch(push('/'));
	}
}