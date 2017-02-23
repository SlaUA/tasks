import * as todoActions from '../constants/todo';
import {push} from 'react-router-redux';

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

export function onShowTodoInfo(id) {

    return function (dispatch) {
        dispatch(push('/todo/' + id));
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

export function onChangeTodo(options) {
    return function (dispatch) {
        dispatch({
            type: todoActions.CHANGE_TODO,
            payload: options
        });
        dispatch(push('/'));
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


