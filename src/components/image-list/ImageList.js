import React from 'react';
import ImageListItem from '../image-list-item/ImageListItem';

import './image-list.css';

export default ({ images }) => {
	return (
		<div className="image-list-component">
			<h2>Collection</h2>
			<div className="image-container">
				{ images.map((image, i) => <ImageListItem key={i} image={image} />) }
			</div>
		</div>
	);
}