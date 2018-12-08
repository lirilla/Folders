import React from 'react'
import { connect } from 'react-redux'
import { createFolder } from '../actions/folders'

let CreateFolder = ({ dispatch }) => {
	let props
	let name

	return (
		<div className="create_folder">
			<form 
				onSubmit = {e => {
				e.preventDefault()
				if (!name.value.trim()) {
					return
				}

				props = {
					name: name.value,
				}

				dispatch(createFolder(props))
				name.value = ''
			}}>
				<input 
					placeholder="Name"
					ref={node => {name = node}} />
				<br/>
				<button type="submit">
					Create folder
				</button>
			</form>
		</div>
	)
}

CreateFolder = connect()(CreateFolder)

export default CreateFolder