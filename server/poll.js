const fs = require('fs');

var polling = false;
/*
    TODO
    Read fake-poll.json
    Need to modify
*/
const collectResult = () => {
    console.log('Reading fake poll...');
    
    let path = './fake-poll.json';
    let result = JSON.parse(fs.readFileSync(path, 'utf8')).r;
    console.log('Got fake result:');
    resultToString(result);

    console.log('Sending data to recorder...\n');
    return result;
}

function resultToString(result) {
    result.forEach(element => {
        //console.log(`ID: ${element.ID} --> ${element.Vote}`);
    });
}

const startPoll = () => {
    console.log('Poll started');
    
}


module.exports = {
    'startPoll': startPoll,
    'collectResult': collectResult,
    'polling': polling
}