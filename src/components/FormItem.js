import React from 'react';

export default class FormItem extends React.Component {
	render() {
		const {label, children, valid, error} = this.props;
		return(
			<div>
				<label>{label}</label>
				{children}
				{!valid && <span>{error}</span>}
			</div>
		)
	}
} 