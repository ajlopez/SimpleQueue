
var sq = require('..');

exports['Get null Message from empty Queue']= function(test) {
    var queue = sq.createQueue();    
    
    test.equal(queue.getMessageSync(), null);
    test.done();
}

exports['Put Message in Queue']= function(test) {
    var queue = sq.createQueue();        
    
    queue.putMessage("foo");
    test.done();
}

exports['Put and Sync Get Message']= function(test) {
    var queue = sq.createQueue();        
    
    queue.putMessage("foo");
    var msg = queue.getMessageSync();
    
    test.ok(msg);
    test.equal(msg, "foo");
    test.done();
}

exports['Put and Async Get Message']= function(test) {
    var queue = sq.createQueue();        

    queue.putMessage("foo");

    queue.getMessage(function (err, msg) {
        test.ok(msg);
        test.equal(msg, "foo");
        test.done();
    });    
}

exports['Get and Put Message']= function(test) {
    var queue = sq.createQueue();        

    queue.getMessage(function (err, msg) {
        test.ok(msg);
        test.equal(msg, "foo");
        test.done();
    });    

    queue.putMessage("foo");
}

exports['Put and sync get two Messages']= function(test) {
    var queue = sq.createQueue();        
    
    queue.putMessage("foo");
    queue.putMessage("bar");
    
    var msg1 = queue.getMessageSync();
    var msg2 = queue.getMessageSync();
    
    test.ok(msg1);
    test.equal(msg1, "foo");
    test.ok(msg2);
    test.equal(msg2, "bar");
    
    test.done();
}

exports['Put and Async Get Two Messages']= function(test) {
    var queue = sq.createQueue();        
    
    queue.putMessage("foo");
    queue.putMessage("bar");
    
    queue.getMessage(function (err, msg) {
        test.ok(msg);
        test.equal(msg, "foo");
    });

    queue.getMessage(function (err, msg) {
        test.ok(msg);
        test.equal(msg, "bar");
        test.done();
    });
}

exports['Async Get and Put Two Messages']= function(test) {
    var queue = sq.createQueue();        
    
    queue.getMessage(function (err, msg) {
        test.ok(msg);
        test.equal(msg, "foo");
    });

    queue.getMessage(function (err, msg) {
        test.ok(msg);
        test.equal(msg, "bar");
        test.done();
    });
    
    queue.putMessage("foo");
    queue.putMessage("bar");
}
