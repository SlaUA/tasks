import React, {
	Component
} from 'react';
import PropTypes from  'prop-types';
import '../../styles/todoManager.css';

export default class TodoListManager extends Component {
	
	render() {
		const {onDeleteAllTodos, onDoneAllTodos, todos} = this.props;
		return (
			<div className="allTodosManager">
				<div className="deleteAllTodos" onClick={onDeleteAllTodos}>Удалить всё</div>
				<div className="toggleAllTodos" onClick={onDoneAllTodos.bind(null, todos)}>Выполнить всё</div>
			</div>
		)
	}
}

TodoListManager.propTypes = {
	todos: PropTypes.array.isRequired,
	onDeleteAllTodos: PropTypes.func.isRequired,
	onDoneAllTodos: PropTypes.func.isRequired
};