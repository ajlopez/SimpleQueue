
var simplequeue = require('../');
var Queue = simplequeue.Queue;
var Message = simplequeue.Message;
var QueueServer = simplequeue.QueueServer;

exports['Get undefined Queue']= function(test) {
    test.expect(2);
    var server = new QueueServer();    
    
    server.getQueue("foo", function(err, queue) {
        test.equal(err, undefined);
        test.equal(queue, null);
        test.done();
    });
}

exports['Create Queue']= function(test) {
    test.expect(2);
    var server = new QueueServer();    
    
    server.createQueue("foo", function(err, queue) {
        test.equal(err, undefined);
        test.ok(queue);
        test.done();
    });
}

exports['Create Queue and put Message']= function(test) {
    test.expect(4);
    var server = new QueueServer();    
    
    server.createQueue("foo", function(err, queue) {
        test.equal(err, undefined);
        test.ok(queue);
        var message = new Message('bar');
        
        queue.putMessage(message, function(err, result) {
            test.equal(err, undefined);
            test.ok(result);
            test.done();
        });
    });
}

