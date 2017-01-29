import createLogger from 'redux-logger';
import todoAppReducer from '../reducers/todoApp';
import addTodoReducer from '../reducers/addTodo';
import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	addTodoReducer,
	todoAppReducer
});

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, applyMiddleware(thunk, createLogger()))
}