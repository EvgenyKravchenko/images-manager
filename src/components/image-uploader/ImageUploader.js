import React, { Component } from 'react';

import './image-uploader.css';

export default class ImageUploader extends Component {

	constructor() {
		super(...arguments);

		this.state = {
			rejectedFiles: []
		};
	}

	onOver(e) {
		e.stopPropagation();
		e.preventDefault();

		e.dataTransfer.dropEffect = 'copy';
	}

	onFilesChanged(e) {
		e.stopPropagation();
		e.preventDefault();

		const fileSource = e.dataTransfer || e.target;
		const files = [...fileSource.files].filter(file => file.type.includes('image'));
		const rejectedFiles = [...fileSource.files].filter(file => !file.type.includes('image'));

		files.forEach(file => this.loadFile(file));

		this.setState({rejectedFiles});
	}

	loadFile(file) {
		const { name } = file;
		const reader = new FileReader();

		reader.onload = loadEvent => {
			this.props.onLoadImage({
				name,
				dataUrl: loadEvent.target.result,
				createdAt: Date.now()
			});
		};

		reader.readAsDataURL(file);
	}

	render() {
		const { rejectedFiles } = this.state;
		return (
			<div className="image-uploader-component">
				<div className="upload-area"
				     onDragOver={this.onOver}
				     onDrop={ e => this.onFilesChanged(e) }
				>
					<label className="input-file-container">
						<div className="drop-title">Click or Drop files here</div>
						<input onChange={ e => this.onFilesChanged(e) } type="file" style={{display: 'none'}} multiple />
					</label>
				</div>

				<div className="rejected-files">{ rejectedFiles.map(file => <div key={file.name}>(!) {file.name} was rejected</div>)}</div>
			</div>
		);
	}
}