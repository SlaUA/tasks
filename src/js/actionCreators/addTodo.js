import * as addTodoActions from '../constants/addTodo';

export function onChangeTodoText(text) {
	return function (dispatch) {
		dispatch({
			type: addTodoActions.CHANGE_TEXT,
			payload: text
		});
	}
}