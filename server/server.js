const express = require('express');
const poll = require('poll');

const app = express();
const port = process.env.PORT || 5000;

app.post('/api/create-poll', (req, res) => {
  if(!poll.isInit()) {
    poll.init();
  }
  else {
    //TODO: Error here
  }
});

app.post('/api/create-record', (req, res) => {
   if(!poll.isInit()) {
    poll.init();
  }
  else {
    //TODO: Error here
  } 
});

app.get('/api/end-poll', (req, res) => {
  if(poll.working()) {
    poll.stop();
  }
});

app.get('/api/destry-poll', (req, res) => {
  poll.destry();
});
