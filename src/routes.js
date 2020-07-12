import React from 'react';
/*import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
 } from 'react-navigation';*/
 import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//import { createStackNavigator } from 'react-navigation';
//import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

// valor default false a mesma não tiver valor
export default (signedIn = false) =>
    createAppContainer(
        createSwitchNavigator({
            // grupo de rotas de autenticação, para quando usuario nao logado
            Sign: createSwitchNavigator({
                SignIn,
                SignUp,
            }),
            App: createBottomTabNavigator({
                Dashboard,
                // tabs de criação de agendamentos
                New: {
                    screen: createStackNavigator({
                        SelectProvider,
                        SelectDateTime,
                        Confirm,
                    },{
                        //** confg. para todas todas telas */
                        defaultNavigationOptions: {
                            headerTransparent: true,
                            headerTintColor: `#FFF`,
                            headerLeftContainerStyle: {
                                marginLeft: 20,
                            },
                        },
                    }),
                    navigationOptions: {
                       tabBarLabel: 'Agendar',
                       tabBarIcon: (
                           <Icon
                            name="add-circle-outline"
                            size={20}
                            color="rgba(255,255,255, 0.6)"
                           />

                       )
                    }
                },
                Profile,
            }, {
                resetOnBlur: true, // ao sair de uma rota reseta
                //customizando a tabBar
                tabBarOptions: {
                    keyboardHidesTabBar: true, // teclado abre acima da tabBar
                    activeTintColor: '#FFF', // cor da identificacao da tabBar (icone e texto) no caso branco
                    inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                    style: {
                        backgroundColor: '#8d41aB', // Cor do fundo da tabBar
                    }
                }
            }),
        }, {
            // rota inicial se tive logado abre tela App(dashboard) senao SignIn
            initialRouteName: signedIn ? 'App' : 'Sign'
        }),
    );