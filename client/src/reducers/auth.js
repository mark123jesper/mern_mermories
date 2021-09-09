/* eslint-disable import/no-anonymous-default-export */
import { AUTH, LOGOUT } from '../constants/actionTypes';

//logic actions for authentication -> paired with actions folder (refer actions folder)

export default (state = { authData: null }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem('Profile', JSON.stringify({ ...action?.data }));
			return { ...state, loading: false, authData: action?.data };
		case LOGOUT:
			localStorage.clear();
			return { ...state, loading: false, authData: null };
		default:
			return state;
	}
};

// const authReducer = (state, action) => {
//     switch (action.type) {
//         case AUTH:
//             console.log(action?.data)
//         case LOGOUT:
//             console.log(action?.data)
//         default:
//             break;
//     }
// }

// export default authReducer;
