import React, { Component } from 'react';
import './Navbar.css';

export default class Navbar extends Component {

    constructor(props){
        super(props);
        this.props = props;
    }

    render() {
        return (
            <>
                <nav className="navbar">
                    <ul className='navbar-list'>
                        <li className='navbar-listItem'><img src='/logo.jpg' alt="logo" style={{'width':'30px'}} /></li>
                        <li className='navbar-listitem'><strong>{this.props.title}</strong></li>
                    </ul>
                </nav>
            </>
        )
    }
}
