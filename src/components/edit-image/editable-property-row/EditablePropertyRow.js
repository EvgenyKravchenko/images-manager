import React, { Component } from 'react';

import './editable-property-row.css';

export default class EditablePropertyRow extends Component {
	constructor(props) {
		super(...arguments);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			editing: false
		};
	}

	handleChange(e) {
		e && this.props.onChange(e.target.value);

		if(this.props.type === 'select') {
			this.setEditMode(false);
		}
	}

	setEditMode(editing) {
		this.setState({ editing });
	}

	getSelect(value) {
		return (
			<select autoFocus className="value" value={value} onChange={this.handleChange} onBlur={ () => this.setEditMode(false)}>
				{ this.props.options.map(option => (<option key={option} value={option}>{option}</option>) ) }
			</select>
		);
	}

	getMultiline(value) {
		return <textarea
			className="value"
			type="text"
			value={value || ''}
			onChange={this.handleChange}
			onBlur={ () => this.setEditMode(false)} />;
	}

	getInput(value) {
		return <input
			className="value"
			type="text"
			value={value || ''}
			onChange={this.handleChange}
			onBlur={ () => this.setEditMode(false)} />;
	}


	getEditMode() {
		const { value, type } = this.props;

		switch (type) {
			case 'multiline': return this.getMultiline(value);
			case 'select': return this.getSelect(value);

			default: return this.getInput(value);
		}
	}

	getReadMode() {
		const value = this.props.value || '[empty value]';

		return <span className="read-value" onClick={() => this.setEditMode(true) }>{value}</span>
	}


	render() {
		return (
			<div className="editable-property-row-component">
				<span className="label">{this.props.label}:</span>
				{ this.state.editing ? this.getEditMode() : this.getReadMode() }
			</div>
		);
	}
}