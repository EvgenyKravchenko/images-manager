import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditImage from '../components/edit-image/EditImage';

import * as ImageActions from '../actions/image';

const STYLES = {
	headingName: {
		padding: '0 10px',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	}
};

export class ImageDetailsPage extends Component {
	constructor(props) {
		super(...arguments);

		if (!props.image) {
			this.refresh();
		}
	}

	handleDelete(image) {
		this.props.actions.deleteImage(image);
		this.props.history.push('/images');
	}

	saveImage(image) {
		this.props.actions.updateImage(image);
	}

	refresh() {
		this.props.actions.fetchImage(this.props.match.params.id);
	}

	render() {
		if (!this.props.image) {
			return null;
		}

		const { image, actions } = this.props;

		return (
			<div className="image-details-page">
				<h1 style={STYLES.headingName}>{image.name}</h1>
				<EditImage
					image={this.props.image}
					onSave={this.saveImage.bind(this)}
					onDelete={this.handleDelete.bind(this)}
					onPreview={() => this.props.history.push(`${this.props.location.pathname}/preview`)}
				/>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	const image = state.images.find(image => image && image.id === props.match.params.id);

	return {
		image
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ImageActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetailsPage);