import * as addTodoActions from '../constants/addTodo';

const initialState = {
	newTodoText: ''
};

export default (state = initialState, action) => {
	
	switch (action.type) {

		case addTodoActions.CHANGE_TEXT:
			return {
				...state,
				newTodoText: action.payload
			};
		
		case addTodoActions.CLEAR_TEXT:
			
			return {
				...state,
				newTodoText: ''
			};
		default:
			return state;
	}
}