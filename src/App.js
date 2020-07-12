import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
    // signed = true, o usuario esta logado
    const signed = useSelector(state => state.auth.signed);

    // refaz as rotas da aplicação em funcao de signed
    const Routes = createRouter(signed);

    return  <Routes />;
}
