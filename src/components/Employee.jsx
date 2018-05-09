import React, { Component } from 'react';

class Employee extends Component {
    render() {
        return (
            <li className="employees__item">
                <div className="employees__img-wrapper">
                    <img src={ this.props.avatar } alt={ this.props.lname }/>
                </div>
                <div><strong>First name:</strong> { this.props.fname }</div>
                <div><strong>Last Name:</strong> { this.props.lname }</div>
                <div><strong>Email:</strong> { this.props.email }</div>
                <div><strong>Adress:</strong> { this.props.adress }</div>
                <div><strong>Phone:</strong> { this.props.phone }</div>
            </li>
        )
    }
}

export default Employee;