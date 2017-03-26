import * as todoActions from '../constants/todo';
import * as spinnerActions from '../constants/loadSpinner';
import {push} from 'react-router-redux';
import asyncService from '../helpers/asyncService';

const API_HOST = '/api';

function checkLoggedIn() {
	
	return;
}

export function loadTodos() {
	return (dispatch) => {
		
		dispatch({
			type: spinnerActions.SHOW_SPINNER
		});
		
		asyncService
			.get(`${API_HOST}/todos`)
			.then(data => {
				
				let parsedData;
				
				try {
					parsedData = JSON.parse(data).todos || [];
				} catch (e) {
					parsedData = [];
				}
				
				dispatch({
					type: todoActions.LOADED_ALL_TODOS,
					payload: parsedData
				})
			})
			.then(() => dispatch({
				type: spinnerActions.HIDE_SPINNER
			}))
	}
}

export function onDeleteTodo(todo) {
	return function (dispatch) {
		
		dispatch({
			type: spinnerActions.SHOW_SPINNER
		});
		
		asyncService
			.del(`${API_HOST}/${todo._id}`)
			.then(data => dispatch({
				type: todoActions.DELETE_TODO,
				payload: todo.id
			}))
			.then(() => dispatch({
				type: spinnerActions.HIDE_SPINNER
			}));
	}
}

export function onAddTodo(text) {
	return function (dispatch) {
		
		dispatch({
			type: spinnerActions.SHOW_SPINNER
		});
		
		asyncService
			.post(`${API_HOST}`, {
				id: Date.now(),
				text: (text || 'Новая задача'),
				isDone: false
			}).then(data => dispatch({
				type: todoActions.ADD_TODO,
				payload: JSON.parse(data)
			}))
			.then(() => dispatch({
				type: spinnerActions.HIDE_SPINNER
			}));
	}
}

export function onShowTodoInfo(id) {
	return function (dispatch) {
		
		dispatch(push('/todo/' + id));
	}
}

export function onToggleTodo(todo) {
	return function (dispatch) {
		
		dispatch({
			type: spinnerActions.SHOW_SPINNER
		});
		
		asyncService
			.put(`${API_HOST}/${todo._id}`, {$set: {isDone: !todo.isDone}})
			.then(data => dispatch({
				type: todoActions.TOGGLE_TODO,
				payload: todo.id
			}))
			.then(() => dispatch({
				type: spinnerActions.HIDE_SPINNER
			}));
	}
}

export function onChangeTodo(todo) {
	return function (dispatch) {
		
		dispatch({
			type: spinnerActions.SHOW_SPINNER
		});
		
		asyncService
			.put(`${API_HOST}/${todo._id}`, {
				$set: {
					isDone: todo.isDone,
					text: todo.text
				}
			})
			.then(() => {
				dispatch({
					type: todoActions.CHANGE_TODO,
					payload: todo
				});
				dispatch({
					type: spinnerActions.HIDE_SPINNER
				});
			})
			.then(() => dispatch(push('/')));
	}
}

export function onDeleteAllTodos() {
	
	return function (dispatch) {
		
		dispatch({
			type: spinnerActions.SHOW_SPINNER
		});
		
		asyncService
			.put(`${API_HOST}`, [])
			.then(() => {
				dispatch({
					type: todoActions.DELETE_ALL_TODOS
				});
			})
			.then(() => dispatch({
				type: spinnerActions.HIDE_SPINNER
			}));
	}
}

export function onDoneAllTodos(todos) {
	return function (dispatch) {
		
		dispatch({
			type: spinnerActions.SHOW_SPINNER
		});
		
		asyncService
			.put(`${API_HOST}`, todos.map((todo) => ({
				...todo,
				isDone: true
			})))
			.then(() => {
				dispatch({
					type: todoActions.DONE_ALL_TODOS
				});
			})
			.then(() => dispatch({
				type: spinnerActions.HIDE_SPINNER
			}));
	}
}
