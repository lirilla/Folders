const uuidv1 = require('uuid/v1')
import 'whatwg-fetch';

export const REQUEST_IMAGES = 'REQUEST_IMAGES'
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES'
export const SAVING_IMAGES = 'SAVING_IMAGES'
export const SAVED_IMAGES = 'SAVED_IMAGES'

export const addImage = (folder, props) => {
	let data = {
		id: uuidv1(),
		title: props.title,
		description: props.description,
		file: props.file,
		selected: false,
	}
	return (dispatch, getState) => {
		return dispatch(saveImage(folder, data))
	}
}

export const toggleImage = (id) => {
	return {
		type: 'TOGGLE_IMAGE',
		id
	}
}

function requestImages () {
	return {
		type: REQUEST_IMAGES,
	}
}

function fillCurrentFolder(json) {
	return {
		type: 'FILL_FOLDER',
		images: json.data,
	}
}

function savingImages (data) {
	return {
		type: SAVING_IMAGES,
	}
}

function savedImages (data) {
	return {
		type: SAVED_IMAGES,
		image: {
			id: data.id,
			title: data.title,
			description: data.description
		}
	}
}

function fetchImages(folder) {
	let url;
	if (folder) {
		url = `/api/folder/${folder}/images`;
	}
	else {
		url = `/api/images`;
	}

	return dispatch => {
		dispatch(requestImages())
		return fetch(url, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then(response => response.json())
			.then(json => dispatch(fillCurrentFolder(json)))
	}
}

function saveImage(folder, data) {
	let formData = new FormData();
	formData.append('id', data.id);
	formData.append('title', data.title);
	formData.append('description', data.description);
	formData.append('file', data.file);
	formData.append('folder', folder);

	return dispatch => {
		dispatch(savingImages())
		return fetch(`/api/images`, {
				method: 'POST',
				body: formData
			})
			.then(response => response.json())
			.then(() => dispatch(savedImages(data)))
	}
}

export function fetchImagesIfNeeded(folder) {
	return (dispatch, getState) => {
		return dispatch(fetchImages(folder))
	}
}