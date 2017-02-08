import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../actionCreators/todo';
import * as todoAddActions from '../actionCreators/addTodo';
import TodoList from '../components/todoList';
import AddTodo from '../components/addTodo';
import TodoListManager from '../components/todoListManager';
import {Link} from 'react-router';

class App extends Component {
	
	render() {
		
		const {
			onDeleteTodo,
			onAddTodo,
			onChangeTodo,
			onChangeTodoText,
			onToggleTodo,
			onDeleteAllTodos,
			onToggleAllTodos,
			todos,
			newTodoText
		} = this.props;
		
		return (
			<div className="todoAppWrapper">
				<AddTodo onChangeTodoText={onChangeTodoText}
				         newTodoText={newTodoText}
				         onAddTodo={onAddTodo}/>
				<TodoList
					onToggleTodo={onToggleTodo}
					onChangeTodo={onChangeTodo}
					todos={todos}
					onDeleteTodo={onDeleteTodo}/>
				<TodoListManager
					onDeleteAllTodos={onDeleteAllTodos}
					onToggleAllTodos={onToggleAllTodos}
				/>
				<Link to={'/todo/12'}>aboutTodo</Link>
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
		onDeleteAllTodos: bindActionCreators(todoActions.onDeleteAllTodos, dispatch),
		onToggleAllTodos: bindActionCreators(todoActions.onToggleAllTodos, dispatch),
		onAddTodo: bindActionCreators(todoActions.onAddTodo, dispatch),
		onChangeTodoText: bindActionCreators(todoAddActions.onChangeTodoText, dispatch),
		onChangeTodo: bindActionCreators(todoActions.onChangeTodo, dispatch),
		onToggleTodo: bindActionCreators(todoActions.onToggleTodo, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);