import * as TODO_CONSTANTS from '../constants/todo';
import * as SPINNER_CONSTANTS from '../constants/loadSpinner';
import * as API_CONSTANTS from '../constants/authActions';
import {push} from 'react-router-redux';
import asyncService from '../helpers/asyncService';

export function loadTodos() {
	return (dispatch) => {
		
		dispatch({
			type: SPINNER_CONSTANTS.SHOW_SPINNER
		});
		
		asyncService
			.get(`${API_CONSTANTS.API_HOST}/todos`)
			.then(data => {
				
				switch (data.code) {
					case API_CONSTANTS.SUCCESS_CODE:
						return dispatch({
							type: TODO_CONSTANTS.LOADED_ALL_TODOS,
							payload: data.todos || []
						});
					//case API_CONSTANTS.ERROR_CODE:
					//	return dispatch({
					//		type: TODO_CONSTANTS.FAILED_TO_LOAD_ALL_TODOS,
					//		payload: []
					//	});
					//case API_CONSTANTS.NOT_AUTHORIZED_CODE:
					//return dispatch(push('/api/auth'));
				}
				
			})
			.then(() => {
				dispatch({
					type: SPINNER_CONSTANTS.HIDE_SPINNER
				});
			});
	}
}

export function onAddTodo(text) {
	return function (dispatch) {
		
		let newTodo = {
			id: Date.now(),
			text: (text || 'Новая задача'),
			isDone: false
		};
		
		dispatch({
			type: SPINNER_CONSTANTS.SHOW_SPINNER
		});
		
		asyncService
			.post(`${API_CONSTANTS.API_HOST}/todo`, newTodo).then(data => dispatch({
				type: TODO_CONSTANTS.ADD_TODO,
				payload: newTodo
			}))
			.then(() => dispatch({
				type: SPINNER_CONSTANTS.HIDE_SPINNER
			}));
	}
}

export function onDeleteTodo(todo) {
	return function (dispatch) {
		
		dispatch({
			type: SPINNER_CONSTANTS.SHOW_SPINNER
		});
		
		asyncService
			.del(`${API_CONSTANTS.API_HOST}/todo/${todo.id}`)
			.then(data => dispatch({
				type: TODO_CONSTANTS.DELETE_TODO,
				payload: todo.id
			}))
			.then(() => dispatch({
				type: SPINNER_CONSTANTS.HIDE_SPINNER
			}));
	}
}

export function onShowTodoInfo(id) {
	return function (dispatch) {
		
		dispatch(push('/api/todo/' + id));
	}
}

export function onChangeTodo(todo, redirectToHP) {
	return function (dispatch) {
		
		dispatch({
			type: SPINNER_CONSTANTS.SHOW_SPINNER
		});
		
		asyncService
			.put(`${API_CONSTANTS.API_HOST}/todo/${todo.id}`, todo)
			.then((data) => {
				
				switch (data.code) {
					case API_CONSTANTS.SUCCESS_CODE:
						return dispatch({
							type: TODO_CONSTANTS.CHANGE_TODO,
							payload: todo
						});
					//case API_CONSTANTS.ERROR_CODE:
					//	return dispatch({
					//		type: TODO_CONSTANTS.FAILED_TO_LOAD_ALL_TODOS,
					//		payload: []
					//	});
					//case API_CONSTANTS.NOT_AUTHORIZED_CODE:
					//return dispatch(push('/api/auth'));
				}
			})
			.then(() => {
				
				dispatch({
					type: SPINNER_CONSTANTS.HIDE_SPINNER
				});
				redirectToHP && dispatch(push('/'));
			});
	}
}

export function onDeleteAllTodos() {
	
	return function (dispatch) {
		
		dispatch({
			type: SPINNER_CONSTANTS.SHOW_SPINNER
		});
		
		asyncService
			.del(`${API_CONSTANTS.API_HOST}/todos`, {})
			.then(() => {
				dispatch({
					type: TODO_CONSTANTS.DELETE_ALL_TODOS
				});
			})
			.then(() => dispatch({
				type: SPINNER_CONSTANTS.HIDE_SPINNER
			}));
	}
}

export function onDoneAllTodos(todos) {
	return function (dispatch) {
		
		dispatch({
			type: SPINNER_CONSTANTS.SHOW_SPINNER
		});
		
		asyncService
			.put(`${API_CONSTANTS.API_HOST}/todos`)
			.then(() => {
				dispatch({
					type: TODO_CONSTANTS.DONE_ALL_TODOS
				});
			})
			.then(() => dispatch({
				type: SPINNER_CONSTANTS.HIDE_SPINNER
			}));
	}
}
