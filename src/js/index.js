import React from 'react';
import {render} from 'react-dom';
import storeConfig from './store/storeConfig';
import {Provider} from 'react-redux';
import App from './containers/app';
import WholeContainer from './containers/wholeContainer';
import AboutTodo from './containers/aboutTodo';
import '../styles/reset.css';
import '../styles/index.css';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const store = storeConfig();
const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={WholeContainer}>
				<IndexRoute component={App}/>
				<Route path="todo/:id" component={AboutTodo}/>
				<Route path="*" component={AboutTodo}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);