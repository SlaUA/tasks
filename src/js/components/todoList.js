import React, {
	PropTypes,
	Component
} from 'react';
import Todo from './todo';

export default class TodoList extends Component {
	
	render() {
		const {onDeleteTodo, onShowTodoInfo, onToggleTodo} = this.props;
		const todos = this.props.todos.map((todo, index) => {
			return (
				<Todo key={todo.id}
				      number={index}
				      id={todo.id}
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