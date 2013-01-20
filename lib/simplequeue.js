
var simpleremote = require('simpleremote');

function Queue() 
{
    this.messages = [];
    this.first = 0;
    this.next = 0;
}

Queue.prototype.putMessage = function(msg)
{
    this.messages[this.next++] = new Message(msg);
}

Queue.prototype.getMessage = function()
{
    if (this.first == this.next)
        return null;
        
    var message = this.messages[this.first];
    delete this.messages[this.first];
    this.first++;
    
    return message.payload;
}

function QueueServer()
{
    this.queues = {};
}

QueueServer.prototype.getQueue = function(name) 
{
    return this.queues[name];
};

QueueServer.prototype.createQueue = function(name)
{
    if (this.queues[name])
        return this.queues[name];
    
    var queue = new Queue();
    this.queues[name] = queue;

    return queue;
}

function RemoteQueueServer(server) {
    this.server = server;
    var self = this;
    
    this.getElement = function(name) {
        return self.server.getQueue(name);
    }
    
    this.getQueue = function(name) {
        var queue = self.server.getQueue(name);
        
        if (queue == null)
            return null;
 
        var mqueue = simpleremote.marshall(queue);
        mqueue.refid = name;
        
        return mqueue;
    }
    
    this.createQueue = function(name) {
        var queue = self.server.createQueue(name);
        return { refid: name, methods: [ 'getMessage', 'putMessage' ] };
    }
}

function Message(payload)
{
    this.payload = payload;
}

function consume(queue, fn, timeout, nmsgs) {
    nmsgs = nmsgs || 100;
    timeout = timeout || 1000;
    
    for (var n=0; n<nmsgs; n++)
    {
        var msg = queue.getMessage();
        if (msg == null)
            break;
        if (!fn(msg))
            return;
    }
    
    setTimeout(function() {
        consume(queue, fn, timeout, nmsgs);
    }, timeout);
}

function remoteConsume(queue, fn, timeout) {
    timeout = timeout || 1000;
    
    queue.getMessage(function(err, msg) {
        if (!err && msg == null) {
            setTimeout(function() {
                remoteConsume(queue, fn, timeout);
            }, timeout);
            
            return;
        }
            
        if (fn(err, msg))
            remoteConsume(queue, fn, timeout);
    });
}

exports.createRemoteServer = function (server) {
    server = server || new QueueServer();
    return simpleremote.createRemoteServer(new RemoteQueueServer(server));
};

exports.createRemoteClient = function () {
    return simpleremote.createRemoteClient();
};

exports.createQueue = function () {
    return new Queue();
};

exports.createQueueServer = function () {
    return new QueueServer();
};

/*
exports.consume = consume;
exports.remoteConsume = remoteConsume;
*/
