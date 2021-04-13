import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './style.scss';
import { store } from './redux/stores';
import AdminLayout from './components/AdminLayout';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <AdminLayout/>
            </Router>
        </Provider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
