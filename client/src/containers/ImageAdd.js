import React from 'react'
import { connect } from 'react-redux'
import { addImage } from '../actions/files'

let ImageAdd = ({ dispatch, folder }) => {
	let props
	let title, description, file

	const changeFile = (e) => {
		file = e.target.files[0]
	}

	return (
		<div className="image_add">
			<div className="image_add__wrapper">
			<form 
				onSubmit = {e => {
				e.preventDefault()
				if (!title.value.trim() || !description.value.trim() || !file) {
					return
				}

				props = {
					title: title.value,
					description: description.value,
					file: file
				}

				dispatch(addImage(folder, props))
				title.value = ''
				description.value = ''
				file = ''
			}}>
				<input 
					placeholder="Image title"
					ref={node => {title = node}} />
					<br/>
				<input 
					placeholder="Image description"
					ref={node => {description = node}} />
					<br/>
				<input 
					type='file'
					name='file'
					onChange = { changeFile } />
					<br/>
				<button type="submit">
					Add Image
				</button>
			</form>
			</div>
		</div>
	)
}

ImageAdd = connect()(ImageAdd)

export default ImageAdd