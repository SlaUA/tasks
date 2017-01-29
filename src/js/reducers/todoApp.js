import * as todoActions from '../constants/todo';

const initialState = {
	
	getTodoIndex(todoId) {
		return this.todos.map((todo) => todo.id).indexOf(todoId);
	},
	
	todos: [
		{
			id: Date.now(),
			text: 'Learn redux with react'
		}
	]
};

export default (state = initialState, action) => {
	
	let index;

	switch (action.type) {
		case todoActions.ADD_TODO:
			return {
				...state,
				todos: [
					...state.todos,
					{
						id: Date.now(),
						text: (action.payload || 'Example text')
					}
				]
			};
		
		case todoActions.DELETE_TODO:
			
			index = state.getTodoIndex(action.payload);
			
			if (!~index) {
				return state;
			}
			return {
				...state,
				todos: state.todos.slice(0, index).concat(state.todos.slice(index + 1))
			};
		
		case todoActions.CHANGE_TODO:
			
			index = state.getTodoIndex(action.payload.id);
			
			if (!~index) {
				return state;
			}
			return {
				...state,
				todos: state.todos
				            .slice(0, index)
				            .concat([Object.assign(state.todos[index], {text: action.payload.text})])
				            .concat(state.todos.slice(index + 1))
			};
		default:
			return state;
	}
}