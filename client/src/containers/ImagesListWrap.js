import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleEdit, deleteSticker, saveSticker, toggleImage } from '../actions/files'
import ImagesList from '../components/Images/ImagesList'

const getAllImages = (state) => {
    //console.log(state);
    return state.currentFolder.images
}

const mapStateToProps = (state) => {
    return {
        images: getAllImages(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onImageToggleCheck: (id) => dispatch(toggleImage(id))
    }
}

const ImagesListWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImagesList)

export default ImagesListWrap