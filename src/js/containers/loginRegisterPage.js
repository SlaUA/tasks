import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/login.css';
import {bindActionCreators} from 'redux';
import * as authActionCreators from '../actionCreators/auth';

class loginRegisterPage extends Component {
	
	registerButtonHandler() {
		
		this.props.onRegisterBtnClick({
			username: this.props.loginField,
			password: this.props.passwordField
		});
	}
	
	loginButtonHandler() {
		
		this.props.onLoginBtnClick({
			username: this.props.loginField,
			password: this.props.passwordField
		});
	}
	
	usernameFieldChangeHandler(e) {
		
		this.props.onUsernameFieldChange(e.target.value);
	}
	
	passwordFieldChangeHandler(e) {
		
		this.props.onPasswordFieldChange(e.target.value);
	}
	
	componentWillMount() {
		
		if (!this.props.isLoggedIn) {
			return;
		}
		this.props.onLoggedInState();
	}
	
	render() {
		
		return (
			<div className="authWrapper">
				<div className="loginWrapper">
					<input className="username" onChange={this.usernameFieldChangeHandler.bind(this)}
					       value={this.props.loginField}
					       placeholder="username"
					       required/>
					<error className="usernameError" />
				</div>
				<div className="passwordWrapper">
					<input className="password"
					       onChange={this.passwordFieldChangeHandler.bind(this)}
					       value={this.props.passwordField}
					       type="password"
					       placeholder="password"
					       required/>
					<error className="passwordError" />
				</div>
				<div className="authButtonsWrapper">
					<div onClick={this.loginButtonHandler.bind(this)}
					     className="loginBtn authButton">Login
					</div>
					<div onClick={this.registerButtonHandler.bind(this)}
					     className="registerBtn authButton">Register
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loginField: state.authReducer.loginField,
	errors: state.authReducer.errors,
	passwordField: state.authReducer.passwordField,
	isLoggedIn: state.authReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
	onUsernameFieldChange: bindActionCreators(authActionCreators.onUsernameFieldChange, dispatch),
	onPasswordFieldChange: bindActionCreators(authActionCreators.onPasswordFieldChange, dispatch),
	onLoginBtnClick: bindActionCreators(authActionCreators.onLoginBtnClick, dispatch),
	onRegisterBtnClick: bindActionCreators(authActionCreators.onRegisterBtnClick, dispatch),
	onLoggedInState: bindActionCreators(authActionCreators.onLoggedInState, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(loginRegisterPage);