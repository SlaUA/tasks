import React, {
	PropTypes,
	Component
} from 'react';
import Todo from './todo';

export default class TodoListManager extends Component {
	
	render() {
		const {onDeleteAllTodos, onToggleAllTodos} = this.props;
		return (
			<div className="allTodosManager">
				<div className="deleteAllTodos" onClick={onDeleteAllTodos}>Удалить все!</div>
				<div className="toggleAllTodos" onClick={onToggleAllTodos}>Инвертировать все!</div>
			</div>
		)
	}
}

TodoListManager.propTypes = {
	onDeleteAllTodos: PropTypes.func.isRequired,
	onToggleAllTodos: PropTypes.func.isRequired
};