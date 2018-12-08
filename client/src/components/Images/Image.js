import React from 'react'
import PropTypes from 'prop-types'
import style from '../../styles/Image.less';

let Image = ({ id, title, description, selected, toggleCheck }) => {
	return (
		<div className = { style.image } >	
			<div className = { style.image__wrapper } >
			<input type="checkbox" onClick = { () => toggleCheck(id) } />
				<img src={`/uploads/${title}.jpg`} />
				<div className="image__title">
					{ title }
				</div>
				<div className="image__title">
					{ description }
				</div>
				<div className="image__selected">
					{ selected }
				</div>
			</div>
		</div>
	)
}

export default Image