/* eslint-disable dot-notation */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native';
import commonStyles from '../commonStyles';
import backgroundImage from '../../assets/imgs/login.jpg';
import AuthInput from '../components/AuthInput';
import axios from 'axios';
import {showError, server} from '../common';
import {checkMail} from '../commonFunctions';

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    signin = async () => {
        try {
            const res = await axios.post(server + '/signin', {
                email: this.state.email,
                password: this.state.password,
            });
            //Informando ao axios para enviar no header de todas
            //as proximas requisições o token obtido na resposta do login
            //realizado com sucesso acima.
            axios.defaults.headers.common['Authorization'] =
                'bearer ' + res.data.token;

            //Navegando para tela inicial
            this.props.navigation.navigate('Home');
        } catch (ex) {
            Alert.alert('Ops', 'Usuário ou senha não confere!');
        }
    };
    signup = async () => {
        try {
            await axios.post(server + '/signup', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            });
            Alert.alert('Sucesso!', 'Usuário criado com sucesso!');
            this.setState({stageNew: false});
        } catch (ex) {
            showError(ex);
        }
    };

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup();
        } else {
            this.signin();
        }
    };

    render() {
        const validations = {
            name:
                (this.state.stageNew &&
                    this.state.name &&
                    this.state.name.trim() &&
                    this.state.name.length > 2) ||
                !this.state.stageNew,
            email: this.state.email && checkMail(this.state.email),
            password: this.state.password && this.state.password.length >= 6,
            confirmPassword:
                (this.state.stageNew &&
                    this.state.confirmPassword &&
                    this.state.password === this.state.confirmPassword) ||
                !this.state.stageNew,
        };

        const validAll =
            validations.name &&
            validations.email &&
            validations.password &&
            validations.confirmPassword;

        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>

                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew
                            ? 'Crie sua conta'
                            : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew && (
                        <AuthInput
                            iconValidateColor={
                                validations.name ? '#15d600' : '#f00'
                            }
                            icon="user"
                            placeholder="Nome"
                            style={styles.input}
                            value={this.state.nome}
                            onChangeText={name => this.setState({name})}
                        />
                    )}
                    <AuthInput
                        iconValidateColor={
                            validations.email ? '#15d600' : '#f00'
                        }
                        icon="at"
                        placeholder="E-mail"
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                    />
                    <AuthInput
                        iconValidateColor={
                            validations.password ? '#15d600' : '#f00'
                        }
                        icon="lock"
                        secureTextEntry={true}
                        placeholder="Senha"
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                    />

                    {this.state.stageNew && (
                        <AuthInput
                            iconValidateColor={
                                validations.confirmPassword ? '#15d600' : '#f00'
                            }
                            placeholder="Confirme a senha"
                            icon="asterisk"
                            secureTextEntry={true}
                            style={styles.input}
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword =>
                                this.setState({confirmPassword})
                            }
                        />
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}>
                        <TouchableOpacity
                            onPress={this.signinOrSignup}
                            disabled={!validAll}>
                            <View
                                style={[
                                    styles.button,
                                    !validAll ? {backgroundColor: '#F88'} : {},
                                ]}>
                                <Text style={styles.buttonText}>
                                    {this.state.stageNew
                                        ? 'Registrar'
                                        : 'Entrar'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() =>
                        this.setState({stageNew: !this.state.stageNew})
                    }>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew
                            ? 'Já possui conta?'
                            : 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 5,
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        textAlignVertical: 'bottom',
        fontSize: 20,
    },
});
