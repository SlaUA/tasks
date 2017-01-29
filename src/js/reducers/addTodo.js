import * as todoActions from '../constants/todo';

const initialState = {
	newTodoText: ''
};

export default (state = initialState, action) => {
	
	switch (action.type) {

		case todoActions.CHANGE_TEXT:
			return {
				...state,
				newTodoText: action.payload
			};
		
		case todoActions.CLEAR_TEXT:
			
			return {
				...state,
				newTodoText: ''
			};
		default:
			return state;
	}
}