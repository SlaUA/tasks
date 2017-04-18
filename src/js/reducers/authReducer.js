import * as API_CONSTANTS from '../constants/authActions';

let initialState = {
	loginField: '',
	passwordField: '',
	errors: {
		username: '',
		password: ''
	},
	isFormInvalid: false,
	isLoggedIn: Boolean(window.cookies.get(API_CONSTANTS.USERNAME_COOKIE))
};

export default (state = initialState, action) => {
	
	let newState;
	
	switch (action.type) {
		
		case API_CONSTANTS.LOGGED_IN_SUCCESSFULLY:
			
			window.cookies.set(API_CONSTANTS.USERNAME_COOKIE, action.payload);
			return {
				...state,
				isLoggedIn: true
			};
		
		case API_CONSTANTS.LOGGED_OUT_USER:
			
			window.cookies.set(API_CONSTANTS.USERNAME_COOKIE, '', {expires: -1});
			return {
				...state,
				isLoggedIn: false
			};
		
		case API_CONSTANTS.REGISTERED_SUCCESSFULLY:
			
			window.cookies.set(API_CONSTANTS.USERNAME_COOKIE, action.payload);
			return {
				...state,
				isLoggedIn: true
			};
		
		case API_CONSTANTS.LOGIN_FIELD_CHANGE:
			
			return {
				...state,
				loginField: action.payload
			};
		
		case API_CONSTANTS.PASSWORD_FIELD_CHANGE:
			
			return {
				...state,
				passwordField: action.payload
			};
		
		case API_CONSTANTS.FIELD_VALIDATION:
			
			newState = {
				...state,
				errors: Object.assign({}, state.errors, action.payload)
			};
			
			return {
				...newState,
				isFormInvalid: Object.keys(newState.errors).some((el) => newState.errors[el])
			};
		
		case API_CONSTANTS.FORM_VALIDATION:
			
			newState = {
				...state,
				errors: Object.assign({}, state.errors, action.payload)
			};
			
			return {
				...newState,
				isFormInvalid: Object.keys(newState.errors).some((el) => newState.errors[el])
			};
		
		default:
			return state;
	}
}