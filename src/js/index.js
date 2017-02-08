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

const store = storeConfig();

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={WholeContainer}>
				<IndexRoute component={App}/>
				<Route path="todo/:id" component={AboutTodo}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);