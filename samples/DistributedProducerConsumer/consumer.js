
var simplequeue = require('../..');
var Message = simplequeue.Message;

var client = simplequeue.createRemoteClient();

function getRandomInteger(from, to) {
    return from + Math.floor(Math.random()*(to-from));
}

function Consumer(queue) {
    var n = 0;
    var self = this;
    
    this.process = function() {
        queue.getMessage(function (err, msg) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Processing ' + msg.payload);
            }
            
            setTimeout(self.process, getRandomInteger(500, 1000));
        });
    }
}

client.on('remote', function(remote) {
    remote.createQueue('queue', function(err, queue) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        
        (new Consumer(queue)).process();
    });
});

client.connect(3000);

