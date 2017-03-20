import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ImageUploader from '../components/image-uploader/ImageUploader';
import ImageList from '../components/image-list/ImageList';
import PendingImages from '../components/pending-images/PendingImages';
import * as ImageActions from '../actions/image';


export class ImagesPage extends Component {
	componentDidMount() {
		this.props.actions.fetchImages();
	}

	render() {
		const { images, pendingImages, actions } = this.props;
		const isPending = pendingImages.length > 0;
		const isImagesPresent = images.length > 0;

		return (
			<div className="upload-container">
				<ImageUploader onLoadImage={actions.loadImage} />
				{ isPending ?
					<PendingImages
						images={pendingImages}
						onSave={actions.saveImage}
						onDiscard={actions.removePendingImage} /> :
					null
				}
				{ isImagesPresent ? <ImageList images={images} /> : null }
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	const { images, pendingImages } = state;

	return {
		images,
		pendingImages
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ImageActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesPage);