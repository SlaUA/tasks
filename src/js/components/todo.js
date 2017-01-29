import React, {
	PropTypes,
	Component
} from 'react';

export default class Todo extends Component {
	
	onChangeTodoText() {
		
		this.props.onChangeTodo(this.props.id, 'blah');
	}
	
	render() {
		
		const {todoText, number} = this.props;
		
		return (
			<div className="todo">
				<div className="todoNumber">{number + 1}</div>
				<div className="todoText" onClick={this.onChangeTodoText.bind(this)}>{todoText}</div>
				<div className="todoRemove" onClick={this.props.onDeleteTodo.bind(this, this.props.id)}>&#10006;</div>
			</div>
		);
	}
}

Todo.propTypes = {
	todoText: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	number: PropTypes.number.isRequired,
	onDeleteTodo: PropTypes.func.isRequired,
	onChangeTodo: PropTypes.func.isRequired
};