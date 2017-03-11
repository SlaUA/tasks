import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../actionCreators/todo';
import * as todoAddActions from '../actionCreators/addTodo';
import TodoList from '../components/todoList';
import AddTodo from '../components/addTodo';
import TodoListManager from '../components/todoListManager';

class App extends Component {

	render() {

		const {
			onDeleteTodo,
			onAddTodo,
			onShowTodoInfo,
			onChangeTodoText,
			onToggleTodo,
			onDeleteAllTodos,
			onDoneAllTodos,
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
					onShowTodoInfo={onShowTodoInfo}
					todos={todos}
					onDeleteTodo={onDeleteTodo}/>
				<TodoListManager
					todos={todos}
					onDeleteAllTodos={onDeleteAllTodos}
					onDoneAllTodos={onDoneAllTodos}
				/>
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
		onDoneAllTodos: bindActionCreators(todoActions.onDoneAllTodos, dispatch),
		onAddTodo: bindActionCreators(todoActions.onAddTodo, dispatch),
		onChangeTodoText: bindActionCreators(todoAddActions.onChangeTodoText, dispatch),
		onShowTodoInfo: bindActionCreators(todoActions.onShowTodoInfo, dispatch),
		onToggleTodo: bindActionCreators(todoActions.onToggleTodo, dispatch),
		onLoadAllTodos: bindActionCreators(todoActions.loadTodos, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);