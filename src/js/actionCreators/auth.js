import {push} from 'react-router-redux';
import * as API_CONSTANTS from '../constants/authActions';
import * as SPINNER_CONSTANTS from '../constants/loadSpinner';
import validateFormPart from '../validation';

let allowedValues = /^[a-zA-Z0-9]*$/i;

// returns true if at least 1 error is present
export function onFieldValidate(field, value) {
    return function (dispatch) {

        let errors = validateFormPart({
            [field]: value
        });

        dispatch({
            type: API_CONSTANTS.FIELD_VALIDATION,
            payload: {
                [field]: errors[field]
            }
        });

        return Object.keys(errors).some((field) => errors[field]);
    }
}

// returns true if at least 1 error is present
export function onFormValidate(userForm) {
    return function (dispatch) {

        let errors = validateFormPart(userForm);

        dispatch({
            type: API_CONSTANTS.FORM_VALIDATION,
            payload: errors
        });

        return Object.keys(errors).some((field) => errors[field]);
    }
}

// controlled input change
export function onUsernameFieldChange(value) {
    return function (dispatch) {

        if (!value.match(allowedValues)) {
            return;
        }

        dispatch({
            type: API_CONSTANTS.LOGIN_FIELD_CHANGE,
            payload: value
        });
    }
}

// controlled input change
export function onPasswordFieldChange(value) {
    return function (dispatch) {

        if (!value.match(allowedValues)) {
            return;
        }

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

        window.xhr.post(`${API_CONSTANTS.API_HOST}/${API_CONSTANTS.API_LOGIN}`, userForm)
            .then(function (data) {

                dispatch({
                    type: API_CONSTANTS.LOGGED_IN_SUCCESSFULLY,
                    payload: data.payload
                });
                dispatch(push('/'));
            })
            .finally(() =>
                dispatch({
                    type: SPINNER_CONSTANTS.HIDE_SPINNER
                }));
    }
}

export function onRegisterBtnClick(userForm) {
    return function (dispatch) {

        dispatch({
            type: SPINNER_CONSTANTS.SHOW_SPINNER
        });

        window.xhr.post(`${API_CONSTANTS.API_HOST}/${API_CONSTANTS.API_REGISTER}`, userForm)
            .then(function (data) {

                dispatch({
                    type: API_CONSTANTS.REGISTERED_SUCCESSFULLY,
                    payload: data.payload
                });
                dispatch(push('/'));
            })
            .finally(() =>
                dispatch({
                    type: SPINNER_CONSTANTS.HIDE_SPINNER
                }));
    }
}

export function onLoggedInState() {
    return function (dispatch) {
        dispatch(push('/'));
    }
}