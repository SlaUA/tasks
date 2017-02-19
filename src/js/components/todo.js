import React, {
	PropTypes,
	Component
} from 'react';

export default class Todo extends Component {
	
	render() {
		
		const {
			todoText,
			number
		} = this.props;
		
		return (
			<div className="todo" data-done={this.props.isDone} >
				<div className="todoNumber">{number + 1}</div>
				<div className="todoText" onClick={this.props.onShowTodoInfo.bind(null, this.props.id)}>
					{todoText}
				</div>
				<div className="todoToggleWrapper">
					<input 
					id={'todoToggle_'+(number+1)}
					type="checkbox" 
					className="todoToggle" 
					onChange={this.props.onToggleTodo.bind(null, this.props.id)} />
					<label htmlFor={'todoToggle_'+(number+1)}/>
				</div>
				<div className="todoRemove" onClick={this.props.onDeleteTodo.bind(null, this.props.id)}>&#10006;</div>
			</div>
		);
	}
}

Todo.propTypes = {
	todoText: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	isDone: PropTypes.bool.isRequired,
	number: PropTypes.number.isRequired,
	onDeleteTodo: PropTypes.func.isRequired,
	onShowTodoInfo: PropTypes.func.isRequired,
	onToggleTodo: PropTypes.func.isRequired
};