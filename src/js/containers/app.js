import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActionCreators from '../actionCreators/todo';
import * as todoAddActionCreators from '../actionCreators/addTodo';
import TodoList from '../components/todoList';
import AddTodo from '../components/addTodo';
import TodoListManager from '../components/todoListManager';

class App extends Component {
	
	componentDidMount() {
		
		this.props.onLoadAllTodos();
	}
	
	render() {
		
		const {
			onDeleteTodo,
			onAddTodo,
			onShowTodoInfo,
			onChangeTodoText,
			onChangeTodo,
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
					onChangeTodo={onChangeTodo}
					onShowTodoInfo={onShowTodoInfo}
					todos={todos}
					onDeleteTodo={onDeleteTodo}/>
				<TodoListManager
					todos={todos}
					onDeleteAllTodos={onDeleteAllTodos}
					onDoneAllTodos={onDoneAllTodos}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	todos: state.todoAppReducer.todos,
	newTodoText: state.addTodoReducer.newTodoText
});

const mapDispatchToProps = (dispatch) => ({
	onDeleteTodo: bindActionCreators(todoActionCreators.onDeleteTodo, dispatch),
	onDeleteAllTodos: bindActionCreators(todoActionCreators.onDeleteAllTodos, dispatch),
	onDoneAllTodos: bindActionCreators(todoActionCreators.onDoneAllTodos, dispatch),
	onAddTodo: bindActionCreators(todoActionCreators.onAddTodo, dispatch),
	onChangeTodoText: bindActionCreators(todoAddActionCreators.onChangeTodoText, dispatch),
	onShowTodoInfo: bindActionCreators(todoActionCreators.onShowTodoInfo, dispatch),
	onChangeTodo: bindActionCreators(todoActionCreators.onChangeTodo, dispatch),
	onLoadAllTodos: bindActionCreators(todoActionCreators.loadTodos, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);