import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/page404.css';
import {Link} from 'react-router-dom';

class aboutTodo extends Component {

    render() {

        return (
            <div>
                <div>404!</div>
                <Link to='/'>HOME</Link>
            </div>
        );
    }
}

export default connect(null, null)(aboutTodo);