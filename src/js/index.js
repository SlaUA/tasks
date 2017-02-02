import React from 'react';
import {render} from 'react-dom';
import storeConfig from './store/storeConfig';
import {Provider} from 'react-redux';
import App from './containers/app';
import '../styles/reset.css';
import '../styles/index.css';

const store = storeConfig();

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);