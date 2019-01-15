class Poll {
    getPoll() {
        let testPollSize = 200;
        let poll = {
            ok: true,
            result: []
        };

        [...Array(testPollSize).keys()].forEach(i => {
            let idx = 's@' + i.toString();
            poll.result.push({
                id: idx,
                vote: Math.round(Math.random() * 4)
            });
            
        });
        
        return poll;
    }
}

export default Poll;