import * as spinnerActions from '../constants/loadSpinner';

const initialState = {
	isVisible: false
};

export default (state = initialState, action) => {
	
	switch (action.type) {
		
		case spinnerActions.SHOW_SPINNER:
			return {
				...state,
				isVisible: true
			};
		
		case spinnerActions.HIDE_SPINNER:
			
			return {
				...state,
				isVisible: false
			};
		
		default:
			return state;
	}
}