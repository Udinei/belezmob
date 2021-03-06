﻿import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
    const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ host: '172.17.229.161'})
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

    tron.clear();

   // compartilhando com toda applicacao
    console.tron = tron;
}
