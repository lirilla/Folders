import { REQUEST_IMAGES, RECEIVE_IMAGES, SAVING_IMAGES, SAVED_IMAGES } from '../actions/files'

const image = (state, action) => {
	switch (action.type) {
		case 'ADD_IMAGE':
			return {
				id: action.id,
				title: action.title,
				description: action.description,
				selected: false,
			}

		case 'TOGGLE_IMAGE': 
			if (state.id !== action.id) {
			    return state
			}

			return Object.assign({}, state, {
			    selected: !state.selected
			})

		default:
			return state
	}
}

const images = (state, action) => {
	switch (action.type) {
		case 'ADD_IMAGE':
			return [
				...state,
				image(undefined, action)
			]
		case 'TOGGLE_IMAGE': 
			return Object.assign({}, state, {
				isFetching: state.isFetching,
				items: state.items.map(i => image(i, action))
			})	
		case REQUEST_IMAGES:
			return Object.assign({}, state, {
				isFetching: true,
			})
	    case RECEIVE_IMAGES:
	    	return {
	    		...state,
	    		isFetching: false,
	    		images: action.images
	    	}
		case SAVING_IMAGES:
			return Object.assign({}, state, {
				isFetching: true,
			})
		case SAVED_IMAGES: 
			return Object.assign({}, state, {
	    		isFetching: false,
	    		items: [
	    			...state.items,
	    			action.image
	    		]
	    	})
		default:
			return state
	}
}

export default images