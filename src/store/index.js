import { persistStore } from 'redux-persist'; // usado para gravar o store em um bd
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import persistReducers from './persistReducers'; // controla a persistencia do store no local storage

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

// cria o store
const store = createStore(persistReducers(rootReducer), middlewares);

// recupera dados do store persistido no localstoragge
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// exportando somente as variaveis que seram utilizadas
export { store, persistor };
