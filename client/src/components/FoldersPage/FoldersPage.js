import React, { Component } from 'react';
import CreateFolder from '../../containers/CreateFolder'
import { connect } from 'react-redux'
import FoldersList from './FoldersList'
import { fetchFoldersIfNeeded } from '../../actions/folders'

class FoldersPage extends Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchFoldersIfNeeded())
	}

	render() {
		return (
		  <div>
		    <h1>Folders</h1>
		    <CreateFolder />
		    <FoldersList />
		  </div>
		);
	}
}

function mapStateToProps(state) {
	const { isFetching, folders } = { isFetching: true, folders: [] }
	return { isFetching, folders }
}

export default connect(mapStateToProps)(FoldersPage)