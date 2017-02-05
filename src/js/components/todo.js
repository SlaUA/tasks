import React, {
	PropTypes,
	Component
} from 'react';

export default class Todo extends Component {
	
	onChangeTodoText() {
		
		this.props.onChangeTodo.bind(this.props.id, 'blah');
	}
	
	render() {
		
		const {
			todoText,
			number
		} = this.props;
		
		return (
			<div className="todo" data-done={this.props.isDone} onClick={this.props.onToggleTodo.bind(null, this.props.id)}>
				<div className="todoNumber">{number + 1}</div>
				<div className="todoText"
				     onClick={
					     this.props.onChangeTodo.bind(null, this.props.id, 'blah')
				     }>{todoText}</div>
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
	onChangeTodo: PropTypes.func.isRequired,
	onToggleTodo: PropTypes.func.isRequired
};