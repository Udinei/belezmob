import React from 'react';
// manipula o state antes de rederizar os dados
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import App from './App';

import './config/ReactrotonConfig';

import { store, persistor } from './store';

export default function index() {
    return (
        <Provider store={ store }>
            <PersistGate persistor={ persistor }>
                <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
                <App />
            </PersistGate>
        </Provider>
    )
}
