import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
    return (
        <View style={[styles.container, props.style]}>
            <Icon
                name={props.icon}
                size={20}
                style={[styles.icon, {marginLeft: 10}]}
            />
            <TextInput {...props} style={styles.input} />
            <Icon
                name="check"
                size={20}
                style={{marginRight: 10}}
                color={props.iconValidateColor}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        color: '#333',
    },
    input: {
        flex: 1,
    },
});
