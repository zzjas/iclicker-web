const HID = require('node-hid');
const firebase = require('firebase');

const ICLICKER_VID = 6273;
const ICLICKER_PID = 336;
const STATE = {
    "581884": "Software Started",
    "579580": "Course Switched",
    "1443576": "Session Started",
    "142164": "Poll Started",
    "213758": "Poll Ended",
};

const firebaseConfig = {
    apiKey: "AIzaSyAIx7g02y5LBOg427Pg3nXaR7zeHT33D5A",
    authDomain: "iclicker-web.firebaseapp.com",
    databaseURL: "https://iclicker-web.firebaseio.com",
    projectId: "iclicker-web",
    storageBucket: "iclicker-web.appspot.com",
    messagingSenderId: "673662120586"
};

class Poll {
    constructor() {
        this.iclicker = new HID.HID(ICLICKER_VID, ICLICKER_PID);
        this.sum = 0;
        this.result = {};
        this.state = undefined;

        this.poll = !firebase.apps.length ?
            firebase.initializeApp(firebaseConfig).firestore().collection('polls') :
            firebase.app().firestore().collection('polls');

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

                // Update to the database
                this.result[iclickerId] = answer;
                this.poll.doc('currentPoll').set(this.result)
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

                    switch(this.state) {
                        case "Software Started":
                            break;
                        case "Course Switched":
                            break;
                        case "Session Started":
                            break;
                        case "Poll Started":
                            this.poll.doc('currentPoll').delete();
                            break;
                        case "Poll Ended":
                            break;
                    }

                    console.log(this.state);
                }
            }
        });
    }
}

let poll = new Poll();
poll.listen();
