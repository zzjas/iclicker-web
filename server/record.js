const fs = require('fs');
const rl = require('readline-sync');

const startRecord = () => {
    let className = rl.question('Which class: ');
    let record = readRecord(className);
    let q, a, b, c, d, e;
    q = rl.question('What is the question: ');
    a = rl.question('A: ');
    b = rl.question('B: ');
    c = rl.question('C: ');
    d = rl.question('D: ');
    e = rl.question('E: ');
    record.qs.push({q:q, a:a, b:b, c:c, d:d, e:e});
    writeRecord(className, record);
}

function readRecord(className) {
    let record = {qs: []};
    fs.readFile(`db/${className}.json`, 'utf8', (err, data) => {
        if(!err) { 
            console.log(data);
            record = JSON.parse(data);
        }
        else if (err.code === 'ENOENT') {
            fs.closeSync(fs.openSync(`db/${className}.json`, 'w'));
        }
        else { throw err; }
    });
    //console.log(JSON.stringify(record));
    return record;
}

function writeRecord(className, record) {
    fs.writeFileSync(`db/${className}.json`, JSON.stringify(record), 'utf8');
}

startRecord();