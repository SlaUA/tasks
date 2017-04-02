import * as INDICATOR_CONSTANTS from '../constants/messagesIndicator';

export function onMessageAdd(message) {
	return function (dispatch) {
		dispatch({
			type: INDICATOR_CONSTANTS.ADD_MESSAGE,
			payload: message
		});
	}
}

export function onMessageRemove(index) {
	return function (dispatch) {
		dispatch({
			type: INDICATOR_CONSTANTS.REMOVE_MESSAGE,
			payload: index
		});
	}
}