import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as aboutTodoActions from '../actionCreators/aboutTodo';
import * as todoActions from '../actionCreators/todo';
import '../../styles/aboutTodo.css';

class aboutTodo extends Component {

    onChangeText(e) {
        this.props.onChangeAboutText(e.target.value);
    }

    render() {

        let {todos} = this.props,
            currentTodo = todos.find((todo) => todo.id === Number(this.props.routeParams.id)),
            todoText = this.props.todoText === null ? currentTodo.text : this.props.todoText,
            isCheckedTodo = this.props.isDone === null ? currentTodo.isDone : this.props.isDone;

        return (
            <div className="aboutWrapper">
                <div className="aboutHeader">Change todo</div>
                <div className="aboutBody">

                    <textarea className="aboutTodoText"
                              value={todoText}
                              onChange={this.onChangeText.bind(this)}/>

                    <div className="aboutTodoDone">
                        <span>Отметить как выполненное:</span>

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
                           onClick={this.props.onChangeTodo.bind(this, {
                               id: currentTodo.id,
                               text: todoText,
                               isDone: isCheckedTodo
                           })}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeAboutText: bindActionCreators(aboutTodoActions.onChangeAboutText, dispatch),
        onChangeAboutDone: bindActionCreators(aboutTodoActions.onChangeAboutDone, dispatch),
        onChangeTodo: bindActionCreators(todoActions.onChangeTodo, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(aboutTodo);