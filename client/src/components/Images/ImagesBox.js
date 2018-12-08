import React, { Component } from 'react'
import ImageAdd from '../../containers/ImageAdd'
import { connect } from 'react-redux'
import ImagesListWrap from '../../containers/ImagesListWrap'
import { fetchImagesIfNeeded } from '../../actions/files'

class ImagesBox extends Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchImagesIfNeeded(this.props.folder))
	}

	render() {
		return (
			<div className="images_box">
				<ImageAdd folder = {this.props.folder } />
				<ImagesListWrap folder = {this.props.folder } />
			</div>
		)
	}
}

function mapStateToProps(state) {
	const folder = state.folders[0];
	const images = state.folders.images;
	return {
		images,
		folder
	};
}

export default connect(mapStateToProps)(ImagesBox)