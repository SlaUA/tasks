import * as todoActions from '../constants/todo';
import {push} from 'react-router-redux';

const API_KEY = 'pfierzS-glRRmq0xpPRCIli60atyuuNm';

export function loadTodos() {

    return function (dispatch) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.mlab.com/api/1/databases/mytasklist/collections/tasks?apiKey=' + API_KEY);
        xhr.addEventListener('readystatechange', function () {

            if (!(this.readyState === 4 && this.status === 200)) {
                return;
            }
            dispatch({
                type: todoActions.LOADED_ALL_TODOS,
                payload: JSON.parse(this.responseText)
            });
        });
        xhr.send();
    }
}

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


