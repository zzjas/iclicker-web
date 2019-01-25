const firebase = require('firebase');
const program = require('commander');

//const Poll = require('./poll');
const Converter = require('./converter');

const firebaseConfig = {
    apiKey: "AIzaSyAIx7g02y5LBOg427Pg3nXaR7zeHT33D5A",
    authDomain: "iclicker-web.firebaseapp.com",
    databaseURL: "https://iclicker-web.firebaseio.com",
    projectId: "iclicker-web",
    storageBucket: "iclicker-web.appspot.com",
    messagingSenderId: "673662120586"
};

let firestore = !firebase.apps.length ?
    firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();

// Parse the command line
program.version('0.1.0')
    .option('-x, --xlsx', 'Parse excel file into the database')
    .parse(process.argv);

console.log(program.args[0]);

/*
poll = new Poll(firestore);
poll.listen();
*/

converter = new Converter(firestore);
converter.convertStudentsFromExcel(program.args[0]);
