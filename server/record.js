const fs = require('fs');
const rl = require('readline-sync');
const poll = require('./poll');

var record = {
    'session': '',
    'category' : '',
    'options' : [],
    'students' : {}
};
const initRecord = (recInfo) => {
    record.session  = recInfo.session;
    record.category = recInfo.category;
    record.options  = recInfo.options;
};

const startPoll = (pos) => {
    console.log(`Polling for Option ${pos} ~ ${pos+4}`);
    poll.startPoll();
    while(poll.polling) {}
    let result = poll.collectResult();
    for(var i = 0; i < result.length; i++) {
        let element = result[i];
        let v;
        switch (element.Vote) {
            case 'A': v = pos; break;
            case 'B': v = pos+1; break;
            case 'C': v = pos+2; break;
            case 'D': v = pos+3; break;
            case 'E': v = pos+4; break;
            default: v = -1; 
        }
        
        record.students[element.ID] = v;
    }
    console.log(JSON.stringify(record));
    
    console.log(`Poll results loaded!`);
    if(record.options.length > pos+4) { startPoll(pos+5); }
};

const storeRecord = () => {
    let path = "./db/" + record.session + ".json";
    let session = { 'categories': [] }
    if(fs.existsSync(path)) {
        console.log('Class already exists');
        
        session = JSON.parse(fs.readFileSync(path, 'utf8'));
    } else {
        console.log('Class appears first time');
    }
    console.log('Writing...');
    session.categories.push(record.category);
    session[record.category] = record;
    fs.writeFileSync(path, JSON.stringify(session));
    console.log(`Written in ${path}`);
};










const getCategories = (sessionName) => {
    let path = "./db/" + sessionName + ".json";
    let session = null;
    if(fs.existsSync(path)) {
        session = JSON.parse(fs.readFileSync(path, 'utf8')); 
    }
    else {
        console.log(`Class ${sessionName} does not exist`);
        console.log(`Path is: ${path}`);
        return session;
    }
    return session.categories;
};


const classifyResult = (sessionName, catN, result) => {
    let session = getSession(sessionName);
    let record  = session[session.categories[catN]];
    
    let cr = {
        'A': {
            'total': 0,
            'dist': Array(record.options.length).fill(0)
        },
        'B': {
            'total': 0,
            'dist': Array(record.options.length).fill(0)
        },
        'C': {
            'total': 0,
            'dist': Array(record.options.length).fill(0)
        },
        'D': {
            'total': 0,
            'dist': Array(record.options.length).fill(0)
        },
        'E': {
            'total': 0,
            'dist': Array(record.options.length).fill(0)
        },
        'options':record.options
    };
    for(var i = 0; i < result.length; i++) {
        let element = result[i];
        let op = record.students[element.ID]-1;
        switch(element.Vote) {
            case 'A': cr['A'].total++; 
            cr['A'].dist[op]++;
            break;
            case 'B': cr['B'].total++;
            cr['B'].dist[op]++;
            break;
            case 'C': cr['C'].total++;
            cr['C'].dist[op]++;
            break;
            case 'D': cr['D'].total++;
            cr['D'].dist[op]++;
            break;
            case 'E': cr['E'].total++;
            cr['E'].dist[op]++;
            break;
            default: v = -1;
        }
    }
    return cr;
};








function getSession(sessionName) {
    let path = "./db/" + sessionName + ".json";
    let session = null;
    if(fs.existsSync(path)) {
        session = JSON.parse(fs.readFileSync(path, 'utf8')); 
    }
    else {
        console.log(`Class ${sessionName} does not exist`);
    }
    return session;
}

function printRecord() {
    console.log(`\nThis category is for class ${record.session}`);
    console.log(`Category of this record is: ${record.category}`);
    for(var i = 1; i <= record.options.length; i++) {
        console.log(`Option ${i}: ${record.options[i-1]}`);
    }
    if(record.students) {
        for(var sid in record.students) {
            console.log(`Student ${sid} is in Option ${record.students[sid]}`);
        };
    } else {
        console.log('There are no students votes in record right now.\n');
    }
}

/**
 * Read record info from command line
 * Should read record info from web page
 */
function getRecInfo() {
    let re = {};
    re['session'] = rl.question('Which class is this for: ');
    re['category'] = rl.question('What is the Category: ');
    let cnt = 1;
    re['options'] = [];
    let op = rl.question(`(Empty to stop) Enter Option ${cnt}: `)
    while(op) {
        re.options.push(op);
        cnt++;
        op = rl.question(`(Empty to stop) Enter Option ${cnt}: `)
    }
    return re;
}

(() => {
    initRecord(getRecInfo());
    printRecord();
    startPoll(1);
    printRecord();
    storeRecord();
})();

module.exports = {
    'initRecord': initRecord,
    'startPoll': startPoll,
    'storeRecord': storeRecord,
    'getCategories': getCategories,
    'classifyResult': classifyResult
}