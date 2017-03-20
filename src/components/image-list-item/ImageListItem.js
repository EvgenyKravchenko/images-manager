import React from 'react';
import { Link } from 'react-router-dom';

import './image-list-item.css';

export default ({ image }) => {
	return (
		<div className="image-list-item-component">
			<div className="image-container">
				<Link to={`/images/${image.id}`} >
					<img className="image" src={image.dataUrl} />
				</Link>
			</div>
			<div className="details">
				<div className="image-name"><strong>{image.name}</strong></div>
				<div>{image.description}</div>
			</div>
		</div>
	);
};