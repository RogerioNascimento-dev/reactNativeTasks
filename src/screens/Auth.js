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

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    signinOrSignup = async () => {
        if (this.state.stageNew) {
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
        } else {
            try {
                const res = await axios.post(server + '/signin', {
                    email: this.state.email,
                    password: this.state.password,
                });
                //Informando ao axios para enviar no header de todas
                //as proximas requisições o token obtido na resposta do login
                //realizado com sucesso acima.
                axios.defaults.headers.common['Autorization'] =
                    'bearer' + res.data.token;

                //Navegando para tela inicial
                this.props.navigation.navigate('Home');
            } catch (ex) {
                Alert.alert('Ops', 'Usuário ou senha não confere!');
            }
        }
    };

    render() {
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
                            icon="user"
                            placeholder="Nome"
                            style={styles.input}
                            value={this.state.nome}
                            onChangeText={name => this.setState({name})}
                        />
                    )}
                    <AuthInput
                        icon="at"
                        placeholder="E-mail"
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                    />
                    <AuthInput
                        icon="lock"
                        secureTextEntry={true}
                        placeholder="Senha"
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                    />

                    {this.state.stageNew && (
                        <AuthInput
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
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
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
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
});
