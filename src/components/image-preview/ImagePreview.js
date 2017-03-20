import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditablePropertyRow from '../edit-image/editable-property-row/EditablePropertyRow';
import Tooltip from '../tooltip/Tooltip';
import * as ImageActions from '../../actions/image';
import cursors from '../../utils/cursors';
import './image-preview.css';

class ImagePreview extends Component {

	constructor(props) {
		super(...arguments);

		if (!props.image && !props.fetchedImage) {
			props.actions.fetchImage(this.props.match.params.id);
		}

		this.state = {
			position: 'right',
			image: props.image
		};
	}

	componentDidMount() {
		setTimeout(() => {this.setState({show: true})}, 100);
	}

	onChange(key, value) {
		const image = Object.assign({}, this.state.image, {[key]: value});

		this.setState({ image });
	}

	saveImage() {
		this.props.onSave(this.state.image);
		this.backToEditPage();
	}


	backToEditPage() {
		this.setState({show: false});

		setTimeout(() => {
			const url = this.context.router.route.location.pathname;
			this.context.router.history.push(url.substring(0, url.indexOf('/preview')));
		}, 100);
	}

	render() {
		const { position, image } = this.state;
		const { tooltip, cursor, dataUrl } = image;
		const show = this.state.show ? 'show' : '';
		const rootClasses = `image-preview-component ${show}`;

		return (
			<div className={rootClasses}>
				<div>
					<h3>Preview</h3>

					<div className="controls">
						<EditablePropertyRow
							key="position"
							type="select"
							label="Tooltip position"
							value={position}
							options={ ['left', 'right', 'top', 'bottom'] }
							onChange={position => this.setState({ position })} />

						<EditablePropertyRow
							key="cursor"
							type="select"
							label="Cursor"
							value={cursor}
							options={cursors}
							onChange={value => this.onChange('cursor', value)} />

						<EditablePropertyRow
							key="tooltip"
							label="Tooltip text"
							value={tooltip}
							onChange={value => this.onChange('tooltip', value)} />
					</div>
				</div>

				<Tooltip position={position} text={tooltip}>
					<img style={{cursor: cursor || 'auto'}} className="image-preview" src={dataUrl} />
				</Tooltip>

				<div className="buttons">
					<button className="cancel-button" onClick={this.backToEditPage.bind(this)}>Cancel</button>
					<button className="save-button" onClick={this.saveImage.bind(this)}>Save</button>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state, props) {
	const image = state.images.find(image => image && image.id === props.match.params.id);

	return {
		fetchedImage: image,
		image: props.image
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ImageActions, dispatch)
	}
}

ImagePreview.contextTypes = {
	router: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview);