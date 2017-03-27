import {push} from 'react-router-redux';
import * as authActions from '../constants/authActions';

export function onUsernameFieldChange(value) {
    return function (dispatch) {
        dispatch({
            type: authActions.LOGIN_FIELD_CHANGE,
            payload: value
        });
    }
}

export function onPasswordFieldChange(value) {
    return function (dispatch) {
        dispatch({
            type: authActions.PASSWORD_FIELD_CHANGE,
            payload: value
        });
    }
}

export function onLoginBtnClick() {
    return function (dispatch) {

        dispatch({
            type: authActions.LOGIN_BTN_CLICK
        });
    }
}

export function onRegisterBtnClick() {
    return function (dispatch) {
        dispatch({
            type: authActions.REGISTER_BTN_CLICK
        });
    }
}