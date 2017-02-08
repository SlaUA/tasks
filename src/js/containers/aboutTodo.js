import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class aboutTodo extends Component {
	
	render() {
		
		let {todos} = this.props,
			currentTodo = todos.find((todo)=>todo.id === Number(this.props.routeParams.id));
		return (
			<div className="aboutWrapper">
				<div>todo's id is: {currentTodo.id}</div>
				<div>todo's text is: {currentTodo.text}</div>
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