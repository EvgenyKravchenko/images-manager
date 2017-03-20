import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import EditablePropertyRow from './editable-property-row/EditablePropertyRow';
import ImagePreview from '../image-preview/ImagePreview';
import cursors from '../../utils/cursors';
import './edit-image.css';

export default class EditImage extends Component {
	constructor(props) {
		super(...arguments);

		this.state = {
			image: props.image
		};
	}

	onSaveClick() {
		this.saveImage(this.state.image);
	}

	onPreviewClick() {
		this.props.onPreview();
	}

	saveImage(image) {
		this.setState( { image });
		this.props.onSave({
			image,
			originalName: this.props.image.name
		});
	}

	deleteImage() {
		this.props.onDelete(this.props.image);
	}

	onChange(key, value) {
		const image = Object.assign({}, this.state.image, {[key]: value});

		this.setState({ image });
	};

	render() {
		const { image } = this.state;
		const { name, description, cursor, tooltip } = image;
		const { dataUrl } = this.props.image;
		const deleteLabel = this.props.pending ? 'Discard' : 'Delete';

		return (
			<div className="edit-image-component">
				<img className="image" src={dataUrl} alt="Image" />
				<div className="details-container">
					<EditablePropertyRow
						key="name"
						label="Name"
						value={name}
						onChange={value => this.onChange('name', value)} />

					<EditablePropertyRow
						key="description"
						type="multiline"
						label="Description"
						value={description}
						onChange={value => this.onChange('description', value)} />

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
					<div className="buttons">
						{
							!this.props.pending ?
							<button className="preview-button" onClick={this.onPreviewClick.bind(this)}>Preview</button> :
							null
						}
						<button className="save-button" onClick={this.onSaveClick.bind(this)}>Save</button>
						<button className="delete-button" onClick={this.deleteImage.bind(this)}>{deleteLabel}</button>
					</div>
				</div>
				<Route path="/images/:id/preview"
		       render={ ({ match }) => {
		       	return <ImagePreview
			        onSave={this.saveImage.bind(this)}
			        image={image}
			        match={match} />}
		       } />
			</div>
		);
	}
}


