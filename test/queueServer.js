
var sq = require('../');

exports['Get undefined Queue']= function(test) {
    var server = sq.createQueueServer();    
    
    test.equal(server.getQueue("foo"), null);
    test.done();
}

exports['Create Queue']= function(test) {
    var server = sq.createQueueServer();    
    
    var queue = server.createQueue("foo");
    
    test.ok(queue);
    test.done();
}

exports['Create existent Queue']= function(test) {
    var server = sq.createQueueServer();    
    
    var queue0 = server.createQueue("foo");
    
    var queue = server.createQueue("foo");
    
    test.ok(queue);
    test.ok(queue === queue0);
    
    test.done();
}

exports['Create Queue and put Message']= function(test) {
    var server = sq.createQueueServer();    
    
    var queue = server.createQueue("foo");
    queue.putMessage('bar');    
    var result = queue.getMessage();
    
    test.ok(result);
    test.equal(result, 'bar');
    
    test.done();
}

