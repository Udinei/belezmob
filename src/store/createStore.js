/** criado para dividir o codigo de controle do  state */
import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
    //const enhancer =  process.env.NODE_ENV === 'development'
    const enhancer = __DEV__
     ? compose(  console.tron.createEnhancer(),
        applyMiddleware(...middlewares)
    )
    : applyMiddleware(...middlewares)

    return createStore(reducers, enhancer);
};
