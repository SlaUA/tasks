import React, {Component} from 'react';

class WholeContainer extends Component {
	
	render() {
		return (
			<div className="wholeWrapper">
				{this.props.children}
			</div>
		);
	}
}

export default WholeContainer;