const rl = require('readline-sync');
const recorder = require('./record');
const poll = require('./poll');
const Table =  require('cli-table');

(() => {
    let session = rl.question('What class: ');
    console.log('Start a poll first.');
    poll.startPoll();
    while(poll.polling) {}
    let result = poll.collectResult();
    console.log('Got some result');
    
    console.log('Get list of categories');
    let cats = recorder.getCategories(session);
    console.log('We have:');
    
    for(let i = 0; i < cats.length; i++) {
        console.log(`${i+1}: ${cats[i]}`);
    }

    let catN = rl.question('Which category do you want to choose: ');
    catN--;
    let cr = recorder.classifyResult(session, catN, result);

    console.log(`After classification, we got ${JSON.stringify(cr)}`)

    const tb = new Table();
    let opline = [''];
    for(let i = 0; i < cr.options.length; i++) {
        opline.push(`\t${cr.options[i]}`);
    }
    tb.push(opline);
    for(let i = 0; i < 5; i++) {
        let line = [];
        switch (i) {
            case 0: line.push('A'); break;
            case 1: line.push('B'); break;
            case 2: line.push('C'); break;
            case 3: line.push('D'); break;
            case 4: line.push('E');
        }
        for(var j = 0; j < cr.options.length; j++) {
            line.push(`\t${cr[line[0]].dist[j]}`);
        }
        tb.push(line);
    }
    console.log(tb.toString());
    
    
    
    
})();