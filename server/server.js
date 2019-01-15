const express = require('express');
const cors = require('cors');
const Poll = require('./poll');

const app = express();
app.use(cors());

const poll = new Poll();
poll.listen();

app.get('/', (req, res) => {
    res.json(poll.getPoll());
});

app.listen(5000);

