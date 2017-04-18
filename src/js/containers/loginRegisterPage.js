import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/login.css';
import {bindActionCreators} from 'redux';
import * as authActionCreators from '../actionCreators/auth';
import classNames from 'classnames';

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

    validateField(e) {

        this.props.onFieldValidate(e.target.name, e.target.value);
    }

    componentWillMount() {

        if (!this.props.isLoggedIn) {
            return;
        }
        this.props.onLoggedInState();
    }

    render() {

        return (
            <div className={
                classNames({authWrapper: true})
            }>
                <div className="loginWrapper">
                    <input className="username"
                           name="username"
                           onChange={this.usernameFieldChangeHandler.bind(this)}
                           onBlur={this.validateField.bind(this)}
                           value={this.props.loginField}
                           placeholder="username"
                           required/>
                    <div className={
                        classNames({
                            error: true,
                            hidden: !this.props.errors.username
                        })}>
                        {this.props.errors.username}
                    </div>
                </div>
                <div className="passwordWrapper">
                    <input className="password"
                           name="password"
                           onChange={this.passwordFieldChangeHandler.bind(this)}
                           onBlur={this.validateField.bind(this)}
                           value={this.props.passwordField}
                           type="password"
                           placeholder="password"
                           required/>
                    <div className={
                        classNames({
                            error: true,
                            hidden: !this.props.errors.password
                        })
                    }>{this.props.errors.password}
                    </div>
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
    isFormInvalid: state.authReducer.isFormInvalid,
    passwordField: state.authReducer.passwordField,
    isLoggedIn: state.authReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
    onUsernameFieldChange: bindActionCreators(authActionCreators.onUsernameFieldChange, dispatch),
    onPasswordFieldChange: bindActionCreators(authActionCreators.onPasswordFieldChange, dispatch),
    onLoginBtnClick: bindActionCreators(authActionCreators.onLoginBtnClick, dispatch),
    onRegisterBtnClick: bindActionCreators(authActionCreators.onRegisterBtnClick, dispatch),
    onLoggedInState: bindActionCreators(authActionCreators.onLoggedInState, dispatch),
    onFieldValidate: bindActionCreators(authActionCreators.onFieldValidate, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(loginRegisterPage);