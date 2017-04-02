import createLogger from 'redux-logger';
import todoAppReducer from '../reducers/todoApp';
import addTodoReducer from '../reducers/addTodo';
import aboutTodoReducer from '../reducers/aboutTodo';
import spinnerReducer from '../reducers/loadSpinner';
import authReducer from '../reducers/authReducer';
import messagesIndicatorReducer from '../reducers/messagesIndicator';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';

const history = createHistory();
const rootReducer = combineReducers({
	authReducer,
	messagesIndicatorReducer,
	addTodoReducer,
	todoAppReducer,
	aboutTodoReducer,
	spinnerReducer,
	router: routerReducer
});

function storeConfig(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			routerMiddleware(history),
			thunk,
			createLogger()
		)
	)
}

export {
	storeConfig,
	history
}