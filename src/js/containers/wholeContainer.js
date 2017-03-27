import React, {Component} from 'react';
import * as todoActionCreators from '../actionCreators/todo';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoadSpinner from '../components/loadSpinner';
import App from '../containers/app';
import AboutTodo from '../containers/aboutTodo';
import Page404 from '../containers/page404';
import LoginRegisterPage from '../containers/loginRegisterPage';
import {Route, Switch} from 'react-router-dom';
import requireAuthentication from '../containers/authenticatedComponent';

class WholeContainer extends Component {

    componentDidMount() {

        const {onLoadAllTodos} = this.props;
        onLoadAllTodos();
    }

    render() {

        const {isVisibleSpinner} = this.props;

        return (
            <div className="wholeWrapper">
                <Switch>
                    <Route exact path="/" component={requireAuthentication(App)}/>
                    <Route exact path="/api/auth" component={LoginRegisterPage}/>
                    <Route path="/api/todo/:id" component={requireAuthentication(AboutTodo)}/>
                    <Route component={Page404}/>
                </Switch>
                <div>
                    {this.props.children}
                    <LoadSpinner isVisible={isVisibleSpinner}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadAllTodos: bindActionCreators(todoActionCreators.loadTodos, dispatch)
    }
};

const mapStateToProps = (state) => {

    return {
        isVisibleSpinner: state.spinnerReducer.isVisible
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WholeContainer);