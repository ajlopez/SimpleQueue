
var simplequeue = require('../');
var Queue = simplequeue.Queue;
var Message = simplequeue.Message;
var QueueServer = simplequeue.QueueServer;

exports['Create Queue']= function(test) {
    test.expect(3);
    var server = new QueueServer();    
    var remoteserver = simplequeue.createRemoteServer(server);
    remoteserver.listen(3000);
    var client = simplequeue.createRemoteClient();
    client.on('remote', function(remote) {
        remote.createQueue('foo', function(err, result) {
            test.equal(err, undefined);
            test.ok(result);
            test.ok(server.getQueue('foo'));
            client.end();
            remoteserver.close();
            test.done();
        });
    });
    
    client.connect(3000);
}

exports['Get Message']= function(test) {
    test.expect(5);
    var server = new QueueServer();    
    var queue = server.createQueue('queue');
    queue.putMessage(new Message('foo'));
    
    var remoteserver = simplequeue.createRemoteServer(server);
    remoteserver.listen(3000);
    
    var client = simplequeue.createRemoteClient();
    
    client.on('remote', function(remote) {
        remote.getQueue('queue', function(err, queue) {
            test.equal(err, undefined);
            test.ok(queue);
            
            queue.getMessage(function (err, msg) {
                test.equal(err, undefined);
                test.ok(msg);
                test.equal(msg.payload, 'foo');
                client.end();
                remoteserver.close();
                test.done();
            });
        });
    });
    
    client.connect(3000);
}

exports['Get Message and Null']= function(test) {
    test.expect(7);
    var server = new QueueServer();    
    var queue = server.createQueue('queue');
    queue.putMessage(new Message('foo'));
    
    var remoteserver = simplequeue.createRemoteServer(server);
    remoteserver.listen(3000);
    
    var client = simplequeue.createRemoteClient();
    
    client.on('remote', function(remote) {
        remote.getQueue('queue', function(err, queue) {
            test.equal(err, undefined);
            test.ok(queue);
            
            queue.getMessage(function (err, msg) {
                test.equal(err, undefined);
                test.ok(msg);
                test.equal(msg.payload, 'foo');
                queue.getMessage(function (err, msg) {
                    test.equal(err, undefined);
                    test.equal(msg, null);
                    client.end();
                    remoteserver.close();
                    test.done();
                });
            });
        });
    });
    
    client.connect(3000);
}

exports['Remote Consume']= function(test) {
    test.expect(9);
    var server = new QueueServer();    
    var queue = server.createQueue('queue');
    queue.putMessage(new Message(1));
    queue.putMessage(new Message(2));
    queue.putMessage(new Message(3));
    
    var remoteserver = simplequeue.createRemoteServer(server);
    remoteserver.listen(3000);
    
    var client = simplequeue.createRemoteClient();
    
    client.on('remote', function(remote) {
        remote.getQueue('queue', function(err, queue) {
            test.equal(err, undefined);
            test.ok(queue);
            
            var sum = 0;
            
            simplequeue.remoteConsume(queue, function(err, msg) {
                if (err) {
                    console.log(err);
                    return false;
                }
                
                test.ok(msg);
                test.ok(msg.payload);
                
                sum += msg.payload;
                
                if (msg.payload != 3)
                    return true;
                    
                test.equal(sum, 6);
                    
                client.end();
                remoteserver.close();
                test.done();
                
                return false;
            });
        });
    });
    
    client.connect(3000);
}

exports['Get null Message from empty Queue']= function(test) {
    test.expect(4);
    var server = new QueueServer();    
    var queue = server.createQueue('queue');
    
    var remoteserver = simplequeue.createRemoteServer(server);
    remoteserver.listen(3000);
    
    var client = simplequeue.createRemoteClient();
    
    client.on('remote', function(remote) {
        remote.getQueue('queue', function(err, queue) {
            test.equal(err, undefined);
            test.ok(queue);
            
            queue.getMessage(function (err, msg) {
                test.equal(err, undefined);
                test.equal(msg, null);
                client.end();
                remoteserver.close();
                test.done();
            });
        });
    });
    
    client.connect(3000);
}

exports['Get two null Messages from empty Queue']= function(test) {
    test.expect(6);
    var server = new QueueServer();    
    var queue = server.createQueue('queue');
    
    var remoteserver = simplequeue.createRemoteServer(server);
    remoteserver.listen(3000);
    
    var client = simplequeue.createRemoteClient();
    
    client.on('remote', function(remote) {
        remote.getQueue('queue', function(err, queue) {
            test.equal(err, undefined);
            test.ok(queue);
            
            queue.getMessage(function (err, msg) {
                test.equal(err, undefined);
                test.equal(msg, null);
                queue.getMessage(function (err, msg) {
                    test.equal(err, undefined);
                    test.equal(msg, null);
                    client.end();
                    remoteserver.close();
                    test.done();
                });
            });
        });
    });
    
    client.connect(3000);
}
