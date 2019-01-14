class Poll {
    getPoll() {
        let testPollSize = 200;
        let opts = ['A', 'B', 'C', 'D', 'E'];
        let toReturn = {};

        [...Array(testPollSize).keys()].forEach(i => {
            let idx = i.toString();
            toReturn[idx] = opts[Math.round(Math.random() * 4)]
        });
        
        return toReturn;
    }
}

export default Poll;