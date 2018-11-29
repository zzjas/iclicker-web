const express = require('express');
const Poll = require('./poll');

const app = express();
const poll = new Poll();

poll.listen();

app.get('/', (req, res) => {
    res.json(poll.result);
});

app.listen(5000);
