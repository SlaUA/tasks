import * as authActions from '../constants/authActions';

function getCookie(cookieName) {
	
	let name = cookieName + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

let initialState = {
	isLoggedIn: Boolean(getCookie('x-user')),
	user: null
};

initialState.user = initialState.isLoggedIn ? JSON.parse(getCookie('x-user')) : null;

export default (state = initialState, action) => {
	
	switch (action.type) {
		
		case authActions.LOGGED_IN_SUCCESSFULLY:
			return {
				...state,
				user: action.payload.user,
				isLoggedIn: true
			};
		
		case authActions.REGISTERED_SUCCESFULLY:
			
			return {
				...state,
				newTodoText: ''
			};
		default:
			return state;
	}
}