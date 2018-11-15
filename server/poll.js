const HID = require('node-hid');

const ICLICKER_VID = 6273;
const ICLICKER_PID = 336;

let iclicker = new HID.HID(ICLICKER_VID, ICLICKER_PID);
iclicker.on('data', (data) => {
    // Convert serial input from Buffer to String and truncate non-relative info
    let hex = data.toString('hex').substring(4, 18);

    // Convert hex string to decimal array, each element is two bytes hex
    let decimal = [];
    for(let i = 0; i < hex.length; i = i + 2) {
        decimal.push(parseInt(hex.substr(i, 2), 16));
    }

    // Get the sequence id
    let seqId = decimal[0];

    // Get the response, the decimal representation of response start from 129 as A
    let response = String.fromCharCode(parseInt(decimal[2] - 129 + 65));

    // Compute the last byte of iclicker id from first three bytes
    let tail = (decimal[3] ^ decimal[4] ^ decimal[5]).toString(16);

    // Concatenate the tail with first three bytes to get iclicker id
    let iclickerId = hex.substring(6, 12) + tail;

    console.log(seqId + " " + iclickerId + ": " + response);
});

const fs = require('fs');
let polling = false;

const collectResult = () => {
    console.log('Reading fake poll...');
    
    let path = './fake-poll.json';
    let result = JSON.parse(fs.readFileSync(path, 'utf8')).r;
    console.log('Got fake result:');
    resultToString(result);

    console.log('Sending data to recorder...\n');
    return result;
};

function resultToString(result) {
    result.forEach(element => {
        //console.log(`ID: ${element.ID} --> ${element.Vote}`);
    });
}

const startPoll = () => {
    console.log('Poll started');
};


module.exports = {
    'startPoll': startPoll,
    'collectResult': collectResult,
    'polling': polling
};