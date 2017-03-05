import * as todoActions from '../constants/todo';
import * as spinnerActions from '../constants/loadSpinner';
import {push} from 'react-router-redux';
import asyncService from '../helpers/asyncService';

const API_KEY = 'pfierzS-glRRmq0xpPRCIli60atyuuNm';
const API_HOST = 'https://api.mlab.com/api/1/databases/mytasklist/collections/tasks';

export function loadTodos() {
    return (dispatch)=>{

        dispatch({
            type: spinnerActions.SHOW_SPINNER
        });

        asyncService
        .get(`${API_HOST}?apiKey=${API_KEY}`)
        .then(data=>dispatch({
            type: todoActions.LOADED_ALL_TODOS,
            payload: JSON.parse(data)
        }))
        .then(()=>dispatch({
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
        .del(`${API_HOST}/${todo._id}?apiKey=${API_KEY}`)
        .then(data=>dispatch({
            type: todoActions.DELETE_TODO,
            payload: todo.id
        }))
        .then(()=>dispatch({
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
        .post(`${API_HOST}?apiKey=${API_KEY}`, {
            id: Date.now(),
            text: (text || 'Новая задача'),
            isDone: false
        }).then(data=>dispatch({
            type: todoActions.ADD_TODO,
            payload: JSON.parse(data)
        }))
        .then(()=>dispatch({
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
        .put(`${API_HOST}/${todo._id}?apiKey=${API_KEY}`, { $set : { isDone: !todo.isDone } })
        .then(data=>dispatch({
            type: todoActions.TOGGLE_TODO,
            payload: todo.id
        }))
        .then(()=>dispatch({
            type: spinnerActions.HIDE_SPINNER
        }));
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
            type: spinnerActions.SHOW_SPINNER
        });

        asyncService
        .put(`${API_HOST}?apiKey=${API_KEY}`, [])
        .then(()=>{
            dispatch({
                type: todoActions.DELETE_ALL_TODOS
            });
        })
        .then(()=>dispatch({
            type: spinnerActions.HIDE_SPINNER
        }));
    }
}

export function onToggleAllTodos() {
    return function (dispatch) {

        dispatch({
            type: todoActions.TOGGLE_ALL_TODOS
        });
    }
}
