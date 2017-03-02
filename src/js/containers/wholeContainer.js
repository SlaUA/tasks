import React, {Component} from 'react';
import * as todoActions from '../actionCreators/todo';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class WholeContainer extends Component {

    componentDidMount() {

        const {onLoadAllTodos} = this.props;
        onLoadAllTodos();
    }

    render() {

        return (
            <div className="wholeWrapper">
                {this.props.children}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadAllTodos: bindActionCreators(todoActions.loadTodos, dispatch)
    }
};

export default connect(null, mapDispatchToProps)(WholeContainer);
