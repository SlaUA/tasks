import * as authActions from '../constants/authActions';

let initialState = {
    loginField: '',
    passwordField: '',
    isLoggedIn: false,
    user: null
}, user;

try {
    user = JSON.parse(window.cookies.get('x-user'));
    initialState.isLoggedIn = true;
} catch (e) {}

export default (state = initialState, action) => {

    switch (action.type) {

        case authActions.LOGGED_IN_SUCCESSFULLY:
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true
            };

        case authActions.REGISTERED_SUCCESSFULLY:

            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true
            };

        case authActions.LOGIN_FIELD_CHANGE:

            return {
                ...state,
                loginField: action.payload
            };

        case authActions.PASSWORD_FIELD_CHANGE:

            return {
                ...state,
                passwordField: action.payload
            };

        default:
            return state;
    }
}