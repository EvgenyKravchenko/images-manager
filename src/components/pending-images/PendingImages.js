import React from 'react';

import EditImage from '../edit-image/EditImage';
// import './pending-images.css';

export default ({ images, onSave, onDiscard }) => (
	<div>
		<h2>Pending images</h2>
		{ images.map(image => {
			return (
				<EditImage key={image.name} image={image} onSave={onSave} onDelete={image => onDiscard(image.name)} pending />
			);
		}) }
		<hr />
	</div>
)
