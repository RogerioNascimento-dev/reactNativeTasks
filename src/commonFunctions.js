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

export {checkMail, doShortStr};
