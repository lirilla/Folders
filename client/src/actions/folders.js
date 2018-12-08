const uuidv1 = require('uuid/v1')
import 'whatwg-fetch';

export const REQUEST_FOLDERS = 'REQUEST_FOLDERS'
export const RECEIVE_FOLDERS = 'RECEIVE_FOLDERS'
export const SAVING_FOLDERS = 'SAVING_FOLDERS'
export const SAVED_FOLDERS = 'SAVED_FOLDERS'
export const GET_FOLDER = 'GET_FOLDER'

export const createFolder = (props) => {
	let data = {
		name: props.name,
	}
	return (dispatch, getState) => {
		return dispatch(saveFolder(data))
	}
}

function saveFolder(data) {
	return dispatch => {
		dispatch(savingFolder())
		return fetch(`/api/folder`, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify({ name: data.name })
			})
			.then(response => response.json())
			.then(response => dispatch(savedFolder(response.data)))
	}
}

function savingFolder (data) {
	return {
		type: SAVING_FOLDERS,
	}
}

function savedFolder (data) {
	return {
		type: SAVED_FOLDERS,
		folder: {
			_id: data._id,
			name: data.name 
		}
	}
}

function fetchFolders() {
	return dispatch => {
		dispatch(requestFolders())
		return fetch(`/api/folders`, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then(response => response.json())
			.then(json => dispatch(receiveFolders(json)))
	}
}

function requestFolders () {
	return {
		type: REQUEST_FOLDERS,
	}
}

function receiveFolders(json) {
	let folders = json.data.map(item => ( { id: item._id, name: item.name, files: [] } ));
	return {
		type: RECEIVE_FOLDERS,
		folders: json.data,
	}
}

function getFolder(folder) {
	return {
		type: 'GET_FOLDER',
		folder: folder
	}
}

export function fetchFoldersIfNeeded() {
	return (dispatch, getState) => {
		return dispatch(fetchFolders())
	}
}


export function setCurrentFolder(id) {
	return (dispatch, getState) => {
		if (getState().folders.length == 0) {
			dispatch(fetchFolder(id))
		}
		else {
			const folder = getState().folders.folders.filter(f => f._id == id)[0];
			return dispatch(getFolder(folder))
		}
	}
}

function fetchFolder(id) {
	return dispatch => {
		//dispatch(requestImages())
		return fetch(`/api/folder/${id}`, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then(response => response.json())
			.then(json => dispatch(receiveFolders(json)))
	}
}