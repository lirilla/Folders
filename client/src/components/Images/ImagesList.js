import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'

const ImagesList = ({ images, onImageToggleCheck }) => (
    images.map(image =>
      <Image
        key = {image.id}
        {...image}
        id = {image.id}
        toggleCheck = {onImageToggleCheck}
      />
    )
)

/*ImagesList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired).isRequired,
}*/

export default ImagesList