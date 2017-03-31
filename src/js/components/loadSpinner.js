import React, {Component} from 'react';
import '../../styles/loadSpinner.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActionCreators from '../actionCreators/todo';

class LoadSpinner extends Component {
	
	render() {
		
		const {isVisibleSpinner} = this.props;
		
		return (
			<div className={"cssload-contain " + (isVisibleSpinner ? "visible" : "hidden")}>
				<div className="cssload-dot"/>
				<div className="cssload-dot"/>
				<div className="cssload-dot"/>
				<div className="cssload-dot"/>
				<div className="cssload-dot"/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isVisibleSpinner: state.spinnerReducer.isVisible
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLoadAllTodos: bindActionCreators(todoActionCreators.loadTodos, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadSpinner);

