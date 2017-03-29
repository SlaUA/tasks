import React from 'react';
import {connect} from 'react-redux';
import * as apiActionCreators from '../actionCreators/api';
import {bindActionCreators} from 'redux';

export default function requireAuthentication(Component) {
	
	class AuthenticatedComponent extends React.Component {
		
		componentWillMount() {
			this.checkAuth();
		}
		
		componentWillReceiveProps() {
			this.checkAuth();
		}
		
		checkAuth() {
			
			if (this.props.isLoggedIn) {
				return;
			}
			this.props.onLoggedOutState();
		}
		
		render() {
			
			return (
				<div className="authenticated-component">
					{this.props.isLoggedIn ? <Component {...this.props}/> : null}
				</div>
			)
		}
	}
	
	const mapStateToProps = (state) => ({
		isLoggedIn: state.authReducer.isLoggedIn
	});
	
	const mapDispatchToProps = (dispatch) => ({
		onLoggedOutState: bindActionCreators(apiActionCreators.onLoggedOutState, dispatch)
	});
	
	return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}