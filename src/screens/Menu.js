import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {Gravatar} from 'react-native-gravatar';
import commonStyles from '../commonStyles';
import {DrawerItems} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {doShortStr} from '../commonFunctions';

export default props => {
    const logout = () => {
        // eslint-disable-next-line dot-notation
        delete axios.defaults.headers.common['Authorization'];
        AsyncStorage.removeItem('userData');
        props.navigation.navigate('Loading');
    };
    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Tasks</Text>
                    <TouchableOpacity
                        style={styles.logoutIcon}
                        onPress={logout}>
                        <Icon name="sign-out" size={30} color="#800" />
                    </TouchableOpacity>
                </View>
                <View style={styles.userInfo}>
                    <Gravatar
                        style={styles.avatar}
                        options={{
                            email: props.navigation.getParam('email'),
                            secure: true,
                        }}
                    />
                    <View>
                        <Text style={styles.name}>
                            {doShortStr(props.navigation.getParam('name'), 18)}
                        </Text>
                        <Text style={styles.email}>
                            {doShortStr(props.navigation.getParam('email'), 25)}
                        </Text>
                    </View>
                </View>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    title: {
        backgroundColor: '#FFF',
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: 10,
        marginLeft: 20,
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#AAA',
        borderRadius: 30,
        margin: 10,
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 20,
        marginRight: 20,
        marginTop: 20,
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 15,
        marginRight: 20,
        marginBottom: 10,
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logoutIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginTop: 10,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
