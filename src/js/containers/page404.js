import React, {Component} from 'react';
import '../../styles/page404.css';
import {Link} from 'react-router-dom';

export default class aboutTodo extends Component {
	
	render() {
		
		return (
			<div className="page404Container">
				<p>A problem has been detected on your device.</p>
				<p>If this is the first time you've seen this stop error screen,
					restart your device.
				</p>
				<p>Technical information:</p>
				<p>***STOP: 0x00000054</p>
				<Link to='/'>To the homepage</Link>
			</div>
		);
	}
}