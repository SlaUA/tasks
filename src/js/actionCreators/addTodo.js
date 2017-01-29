import * as todoActions from '../constants/todo';

export function onChangeTodoText(text) {
	return function (dispatch) {
		dispatch({
			type: todoActions.CHANGE_TEXT,
			payload: text
		});
	}
}