import React, {Component} from 'react';
import LoadSpinner from '../components/loadSpinner';
import App from '../containers/app';
import AboutTodo from '../containers/aboutTodo';
import Page404 from '../containers/page404';
import LoginRegisterPage from '../containers/loginRegisterPage';
import {Route, Switch} from 'react-router-dom';
import requireAuthentication from '../containers/authenticatedComponent';

export default class WholeContainer extends Component {
	
	render() {
		
		return (
			<div className="wholeWrapper">
				<Switch>
					<Route exact path="/" component={requireAuthentication(App)}/>
					<Route path="/api/auth" component={LoginRegisterPage}/>
					<Route path="/api/todo/:id" component={requireAuthentication(AboutTodo)}/>
					<Route component={Page404}/>
				</Switch>
				{this.props.children}
				<LoadSpinner/>
			</div>
		);
	}
}