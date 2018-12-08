import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class FolderDetail extends Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		
	}

	render() {
		return (
			<div className="folder">	
				<div className="folder__wrapper">
					<h1>{this.props.folder ? this.props.folder.name : 'No name' }</h1>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log(state)
	return {
		folder: state.currentFolder.folder_info
	}
}

export default connect(mapStateToProps)(FolderDetail)