import * as todoActions from '../constants/todo';

export function onDeleteTodo(todoId) {
	return function (dispatch) {
		dispatch({
			type: todoActions.DELETE_TODO,
			payload: todoId
		});
	}
}

export function onAddTodo(text) {
	return function (dispatch) {
		dispatch({
			type: todoActions.ADD_TODO,
			payload: text
		});
	}
}

export function onChangeTodo(id, text) {
	return function (dispatch) {
		//dispatch({
		//	type: todoActions.CHANGE_TODO,
		//	payload: {id,text}
		//});
	}
}


