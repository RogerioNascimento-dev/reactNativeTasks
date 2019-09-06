import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TextInput,
    DatePickerAndroid,
    DatePickerIOS,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Platform,
} from 'react-native';
import moment from 'moment';
import commonStyles from '../commonStyles';
const initialState = {desc: '', date: new Date()};
export default class AddTask extends Component {
    state = {...initialState};
    save = () => {
        if (!this.state.desc.trim()) {
            Alert.alert('Ops!', 'Informe uma descrição para tarefa!');
            return;
        }
        const data = {...this.state};
        this.props.onSave(data);
        this.setState({...initialState});
    };

    //lógica para executar o datepicker do android
    handleDateAndroidChanged = () => {
        DatePickerAndroid.open({
            date: this.state.date,
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = moment(this.state.date);
                momentDate.date(e.day);
                momentDate.month(e.month);
                momentDate.year(e.year);
                this.setState({date: momentDate.toDate()});
            }
        });
    };
    render() {
        let datePicker = null;
        if (Platform.OS === 'ios') {
            datePicker = (
                <DatePickerIOS
                    mode="date"
                    date={this.state.date}
                    onDateChange={date => this.state.date}
                />
            );
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                    <Text style={styles.date}>
                        {moment(this.state.date).format(
                            'ddd, D [de] MMMM [de] YYYY',
                        )}
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <Modal
                onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType="fade"
                transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput
                        placeholder="Descrição ..."
                        style={styles.input}
                        onChangeText={desc => this.setState({desc})}
                        value={this.state.desc}
                    />
                    {datePicker}
                    <View style={styles.contentButton}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset} />
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    container: {
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: commonStyles.colors.default,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        color: commonStyles.colors.secundary,
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        paddingLeft: 10,
        textAlign: 'center',
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        marginHorizontal: 10,
        fontSize: 20,
        height: 50,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        marginHorizontal: 10,
        fontSize: 20,
        height: 50,
        textAlign: 'center',
    },
    contentButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'space-around',
    },
    button: {
        padding: 5,
        borderWidth: 1,
        borderColor: commonStyles.colors.default,
        margin: 5,
        color: commonStyles.colors.default,
    },
});
