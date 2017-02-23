import * as aboutTodoAction from '../constants/aboutTodo';
import * as todoAppActions from '../constants/todoApp';

const initialState = {
	todoText: null,
	isDone: null
};

export default (state = initialState, action) => {
	
	switch (action.type) {
		
		case aboutTodoAction.CHANGE_ABOUT_TEXT:
			return {
				...state,
				todoText: action.payload
			};
		
		case aboutTodoAction.CHANGE_ABOUT_DONE:
			
			return {
				...state,
				isDone: action.payload
			};
			
		case todoAppActions.LOCATION_CHANGE:
			return initialState;
		
		default:
			return state;
	}
}