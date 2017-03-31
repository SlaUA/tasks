import './helpers/cookies';
import React from 'react';
import {render} from 'react-dom';
import {storeConfig, history} from './store/storeConfig';
import {Provider} from 'react-redux';
import WholeContainer from './containers/wholeContainer';
import '../styles/reset.css';
import '../styles/index.css';
import {ConnectedRouter} from 'react-router-redux';
const store = storeConfig();

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<WholeContainer />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app')
);