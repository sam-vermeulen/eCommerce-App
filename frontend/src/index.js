import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    transitions: transitions.SCALE
}; 

(async () => {
    // load stripe api key and promise
    const stripeApiKey = (await axios.get('/api/stripe')).data.stripeApiKey;
    const stripePromise = loadStripe(stripeApiKey);

    console.log(stripeApiKey);

    ReactDOM.render(
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
                <Elements stripe={stripePromise}>
                    <App />
                </Elements>
            </AlertProvider>
        </Provider>,
        document.getElementById('root')
    );

})()