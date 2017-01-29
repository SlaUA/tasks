import React, {
	PropTypes,
	Component
} from 'react';
import Todo from './todo';

export default class TodoList extends Component {
	
	render() {
		const {onDeleteTodo, onChangeTodo} = this.props;
		const todos = this.props.todos.map((todo, index) => {
			return (
				<Todo key={todo.id}
				      number={index}
				      id={todo.id}
				      todoText={todo.text}
				      onChangeTodo = {onChangeTodo}
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
	onChangeTodo: PropTypes.func.isRequired
};