import React, {
	PropTypes,
	Component
} from 'react';
import Todo from './todo';
import '../../styles/todoList.css';

export default class TodoList extends Component {

	render() {
		const {onDeleteTodo, onShowTodoInfo, onChangeTodo} = this.props,
		todos = this.props.todos.map((todo, index) => {
			
			return (
				<Todo key={todo.id}
				      number={index}
				      id={todo.id}
				      isDone={todo.isDone}
				      todoText={todo.text}
				      onShowTodoInfo={onShowTodoInfo}
				      onChangeTodo={onChangeTodo}
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
	onChangeTodo: PropTypes.func.isRequired
};