import { ACTION_SEARCH_CONTACT, ACTION_SORT_CONTACT_BY_FIRST_NAME, ACTION_SORT_CONTACT_BY_LAST_NAME } from '../index';

export const searchContact = (searchQuery) => {
    return {
        type: ACTION_SEARCH_CONTACT,
        payload: searchQuery
    }
};

export const sortContactsByName = () => {
    return {
        type: ACTION_SORT_CONTACT_BY_FIRST_NAME,
        payload: 'first_name'
    }
};

export const sortContactsByLastName = () => {
    return {
        type: ACTION_SORT_CONTACT_BY_LAST_NAME,
        payload: 'last_name'
    }
};