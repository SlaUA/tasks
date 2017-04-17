import * as API_CONSTANTS from '../constants/authActions';
import * as INDICATOR_CONSTANTS from '../constants/messagesIndicator';
import {push} from 'react-router-redux';
import Q from 'q';

function xhr(type, url, data, dispatch) {

    let deferred = Q.defer();

    let xhr = new XMLHttpRequest(),
        responseText;

    xhr.open(type, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState !== 4 || xhr.status !== 200) {
            return;
        }

        try {
            responseText = JSON.parse(xhr.responseText);
        } catch (e) {
            responseText = xhr.responseText;
        }

        switch (responseText.code) {

            case API_CONSTANTS.NOT_AUTHORIZED_CODE:

                deferred.reject(responseText);

                dispatch({
                    type: INDICATOR_CONSTANTS.ADD_MESSAGE,
                    payload: responseText.message
                });
                dispatch({
                    type: API_CONSTANTS.LOGGED_OUT_USER
                });
                return dispatch(push('/api/auth'));

            case API_CONSTANTS.ERROR_CODE:

                deferred.reject(responseText);
                console.log(responseText);
                return dispatch({
                    type: INDICATOR_CONSTANTS.ADD_MESSAGE,
                    payload: responseText.message
                });

            default:
                deferred.resolve(responseText);
        }
    });
    xhr.send(data && JSON.stringify(data));
    return deferred.promise;
}

let getStoreSyncedXHR = (dispatch) => ({
    get: function (url) {
        return xhr('get', url, null, dispatch);
    },
    post: function (url, data) {
        return xhr('post', url, data, dispatch);
    },
    put: function (url, data) {
        return xhr('put', url, data, dispatch);
    },
    del: function (url) {
        return xhr('delete', url, null, dispatch);
    }
});

export default getStoreSyncedXHR;