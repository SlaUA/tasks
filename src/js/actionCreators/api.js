import {push} from 'react-router-redux';

export function onLoggedOutState() {
    return function (dispatch) {
        dispatch(push('/api/auth'));
    }
}