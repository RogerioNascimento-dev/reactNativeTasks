import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    FlatList,
    Platform,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from './AddTask';
import axios from 'axios';
import {server, showError} from '../common';
import todayImage from '../../assets/imgs/today.jpg';
import tomorrowImage from '../../assets/imgs/tomorrow.jpg';
import weekImage from '../../assets/imgs/week.jpg';
import monthImage from '../../assets/imgs/month.jpg';

export default class Agenda extends Component {
    state = {
        tasks: [],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
    };

    addTask = async task => {
        try {
            await axios.post(server + '/tasks', {
                desc: task.desc,
                estimateAt: task.date,
            });
        } catch (ex) {
            showError('Não foi possível saltar atividade.');
        }
        this.setState({showAddTask: false}, this.loadTasks);
    };

    toggleTask = async id => {
        try {
            await axios.put(server + '/tasks/' + id + '/toggle');
            this.loadTasks();
        } catch (ex) {
            showError('Não foi possível realizar esta alteração.');
        }
    };

    filterTask = () => {
        let visibleTasks = null;
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks];
        } else {
            const pending = task => task.doneAt == null;
            visibleTasks = this.state.tasks.filter(pending);
        }
        this.setState({visibleTasks});
        // -lógica para armazenamento offline
        //AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    };

    toggleFilter = () => {
        this.setState(
            {showDoneTasks: !this.state.showDoneTasks},
            this.filterTask,
        );
    };

    deleteTask = async id => {
        try {
            await axios.delete(server + '/tasks/' + id);
            await this.loadTasks();
        } catch (ex) {
            showError('Não foi possível realizar esta exclusão');
        }
    };

    // -ComponentDidMount método do ciclo de vida do react, executa assim que
    // -o componente é renderizado
    componentDidMount = async () => {
        this.loadTasks();
        // -lógica para armazenamento offline
        //const data = await AsyncStorage.getItem('tasks');
        //const tasks = JSON.parse(data) || [];
        //this.setState({tasks}, this.filterTask);
    };

    loadTasks = async () => {
        try {
            const maxDate = moment()
                .add({days: this.props.daysAhead})
                .format('YYYY-MM-DD 23:59');
            const res = await axios.get(server + '/tasks?date=' + maxDate);
            this.setState({tasks: res.data}, this.filterTask);
        } catch (ex) {
            showError(
                'Não foi possível obter a lista de atividades, verifique sua conexão.',
            );
        }
    };
    render() {
        let styleCollor = null;
        let image = null;

        switch (this.props.daysAhead) {
            case 0:
                styleCollor = commonStyles.colors.today;
                image = todayImage;
                break;

            case 1:
                styleCollor = commonStyles.colors.tomorrow;
                image = tomorrowImage;
                break;
            case 7:
                styleCollor = commonStyles.colors.week;
                image = weekImage;
                break;

            case 30:
                styleCollor = commonStyles.colors.month;
                image = monthImage;
                break;
        }
        return (
            <>
                <View style={styles.container}>
                    <AddTask
                        isVisible={this.state.showAddTask}
                        onSave={this.addTask}
                        onCancel={() => this.setState({showAddTask: false})}
                    />
                    <ImageBackground
                        source={image}
                        style={styles.ImageBackground}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.openDrawer()
                                }>
                                <Icon
                                    name="bars"
                                    color={commonStyles.colors.secundary}
                                    size={20}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon
                                    name={
                                        this.state.showDoneTasks
                                            ? 'eye'
                                            : 'eye-slash'
                                    }
                                    size={20}
                                    color="#FFF"
                                />
                            </TouchableOpacity>
                        </View>

                        <View styles={styles.titleBar}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.subtitle}>
                                {moment()
                                    .local('pt-br')
                                    .format('ddd, D [de] MMMM [de] YYYY')}
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.tasksContainer}>
                        <FlatList
                            data={this.state.visibleTasks}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({item}) => (
                                <Task
                                    {...item}
                                    toggleTask={this.toggleTask}
                                    onDelete={this.deleteTask}
                                />
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.cloneActionButton,
                            {backgroundColor: styleCollor},
                        ]}
                        onPress={() => {
                            this.setState({showAddTask: true});
                        }}>
                        <View>
                            <Icon name="plus" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    cloneActionButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        right: 20,
        bottom: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    ImageBackground: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 50,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    tasksContainer: {
        flex: 7,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
