import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
    // signed = true, o usuario esta logado
    const signed = useSelector(state => state.auth.signed);

    const Routes = createRouter(signed);

    return  <Routes />;
}
