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

export function onToggleTodo(id) {
	
	return function (dispatch) {
		dispatch({
			type: todoActions.TOGGLE_TODO,
			payload: id
		});
	}
}

export function onDeleteAllTodos() {
	return function (dispatch) {
		dispatch({
			type: todoActions.DELETE_ALL_TODOS
		});
	}
}


export function onToggleAllTodos() {
	return function (dispatch) {
		dispatch({
			type: todoActions.TOGGLE_ALL_TODOS
		});
	}
}


