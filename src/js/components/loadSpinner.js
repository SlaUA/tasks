import React, {Component, PropTypes} from 'react';
import '../../styles/loadSpinner.css';

export default class LoadSpinner extends Component {
	
	render() {

		const {isVisible} = this.props;

		return (
			<div className={"cssload-contain " + (isVisible? "visible":"hidden")}>
				<div className="cssload-dot"/>
				<div className="cssload-dot"/>
				<div className="cssload-dot"/>
				<div className="cssload-dot"/>
				<div className="cssload-dot"/>
			</div>
			);
	}
}

LoadSpinner.propTypes = {
	isVisible: PropTypes.bool.isRequired
};