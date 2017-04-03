import * as messagesIndicatorActions from '../constants/messagesIndicator';

const initialState = {
	messages: []
};

export default (state = initialState, action) => {
	
	switch (action.type) {
		
		case messagesIndicatorActions.ADD_MESSAGE:
			return {
				...state,
				messages: [
					...state.messages,
					{
						id: Date.now(),
						text: action.payload
					}
				]
			};
		
		case messagesIndicatorActions.REMOVE_MESSAGE:
			
			return {
				...state,
				messages: state.messages.slice(0, action.payload)
				               .concat(state.messages.slice(action.payload + 1))
			};
		
		default:
			return state;
	}
}