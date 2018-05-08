import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import './css/index.css';
import db from './js/db.json';

const initialState = {
    data: db.employees
};

const ACTION_SEARCH_CONTACT = 'ACTION_SEARCH_CONTACT';

const searchContact = (searchQuery) => {
    return {
        type: ACTION_SEARCH_CONTACT,
        payload: searchQuery
    }
}

const rootReducer = ( state = initialState, action ) => {

    if (action.payload === undefined){
        action.payload = '';
    }
    let displayedContacts = {};
        displayedContacts.data = db.employees;


    let search = action.payload.toLowerCase();
    displayedContacts.data = db.employees.filter(function (el) {
        let searchValue = el.first_name.toLowerCase();
        return searchValue.indexOf(search) !== -1;
    })

    return displayedContacts;
};

const store = createStore(rootReducer);

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

        const dispatch = this.props.dispatch;

        return (
            <div className="contacts">
                <div className="contacts__search-wrapper">
                    <span className="contacts__search-title">Search by First Name:</span>
                    <input className="contacts__search" type="text" onChange={(event) => {
                        dispatch(searchContact(event.target.value));
                    }}/>

                    {/*here will be a sorting */}
                </div>
                <ul className='employees'>
                    {
                        this.props.data.map(function(employees){
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
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        data: state.data
    }
};

const WrappedEmployeeList = connect(putStateToProps)(EmployeesList);

ReactDOM.render(
    <Provider store={store}>
        <WrappedEmployeeList />
    </Provider>,
  document.getElementById('root')
);
