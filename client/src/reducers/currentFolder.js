const currentFolder = (state = {folder_info: {}, images: []}, action) => {
	switch (action.type) {
		case 'GET_FOLDER':
			return {
				folder_info: action.folder,
				images: []
			}
		case 'FILL_FOLDER':
			return {
				...state, 
				images: action.images
			}
		default: 
			return state
	}
};

export default currentFolder;