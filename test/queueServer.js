
var simplequeue = require('../');
var Queue = simplequeue.Queue;
var Message = simplequeue.Message;
var QueueServer = simplequeue.QueueServer;

exports['Get undefined Queue']= function(test) {
    var server = new QueueServer();    
    
    test.equal(server.getQueue("foo"), null);
    test.done();
}

exports['Create Queue']= function(test) {
    var server = new QueueServer();    
    
    var queue = server.createQueue("foo");
    
    test.ok(queue);
    test.done();
}

exports['Create existent Queue']= function(test) {
    var server = new QueueServer();    
    
    var queue0 = server.createQueue("foo");
    
    var queue = server.createQueue("foo");
    
    test.ok(queue);
    test.ok(queue === queue0);
    
    test.done();
}

exports['Create Queue and put Message']= function(test) {
    var server = new QueueServer();    
    
    var queue = server.createQueue("foo");
    
    var message = new Message('bar');
    queue.putMessage(message);
    
    var result = queue.getMessage();
    
    test.ok(result);
    test.ok(result.payload, 'bar');
    
    test.done();
}

