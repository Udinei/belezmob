import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

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
            Profile,
        }, {
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