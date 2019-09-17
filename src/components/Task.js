import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';
import commonStyles from '../commonStyles';

export default props => {
    let check = null;

    if (props.doneAt !== null) {
        check = (
            <View style={styles.done}>
                <Icon
                    name="check"
                    size={20}
                    color={commonStyles.colors.secundary}
                />
            </View>
        );
    } else {
        check = <View style={styles.pending} />;
    }

    let descStyle = {};
    if (props.doneAt !== null) {
        descStyle = {textDecorationLine: 'line-through'};
    }

    //configurando o conteúdo ao realizar gestos do swipeable
    //#ao deslizar para o lado esquerdo
    const leftContent = (
        <View style={styles.exclude}>
            <Icon name="trash" size={25} color="#FFF" />
            <Text style={styles.excludedText}>Excluir</Text>
        </View>
    );
    //#ao deslizar para o lado direito
    const rightContent = [
        <TouchableOpacity
            style={[styles.exclude, {justifyContent: 'flex-start'}]}
            onPress={() => props.onDelete(props.id)}>
            <Icon
                style={{marginLeft: 20}}
                name="trash"
                size={25}
                color="#FFF"
            />
        </TouchableOpacity>,
    ];

    return (
        <Swipeable
            leftActionActivationDistance={200}
            onLeftActionActivate={() => props.onDelete(props.id)}
            leftContent={leftContent}
            rightButtons={rightContent}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>{check}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, descStyle]}>
                        {props.desc}
                    </Text>
                    <Text style={styles.date}>
                        {moment(props.estimateAt)
                            .locale('pr-br')
                            .format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </View>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#AAA',
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
    exclude: {
        flex: 1,
        backgroundColor: '#F00',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    excludedText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    },
});
