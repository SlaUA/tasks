import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as indicatorActors from '../actionCreators/messagesIndicator';
import {bindActionCreators} from 'redux';
import '../../styles/messagesIndicator.css';

class messagesIndicator extends Component {
	
	render() {
		
		const messages = this.props.messages.map((item, i) => {
			return <div className="message" key={item.id} onClick={() => this.props.onMessageRemove(i)}>
				{item.text}
			</div>
		});
		
		return (
			<div className="messagesIndicatorWrapper">
				<ReactCSSTransitionGroup className="messagesWrapper"
					transitionName="messageIndicator"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}>
					{messages}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	messages: state.messagesIndicatorReducer.messages
});

const mapDispatchToProps = (dispatch) => {
	window.onMessageAdd = bindActionCreators(indicatorActors.onMessageAdd, dispatch);
	return {
		onMessageAdd: bindActionCreators(indicatorActors.onMessageAdd, dispatch),
		onMessageRemove: bindActionCreators(indicatorActors.onMessageRemove, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(messagesIndicator);