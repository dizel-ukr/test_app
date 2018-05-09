import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { searchContact, sortContactsByName, sortContactsByLastName} from '../store/actions';
import Employee from './Employee';

class EmployeesList extends Component {
    render() {

        const { searchContact, sortContactsByName, sortContactsByLastName } = this.props;
        return (
            <div className="contacts">
                <div className="contacts__search-wrapper">
                    <input className="contacts__search" type="text" placeholder="Search by First Name:" onChange={(event) => {
                        searchContact(event.target.value);
                    }}/>
                    <input className="contacts__button" type="button" value="Sort by First name" onClick={() => {
                        sortContactsByName()
                    }}/>
                    <input className="contacts__button" type="button" value="Sort by Last name" onClick={() => {
                        sortContactsByLastName()
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
const putActionToProps = (dispatch) => {
    return {
        searchContact: bindActionCreators(searchContact, dispatch),
        sortContactsByName: bindActionCreators(sortContactsByName, dispatch),
        sortContactsByLastName: bindActionCreators(sortContactsByLastName, dispatch)
    }
};

export default connect(putStateToProps, putActionToProps)(EmployeesList);