import moment from 'moment';

const checkMail = mail => {
    var er = new RegExp(
        /^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/,
    );
    var retorno = false;
    if (typeof mail === 'string') {
        if (er.test(mail)) {
            retorno = true;
        }
    } else if (typeof mail === 'object') {
        if (er.test(mail.value)) {
            retorno = true;
        }
    } else {
        retorno = false;
    }
    return retorno;
};

const doShortStr = (str, size) => {
    if (
        str == undefined ||
        str == 'undefined' ||
        str == '' ||
        size == undefined ||
        size == 'undefined' ||
        size == ''
    ) {
        return str;
    }

    var shortText = str;
    if (str.length >= size + 3) {
        shortText = str.substring(0, size).concat('...');
    }
    return shortText;
};

const getPeriodForTasks = daysAhead => {
    let dateStart = null;
    let dateEnd = null;
    const format = 'YYYY-MM-DD H:m:s';
    switch (daysAhead) {
        case 0:
            dateStart = moment()
                .startOf('day')
                .format(format);
            dateEnd = moment()
                .endOf('day')
                .format(format);
            break;

        case 1:
            dateStart = moment()
                .add({days: 1})
                .startOf('day')
                .format(format);
            dateEnd = moment()
                .add({days: 1})
                .endOf('day')
                .format(format);
            break;
        case 7:
            dateStart = moment()
                .startOf('week')
                .format(format);
            dateEnd = moment()
                .endOf('week')
                .format(format);
            break;

        case 30:
            dateStart = moment()
                .startOf('month')
                .format(format);
            dateEnd = moment()
                .endOf('month')
                .format(format);
            break;
    }

    return {dateStart, dateEnd};
};
export {checkMail, doShortStr, getPeriodForTasks};
