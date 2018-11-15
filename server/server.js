const express = require('express');

const poll = require('./poll');
const recorder = require('./record');

const app = express();
const port = process.env.PORT || 5000;

/******************************** record.js *********************************/

/**
 * Send out a list of session names
 */
app.get('/api/sessionlist', (req, res) => {
    var names = recorder.getSessions();
});

/**
 * Send out record file for the given session
 */
app.get('/api/records', (req, res) => {
    var records = recorder.getRecords(sessionName);
});

/**
 * Save the new record into database
 */
app.post('/api/save', (req, res) => {
    var newRecord;
    recorder.save(sesseionName, newRecord);
});

/********************************* poll.js **********************************/

/**
 * Get the status of currect poll.
 */
app.get('/api/status', (req, res) => {
    var status = poll.status();
    status = -1('Not Connect') || 0('Not Polling') || 1('Polling');
});

/**
 * End current poll.
 */
app.get('/api/end', (req, res) => {
    var end = poll.end();
    end = true || false;
});

/**
 * Get result file of current poll.
 */
app.get('/api/result', (req, res) => {
    var result = poll.result();
    result = {
        "ID1":"A",
        "ID2":"B",
        "ID3":"C"
    };
});
