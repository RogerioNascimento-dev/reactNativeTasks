import React, {Component} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export default class AuthOrApp extends Component {
    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(json) || {};
        if (userData.token) {
            axios.defaults.headers.common.Authorization =
                'bearer ' + userData.token;
            this.props.navigation.navigate('Home', userData);
        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});
