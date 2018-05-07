import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import './css/index.css';
import db from './js/db.json';


// console.log(data.employees);
/*
    здесь будет сортировка (поиск)

const initialState = {
    data: db
};

const rootReducer = ( state = initialState, action ) => {
    return state;
};

const store = createStore(rootReducer);

console.log(store.getState());
*/
class Employee extends Component {
    render() {
        return (
            <li className="employees__item">
                <div className="employees__img-wrapper">
                    <img src={ this.props.avatar } />
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

class EmployeesList extends Component {
    render() {
        return (
            <ul className='employees'>
                {
                    db.employees.map(function(employees){
                        return <Employee
                            key={employees.id}
                            fname={employees.first_name}
                            lname={employees.last_name}
                            email={employees.email}
                            avatar={employees.avatar}
                            adress={employees.adress}
                            phone={employees.phone}
                        />;
                    })
                }
            </ul>
        );
    }
}
export default EmployeesList;

ReactDOM.render(
  <EmployeesList />,
  document.getElementById('root')
);
