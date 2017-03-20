import React from 'react';

const STYLES = {
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		position: 'fixed',
		width: '100%',
		height: '100%',
		backgroundColor: 'grey',
		opacity: 0.8,
		zIndex: 10
	},
	message: {
		color: 'white',
		fontSize: '30px'
	}
};

export default () => {
	return (
		<div style={STYLES.container}>
			<div style={STYLES.message}>Loading...</div>
		</div>
	);
}