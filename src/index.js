import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import './css/index.css';
import db from './js/db.json';

const initialState = {
    data: db.employees,
    order: 1
};

const ACTION_SEARCH_CONTACT = 'ACTION_SEARCH_CONTACT';
const ACTION_SORT_CONTACT_BY_FIRST_NAME = 'ACTION_SORT_CONTACT_BY_FIRST_NAME';
const ACTION_SORT_CONTACT_BY_LAST_NAME = 'ACTION_SORT_CONTACT_BY_LAST_NAME';

const searchContact = (searchQuery) => {
    return {
        type: ACTION_SEARCH_CONTACT,
        payload: searchQuery
    }
};

const sortContactsByName = () => {
    return {
        type: ACTION_SORT_CONTACT_BY_FIRST_NAME,
        payload: 'first_name'
    }
};

const sortContactsByLastName = () => {
    return {
        type: ACTION_SORT_CONTACT_BY_LAST_NAME,
        payload: 'last_name'
    }
};

const rootReducer = ( state = initialState, action ) => {
    let displayedContacts = {};
        displayedContacts.data = db.employees;
        displayedContacts.order = state.order;

    switch (action.type) {
        case ACTION_SEARCH_CONTACT:
            if (action.payload === undefined){
                action.payload = '';
            }

            let search = action.payload.toLowerCase();
            displayedContacts.data = db.employees.filter((el) => {
                let searchValue = el.first_name.toLowerCase();
                return searchValue.indexOf(search) !== -1;
            });
            return state = displayedContacts;

        case ACTION_SORT_CONTACT_BY_FIRST_NAME:
            displayedContacts.order = state.order + 1;

            displayedContacts.data = db.employees.sort((obj1, obj2) => {
                if (state.order % 2){
                    return obj1[action.payload] > obj2[action.payload];
                } else {
                    return obj1[action.payload] < obj2[action.payload];
                }
            });
            return state = displayedContacts;

        case ACTION_SORT_CONTACT_BY_LAST_NAME:
            displayedContacts.order = state.order + 1;

            displayedContacts.data = db.employees.sort((obj1, obj2) => {
                if (state.order % 2){
                    return obj1[action.payload] > obj2[action.payload];
                } else {
                    return obj1[action.payload] < obj2[action.payload];
                }
            });
            return state = displayedContacts;

    }

    return state;
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
                    <input className="contacts__search" type="text" placeholder="Search by First Name:" onChange={(event) => {
                        dispatch(searchContact(event.target.value));
                    }}/>
                    <input className="contacts__button" type="button" value="Sort by First name" onClick={() => {
                        dispatch(sortContactsByName())
                    }}/>
                    <input className="contacts__button" type="button" value="Sort by Last name" onClick={() => {
                        dispatch(sortContactsByLastName())
                    }}/>
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
        data: state.data,
        order: state.order
    }
};

const WrappedEmployeeList = connect(putStateToProps)(EmployeesList);

ReactDOM.render(
    <Provider store={store}>
        <WrappedEmployeeList />
    </Provider>,
  document.getElementById('root')
);
