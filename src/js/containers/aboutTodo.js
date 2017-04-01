import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as aboutTodoActions from '../actionCreators/aboutTodo';
import * as todoActions from '../actionCreators/todo';
import '../../styles/aboutTodo.css';

class aboutTodo extends Component {
	
	componentWillMount() {
		
		if (this.props.todos.length) {
			return;
		}
		// preload todos after reload
		this.props.loadTodos();
	}
	
	onChangeText(e) {
		this.props.onChangeAboutText(e.target.value);
	}
	
	render() {
		
		let todoAbout = this.props.todos.find((todo) => todo.id === Number(this.props.match.params.id));
		let todoText, isCheckedTodo;
		
		if (!todoAbout) {
			return null;
		}
		
		todoText = this.props.todoText === null ? todoAbout.text : this.props.todoText;
		isCheckedTodo = this.props.isDone === null ? todoAbout.isDone : this.props.isDone;
		
		return (
			<div className="aboutWrapper">
				<div className="aboutHeader">Изменить запись</div>
				<div className="aboutBody">

                    <textarea className="aboutTodoText"
                              value={todoText}
                              onChange={this.onChangeText.bind(this)}/>
					
					<div className="aboutTodoDone" data-done={isCheckedTodo}>
						<span>Отметить как выполненную:</span>
						
						<input
							id="aboutIsDone"
							type="checkbox"
							onChange={this.props.onChangeAboutDone.bind(this, !isCheckedTodo)}
							className="aboutIsDone customCheckbox" checked={isCheckedTodo}/>
						<label htmlFor="aboutIsDone" className="customCheckboxLabel"/>
					</div>
					
					<input type="button"
					       value="Сохранить"
					       className="aboutSaveChanges"
					       onClick={() => this.props.onChangeTodo({
						       id: todoAbout.id,
						       text: todoText,
						       isDone: isCheckedTodo
					       }, true)}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	todos: state.todoAppReducer.todos,
	todoText: state.aboutTodoReducer.todoText,
	isDone: state.aboutTodoReducer.isDone
});

const mapDispatchToProps = (dispatch) => ({
	onChangeAboutText: bindActionCreators(aboutTodoActions.onChangeAboutText, dispatch),
	onChangeAboutDone: bindActionCreators(aboutTodoActions.onChangeAboutDone, dispatch),
	loadTodos: bindActionCreators(todoActions.loadTodos, dispatch),
	onChangeTodo: bindActionCreators(todoActions.onChangeTodo, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(aboutTodo);

