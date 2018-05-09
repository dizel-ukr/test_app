import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import EmployeesList from './components/EmployeesList';
import { rootReducer } from './store/reducers';
import './css/index.css';

export const ACTION_SEARCH_CONTACT = 'ACTION_SEARCH_CONTACT';
export const ACTION_SORT_CONTACT_BY_FIRST_NAME = 'ACTION_SORT_CONTACT_BY_FIRST_NAME';
export const ACTION_SORT_CONTACT_BY_LAST_NAME = 'ACTION_SORT_CONTACT_BY_LAST_NAME';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <EmployeesList />
    </Provider>,
  document.getElementById('root')
);
