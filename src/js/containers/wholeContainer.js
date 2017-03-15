import React, {Component} from 'react';
import * as todoActions from '../actionCreators/todo';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoadSpinner from '../components/loadSpinner';
import App from '../containers/app';
import AboutTodo from '../containers/aboutTodo';
import {Route} from 'react-router-dom';

class WholeContainer extends Component {

    componentDidMount() {

        const {onLoadAllTodos} = this.props;
        onLoadAllTodos();
    }

    render() {

        const {isVisible} = this.props;

        return (
            <div className="wholeWrapper">
                <div>
                    {this.props.children}
                    <LoadSpinner isVisible={isVisible}/>
                </div>
                <Route exact path="/" component={App}/>
                <Route path="/todo/:id" component={AboutTodo}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadAllTodos: bindActionCreators(todoActions.loadTodos, dispatch)
    }
};

const mapStateToProps = (state) => {
    return {
        isVisible: state.spinnerReducer.isVisible
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WholeContainer);