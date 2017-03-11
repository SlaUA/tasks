import React, {
	PropTypes,
	Component
} from 'react';
import '../../styles/addTodo.css';

export default class AddTodo extends Component {

	onChangeText(e) {
		this.props.onChangeTodoText(e.target.value);
	}

	onAddTodoClick() {
		this.props.onAddTodo(this.props.newTodoText);
		this.props.onChangeTodoText('');
	}

	onInputClick(e) {

		let ENTER_KEY = 13;

		if (e.which !== ENTER_KEY) {
			return;
		}
		this.props.onAddTodo(this.props.newTodoText);
		this.props.onChangeTodoText('');
	}

	render() {

		const {newTodoText} = this.props;
		return (
			<div className="addTodo">
				<input onKeyDown={this.onInputClick.bind(this)}
					   className="addTodoText"
					   placeholder="Текст заметки"
					   onChange={this.onChangeText.bind(this)}
					   value={newTodoText}
					   type="text"/>
				<button className="addTodoButton"
						onClick={this.onAddTodoClick.bind(this)}>
					Добавить
				</button>
			</div>
		);
	}
}

AddTodo.propTypes = {
	newTodoText: PropTypes.string.isRequired,
	onChangeTodoText: PropTypes.func.isRequired,
	onAddTodo: PropTypes.func.isRequired
};