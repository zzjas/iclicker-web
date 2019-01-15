const HID = require('node-hid');

const ICLICKER_VID = 6273;
const ICLICKER_PID = 336;
const STATE = {
    "581884": "Software Started",
    "579580": "Course Switched",
    "1443576": "Session Started",
    "142164": "Poll Started",
    "213758": "Poll Ended",
};

class Poll {
    constructor() {
        this.iclicker = new HID.HID(ICLICKER_VID, ICLICKER_PID);
        this.sum = 0;
        this.result = {};
        this.state = undefined;
    }

    listen() {
        this.iclicker.on('data', (data) => {
            // Convert serial input from Buffer to String
            let hexString = data.toString('hex');

            // The first 6 digits are enough to identify the message
            let key = hexString.substr(0, 6);

            // Response starts with hex 02 30
            if(key.substr(0 ,4) === "0230") {
                // Zero the sum
                this.sum = 0;

                // Truncate non-relative info
                let response = hexString.substring(4, 18);

                // Convert hex string to decimal array, each element is two bytes hex
                let decimal = [];
                for(let i = 0; i < response.length; i = i + 2) {
                    decimal.push(parseInt(response.substr(i, 2), 16));
                }

                // Get the sequence id
                let seqId = decimal[0];

                // Get the response, the decimal representation of response start from 129 as A
                let answer = String.fromCharCode(parseInt(decimal[2] - 129 + 65));

                // Compute the last byte of iclicker id from first three bytes
                let tail = (decimal[3] ^ decimal[4] ^ decimal[5]).toString(16);

                // Concatenate the tail with first three bytes to get iclicker id
                let iclickerId = response.substring(6, 12) + tail;

                console.log(seqId + " " + iclickerId + ": " + answer);
                this.result[iclickerId] = answer;
            }
            // If the message is not a response, identify the message by adding up the current key with the past keys
            else {
                console.log(hexString);
                this.sum += parseInt(key, 16);
                this.state = STATE[this.sum.toString(10)];

                // If the state is recognized
                if(this.state !== undefined) {
                    // Clear the  keys
                    this.sum = 0;
                    console.log(this.state);
                }


                /*
                switch(this.sum) {
                    case 581884:
                        this.sum = 0;
                        this.state = STATE.
                        console.log("Iclicker Software started");
                        break;
                    case 579580:
                        this.sum = 0;
                        console.log("Course switched");
                        break;
                    case 1443576:
                        this.sum = 0;
                        console.log("New Session Started");
                        break;
                    case 142164:
                        this.sum = 0;
                        console.log("Poll Started");
                        break;
                    case 213758:
                        this.sum = 0;
                        console.log("Poll Ended");
                        break;
                }
                */
            }
        });
    }

    getPoll() {
        return this.result;
    }
}

module.exports = Poll;
