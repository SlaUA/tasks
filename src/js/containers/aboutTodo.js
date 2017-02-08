import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class aboutTodo extends Component {
	
	render() {
		let {todos} = this.props,
			{id} = this.props.routeParams;
		return (
			<div className="aboutWrapper">
				todoId is: {id}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	todos: state.todoAppReducer.todos
});

const mapDispatchToProps = (dispatch) => {
	return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(aboutTodo);