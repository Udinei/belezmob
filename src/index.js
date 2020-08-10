import React, { Component } from 'react';

// manipula o state antes de rederizar os dados
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import App from './App';

import './config/ReactrotonConfig';
import CodePush from "react-native-code-push";
import OneSignal from 'react-native-onesignal';

import { store, persistor } from './store';

//export default function index () {
//  const index = () => (
class index extends Component {
    constructor(props) {
        super(props);
        // o codigo id app é gerado no site da  OneSignal em: Native App Platforms > editar
        OneSignal.init('d1df907f-223f-4300-ba30-de2e563a9824');

        // eventListener
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componenDidMount(){
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    /** dispara ao  recebe a notificação, somente se o usuario esta com aplicação aberta */
    onReceived = (data) =>{

    }

    /** dispara ao clicar (abrir) numa notificação enviada ao usurio o aplicativo abre */
    onOpened = (notification) => {

    }

    /** dispara quando é usado para relacionar o id usuario logado ao email logado, o usuario
     * pode estar logado em mais de um aparelho, assim a notificação sera
     * enviada ao celular correto, o usuario pode ter varios ids
     */
    onIds = () => {

    }


    render() {
        return (
            <Provider store={ store }>
                <PersistGate persistor={ persistor }>
                    <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
                    <App />
                </PersistGate>
            </Provider>
        )
    }

}

export default CodePush({
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(index);