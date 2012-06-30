
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
