import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Folder from '../Folder/Folder'
import { connect } from 'react-redux'
import style from '../../styles/Folder.less'

class FoldersList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
    }

    render() {
        return (
            <div className={style.folders__list}>
                { this.props.isFetching && <> <div className="folders__loading">Loading...</div> </> }
                
                { 
                    this.props.folders.map(folder =>
                    <Folder
                        key = {folder._id}
                        id = {folder._id}
                        {...folder}
                        />
                    ) 
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { isFetching, folders } =  { isFetching: state.folders.isFetching, folders: state.folders.folders }
    return { isFetching, folders }
}

export default connect(mapStateToProps)(FoldersList)