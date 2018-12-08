import images from './images'
import { REQUEST_FOLDERS, RECEIVE_FOLDERS, SAVING_FOLDERS, SAVED_FOLDERS, GET_FOLDER } from '../actions/folders'

const folder = (state, action) => {
	switch (action.type) {
		case 'ADD_FOLDER':
			return {
				_id: action._id,
				name: action.title,
			}
		case 'GET_FOLDER':
			return {

			}
		default:
			return state
	}
}


const folders = (state = {
		folders: [],
		isFetching: false
	}, action) => {
	switch (action.type) {
		case REQUEST_FOLDERS:
			return Object.assign({}, state, {
				isFetching: true,
			})
	    case RECEIVE_FOLDERS:
	    	return {
	    		...state,
	    		isFetching: false,
	    		folders: action.folders
	    	}
		case SAVING_FOLDERS:
			return Object.assign({}, state, {
				isFetching: true,
			})
		case SAVED_FOLDERS: 
			return Object.assign({}, state, {
	    		isFetching: false,
	    		folders: [
	    			...state.folders,
	    			action.folder
	    		]
	    	})	    
		default:
			return state
	}
}

export default folders