
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

exports['Put and sync get Message from Queue']= function(test) {
    var queue = sq.createQueue();        
    
    queue.putMessage("foo");
    var msg = queue.getMessageSync();
    
    test.ok(msg);
    test.equal(msg, "foo");
    test.done();
}

exports['Put and sync get two Messages from Queue']= function(test) {
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

/*
exports['Consume Queue']= function(test) {
    test.expect(7);
    
    var queue = sq.createQueue();        
    
    queue.putMessage(1);
    queue.putMessage(2);
    queue.putMessage(3);
    
    var sum = 0;
    
    sq.consume(queue, function(msg) {
        test.ok(msg);
        sum += msg;
        
        if (msg != 3)
            return true;
            
        test.equal(sum, 6);
        test.done();
        
        return false;
    });
}
*/