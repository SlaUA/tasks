import * as aboutTodoActions from '../constants/aboutTodo';

export function onChangeAboutText(text) {
    return function (dispatch) {
        dispatch({
            type: aboutTodoActions.CHANGE_ABOUT_TEXT,
            payload: text
        });
    }
}

export function onChangeAboutDone(isDone) {
    return function (dispatch) {
        dispatch({
            type: aboutTodoActions.CHANGE_ABOUT_DONE,
            payload: isDone
        });
    }
}