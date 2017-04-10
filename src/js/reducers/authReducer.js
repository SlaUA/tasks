import * as API_CONSTANTS from '../constants/authActions';

let initialState = {
    loginField: '',
    passwordField: '',
    isLoggedIn: Boolean(window.cookies.get(API_CONSTANTS.USERNAME_COOKIE))
};

export default (state = initialState, action) => {

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

        default:
            return state;
    }
}