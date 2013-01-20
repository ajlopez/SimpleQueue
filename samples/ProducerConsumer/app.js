
var sq = require('../..');

function getRandomInteger(from, to) {
    return from + Math.floor(Math.random()*(to-from));
}

function Producer(queue, name) {
    var n = 0;
    var self = this;
    
    this.process = function() {
        console.log(name + ' generates ' + n);
        var msg = n;
        n++;
        queue.putMessage(msg);
        setTimeout(self.process, getRandomInteger(500, 1000));
    }
}

function Consumer(queue, name) {
    var n = 0;
    var self = this;
    
    this.process = function() {
        var msg = queue.getMessageSync();
        
        if (msg != null)
            console.log(name + ' process ' + msg);
          
        setTimeout(self.process, getRandomInteger(300, 600));
    }
}

var queue = sq.createQueue();
var producer = new Producer(queue, 'Producer');
var consumer1 = new Consumer(queue, 'First Consumer');
var consumer2 = new Consumer(queue, 'Second Consumer');

producer.process();
consumer1.process();
consumer2.process();

