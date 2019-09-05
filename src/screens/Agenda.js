import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    FlatList,
    Platform,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import AddTask from './AddTask';

export default class Agenda extends Component {
    state = {
        tasks: [
            {
                id: Math.random(),
                desc: 'Comprar Curso React-native',
                estimatedAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Concluir o curso',
                estimatedAt: new Date(),
                doneAt: null,
            },
            {
                id: Math.random(),
                desc: 'Comprar Curso React-native',
                estimatedAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Concluir o curso',
                estimatedAt: new Date(),
                doneAt: null,
            },
            {
                id: Math.random(),
                desc: 'Comprar Curso React-native',
                estimatedAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Concluir o curso',
                estimatedAt: new Date(),
                doneAt: null,
            },
            {
                id: Math.random(),
                desc: 'Comprar Curso React-native',
                estimatedAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Concluir o curso',
                estimatedAt: new Date(),
                doneAt: null,
            },
            {
                id: Math.random(),
                desc: 'Comprar Curso React-native',
                estimatedAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Concluir o curso',
                estimatedAt: new Date(),
                doneAt: null,
            },
            {
                id: Math.random(),
                desc: 'Comprar Curso React-native',
                estimatedAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Concluir o curso',
                estimatedAt: new Date(),
                doneAt: null,
            },
        ],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
    };

    addTask = task => {
        const tasks = [...this.state.tasks];
        tasks.push({
            id: Math.random(),
            desc: task.desc,
            estimatedAt: task.date,
            doneAt: null,
        });

        this.setState({tasks, showAddTask: false}, this.filterTask);
    };

    toggleTask = id => {
        const tasks = this.state.tasks.map(task => {
            if (id === task.id) {
                task = {...task};
                task.doneAt = task.doneAt ? null : new Date();
            }
            return task;
        });
        this.setState({tasks}, this.filterTask);
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
    };

    toggleFilter = () => {
        this.setState(
            {showDoneTasks: !this.state.showDoneTasks},
            this.filterTask,
        );
    };

    //ComponentDidMount método do ciclo de vida do react, executa assim que
    //o componente é renderizado
    componentDidMount = () => {
        this.filterTask();
    };

    render() {
        return (
            <View style={styles.container}>
                <AddTask
                    isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    onCancel={() => this.setState({showAddTask: false})}
                />
                <ImageBackground
                    source={todayImage}
                    style={styles.ImageBackground}>
                    <View style={styles.iconBar}>
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
                        <Text style={styles.title}>Hoje</Text>
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
                            <Task {...item} toggleTask={this.toggleTask} />
                        )}
                    />
                </View>
                <ActionButton
                    buttonColor={commonStyles.colors.today}
                    onPress={() => {
                        this.setState({showAddTask: true});
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        justifyContent: 'flex-end',
    },
});
