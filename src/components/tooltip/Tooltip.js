import React from 'react';

import './tooltip.css';

export default ({ position, text, children }) => {
	const tooltipTextClasses = `tooltip-text ${position}`;

	return (
		<div className="tooltip-component">
			<div className="tooltip-content">
				{children}
			</div>
			<div className={tooltipTextClasses}>{text || 'no text'}</div>
		</div>
	);
}