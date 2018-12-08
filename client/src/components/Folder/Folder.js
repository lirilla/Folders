import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import style from "../../styles/Folder.less";
let Folder = ({ _id, cover, name }) => {
	const divStyle = {
	  backgroundImage: 'url(' + cover + ')',
	};

	return (
		<div className={ style.folder }>
			<div className={ style.folder__cover } style={divStyle} ></div>
			<Link className={ style.folder__link } to={`/folder/${_id}`}>{name}</Link>
		</div>
	)
}

export default Folder