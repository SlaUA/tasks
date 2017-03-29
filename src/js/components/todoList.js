import React, {
	PropTypes,
	Component
} from 'react';
import Todo from './todo';
import '../../styles/todoList.css';

export default class TodoList extends Component {

	render() {
		const {onDeleteTodo, onShowTodoInfo, onToggleTodo} = this.props;
		const todos = this.props.todos.map((todo, index) => {
			return (
				<Todo key={todo.id}
				      number={index}
				      id={todo.id}
				      _id = {todo._id.$oid}
				      isDone={todo.isDone}
				      todoText={todo.text}
				      onShowTodoInfo={onShowTodoInfo}
				      onToggleTodo={onToggleTodo}
				      onDeleteTodo={onDeleteTodo}/>
			)
		});

		return (
			<div className="todoList">
				{todos}
			</div>
		);
	}
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	onDeleteTodo: PropTypes.func.isRequired,
	onShowTodoInfo: PropTypes.func.isRequired,
	onToggleTodo: PropTypes.func.isRequired
};