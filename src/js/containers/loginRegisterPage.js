import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/login.css';
import {bindActionCreators} from 'redux';
import * as authActionCreators from '../actionCreators/auth';

class loginRegisterPage extends Component {

    registerButtonHandler() {


    }

    render() {

        return (
            <div className="authWrapper">
                <div className="loginWrapper">
                    <input onChange={this.props.onUsernameFieldChange.bind(null, this.value)}
                           value={this.props.loginField} type="text"
                           placeholder="username"/>
                </div>
                <div className="passwordWrapper">
                    <input onChange={this.props.onPasswordFieldChange.bind(null, this.value)}
                           type="password" placeholder="password"/>
                </div>
                <div onClick={this.props.onLoginBtnClick}
                     className="loginBtn">Login
                </div>
                <div onClick={this.props.onRegisterBtnClick}
                     className="registerBtn">Register
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loginField: state.authReducer.loginField
});

const mapDispatchToProps = (dispatch) => ({
    onUsernameFieldChange: bindActionCreators(authActionCreators.onUsernameFieldChange, dispatch),
    onPasswordFieldChange: bindActionCreators(authActionCreators.onPasswordFieldChange, dispatch),
    onLoginBtnClick: bindActionCreators(authActionCreators.onLoginBtnClick, dispatch),
    onRegisterBtnClick: bindActionCreators(authActionCreators.onRegisterBtnClick, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(loginRegisterPage);