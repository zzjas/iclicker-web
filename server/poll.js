const readline = require('readline');
const rl = require('readline-sync');

const recorder = require('record');

var inited = false;
var recording = false;
var result = [];

const init = (record) => {
    inited = true;
    recording = record; 
};

const isInit = () => {
    console.log("Poll is started");
    return inited;
};

const stop = () => {
    console.log("Poll is stoped.");
};

const destry = () => {
    inited = false;
    recording = false;
    console.log("This poll is destried.");
};

const start = () => {
    collectResult();
};

const stop = (option) => {
    sendResult(option);
    sendOption();
};

function collectResult() {
    while(true) {
        let res = {
            id: null,
            result: null
        };
        rl.question('Enter iClicker ID: ', (ans) => {
            if(!ans.length) { break; }
            res.id = ans;
        });
        rl.question('Enter ChoiceL ', (ans) => {
            res.result = ans;
        })
        result.push(res);
    }
}

function sendResult(option) {
    let stat = {
        a:0,
        b:0,
        c:0,
        d:0,
        e:0
    }
    let a = b = c = d = e = 0;
    result.forEach(res => {
        switch (res.result) {
            case 'A': stat.a++; break; 
            case 'B': stat.b++; break; 
            case 'C': stat.c++; break; 
            case 'D': stat.d++; break; 
            case 'E': stat.e++; break; 
        }
        if(option) {

        }
    });
}