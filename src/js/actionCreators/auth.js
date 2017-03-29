import {push} from 'react-router-redux';
import xhr from '../helpers/asyncService';
import * as API_CONSTANTS from '../constants/authActions';

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
            type: API_CONSTANTS.LOGIN_BTN_CLICK
        });

        xhr.post(`${API_CONSTANTS.API_HOST}/${API_CONSTANTS.API_LOGIN}`, userForm)
            .then(function (data) {

                data = JSON.parse(data);

                if (data.code === 200) {
                    dispatch({
                        type: API_CONSTANTS.LOGGED_IN_SUCCESSFULLY,
                        payload: data.payload
                    });
                    dispatch(push('/'));
                } else {
                    dispatch({
                        type: API_CONSTANTS.LOGIN_FAILED
                    });
                }
            });
    }
}

export function onRegisterBtnClick(userForm) {
    return function (dispatch) {

        dispatch({
            type: API_CONSTANTS.REGISTER_BTN_CLICK
        });

        xhr.post(`${API_CONSTANTS.API_HOST}/${API_CONSTANTS.API_REGISTER}`, userForm)
            .then(function (data) {

                data = JSON.parse(data);

                if (data.code === 200) {
                    dispatch({
                        type: API_CONSTANTS.REGISTERED_SUCCESSFULLY,
                        payload: data.payload
                    });
                } else {
                    dispatch({
                        type: API_CONSTANTS.REGISTRATION_FAILED
                    });
                }
            });
    }
}