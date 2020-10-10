const moment = require('moment');

function formatMessage(username,text,avatar){
    return {
        username,
        text,
        avatar,
        time:moment().format('h:mm a')
    }
}

module.exports = formatMessage;