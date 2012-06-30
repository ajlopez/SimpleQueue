
var simplequeue = require('../');
var Queue = simplequeue.Queue;
var Message = simplequeue.Message;

exports['Get null Message from empty Queue']= function(test) {
    test.expect(2);
    var queue = new Queue();    
    
    queue.getMessage(function(err, msg) {
        test.equal(err, undefined);
        test.equal(msg, null);
        test.done();
    });
}

exports['Put ang get Message from Queue']= function(test) {
    test.expect(4);
    var queue = new Queue();        
    
    queue.putMessage(new Message("foo"));
    
    queue.getMessage(function(err, msg) {
        test.equal(err, undefined);
        test.ok(msg);
        test.ok(msg.payload);
        test.ok(msg.payload, "foo");
        test.done();
    });
}


exports['Put ang get two Messages from Queue']= function(test) {
    test.expect(10);
    var queue = new Queue();        
    
    queue.putMessage(new Message("foo"));
    queue.putMessage(new Message("bar"));
    
    queue.getMessage(function(err, msg) {
        test.equal(err, undefined);
        test.ok(msg);
        test.ok(msg.payload);
        test.ok(msg.payload, "foo");
        
        queue.getMessage(function(err, msg) {
            test.equal(err, undefined);
            test.ok(msg);
            test.ok(msg.payload);
            test.ok(msg.payload, "bar");
            
            queue.getMessage(function(err, msg) {
                test.equal(err, undefined);
                test.equal(msg, null);
                test.done();
            });
        });
    });
}

