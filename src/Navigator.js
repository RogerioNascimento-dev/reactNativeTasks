import React from 'react';
import {
    createSwitchNavigator,
    createDrawerNavigator,
    createAppContainer,
} from 'react-navigation';
import Agenda from './screens/Agenda';
import Auth from './screens/Auth';
import commonStyles from './commonStyles';
import Menu from './screens/Menu';

const menuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <Agenda title="Hoje" daysAhead={0} {...props} />,
        navigationOptions: {
            title: 'Hoje',
        },
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <Agenda title="Amanhã" daysAhead={1} {...props} />,
        navigationOptions: {
            title: 'Amanhã',
        },
    },
    Week: {
        name: 'Week',
        screen: props => <Agenda title="Semana" daysAhead={7} {...props} />,
        navigationOptions: {
            title: 'Semana',
        },
    },
    Month: {
        name: 'Month',
        screen: props => <Agenda title="Mês" daysAhead={30} {...props} />,
        navigationOptions: {
            title: 'Mês',
        },
    },
};
const menuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu,

    contentOptions: {
        //- Estilos na exibição das opções do menu
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20,
        },
        //- Estilos na exibição da opção ativa.
        activeLabelStyle: {
            color: '#080',
        },
    },
};
const MenuNavigator = createDrawerNavigator(menuRoutes, menuConfig);

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth,
    },
    Home: {
        name: 'Home',
        screen: createAppContainer(MenuNavigator),
    },
};
const mainConfig = {
    initialRouteName: 'Auth',
};

const MainNavigator = createSwitchNavigator(mainRoutes, mainConfig);
export default createAppContainer(MainNavigator);
