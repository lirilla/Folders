import React, { Component } from 'react';
import ImagesBox from './ImagesBox'
import { connect } from 'react-redux'
import { fetchImagesIfNeeded } from '../actions/files'

class FilesPage extends Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchImagesIfNeeded())
	}

  	render() {
	    return (
	     	<div className="container">
				<ImagesBox />
			</div>
	    );
  }
}

function mapStateToProps(state) {
	const { 
		isFetching,
		folders,
		items
	} = { isFetching: true, folders: [], items: [] }

	return {
		isFetching,
		folders,
		items
	}
}

export default connect(mapStateToProps)(FilesPage)