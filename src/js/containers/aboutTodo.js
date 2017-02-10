import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as aboutTodoActions from '../actionCreators/aboutTodo';

class aboutTodo extends Component {
	
	onChangeText(e) {
		this.props.onChangeAboutText(e.target.value)
	}
	
	render() {
		
		let {todos} = this.props,
			currentTodo = todos.find((todo) => todo.id === Number(this.props.routeParams.id));
		
		return (
			<div className="aboutWrapper">
				<div>todo's id is: {currentTodo.id}</div>
				<input value={this.props.todoText || currentTodo.text}
				       onChange={this.onChangeText.bind(this)}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	todos: state.todoAppReducer.todos,
	todoText: state.aboutTodoReducer.todoText
});

const mapDispatchToProps = (dispatch) => {
	return {
		onChangeAboutText: bindActionCreators(aboutTodoActions.onChangeAboutText, dispatch),
		onChangeAboutDone: bindActionCreators(aboutTodoActions.onChangeAboutDone, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(aboutTodo);