import {
    ACTION_SEARCH_CONTACT,
    ACTION_SORT_CONTACT_BY_FIRST_NAME,
    ACTION_SORT_CONTACT_BY_LAST_NAME
} from "../index";

import db from '../js/db.json';

const initialState = {
    data: db.employees,
    order: 1
};

export const rootReducer = ( state = initialState, action ) => {
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