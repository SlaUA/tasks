import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TodoList from '../components/todoList';
import * as todoActions from '../actionCreators/todo';
import * as todoAddActions from '../actionCreators/addTodo';
import AddTodo from '../components/addTodo';

class App extends Component {
	
	render() {
		
		const {
			onDeleteTodo,
			onAddTodo,
			onChangeTodo,
			onChangeTodoText,
			todos,
			newTodoText
		} = this.props;
		
		return (
			<div className="todoAppWrapper">
				<AddTodo onChangeTodoText={onChangeTodoText}
				         newTodoText={newTodoText}
				         onAddTodo={onAddTodo}/>
				<TodoList
					onChangeTodo = {onChangeTodo}
					todos={todos}
					onDeleteTodo={onDeleteTodo}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	todos: state.todoAppReducer.todos,
	newTodoText: state.addTodoReducer.newTodoText
});

const mapDispatchToProps = (dispatch) => {
	return {
		onDeleteTodo: bindActionCreators(todoActions.onDeleteTodo, dispatch),
		onAddTodo: bindActionCreators(todoActions.onAddTodo, dispatch),
		onChangeTodoText: bindActionCreators(todoAddActions.onChangeTodoText, dispatch),
		onChangeTodo: bindActionCreators(todoActions.onChangeTodo, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);