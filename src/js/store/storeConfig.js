import createLogger from 'redux-logger';
import todoAppReducer from '../reducers/todoApp';
import addTodoReducer from '../reducers/addTodo';
import aboutTodoReducer from '../reducers/aboutTodo';
import spinnerReducer from '../reducers/loadSpinner';

import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	addTodoReducer,
	todoAppReducer,
	aboutTodoReducer,
	spinnerReducer,
	routing: routerReducer
});

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, applyMiddleware(
		thunk,
		createLogger(),
		routerMiddleware(browserHistory))
	)
}