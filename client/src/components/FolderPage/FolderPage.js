import React, { Component } from 'react'
import { setCurrentFolder } from '../../actions/folders'
import { connect } from 'react-redux'
import FolderDetail from './FolderDetail'
import ImagesBox from '../Images/ImagesBox'
import { Link } from 'react-router';

class FolderPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(setCurrentFolder(this.props.params.id))
	}
	
	render() {
		return (
			<div>
				<Link to={`/`}>Back to all</Link>
				<FolderDetail folder = { this.props.folder }/>
				<ImagesBox folder = { this.props.params.id } />
			</div> 
		);
	}
}

function mapStateToProps(state) {
	console.log('State', state)
	return {
		folder: state.currentFolder.folder_info
	}
}

export default connect(mapStateToProps)(FolderPage)