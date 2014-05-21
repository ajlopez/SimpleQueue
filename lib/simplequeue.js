
'use strict'

var simpleremote = require('simpleremote');

function Queue() 
{
    this.messages = [];
    this.getfns = [];
    this.listeners = [];
    this.first = 0;
    this.next = 0;
}

Queue.prototype.putMessage = function(msg)
{
    if (this.listeners.length == 0 && this.getfns.length == 0) {
        this.messages[this.next++] = new Message(msg);
        return;
    }
    
    this.listeners.forEach(function (fn) {
        fn(msg);
    });
    
    if (this.getfns.length > 0) {
        var getfn = this.getfns.shift();
        getfn(null, msg);
        return;
    }
}

Queue.prototype.getMessageSync = function()
{
    if (this.first == this.next)
        return null;

    var message = this.messages[this.first];
    delete this.messages[this.first];
    this.first++;

    return message.payload;
}

Queue.prototype.getMessage = function(cb)
{
    if (this.first == this.next) {
        this.getfns.push(cb);
        return;
    }

    var message = this.messages[this.first];
    delete this.messages[this.first];
    this.first++;

    cb(null, message.payload);
}

Queue.prototype.onMessage = function(cb)
{
    while (this.first < this.next) {
        var message = this.messages[this.first];
        delete this.messages[this.first];
        this.first++;
        cb(message.payload);
    }
    
    this.listeners.push(cb);
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
    this.getElement = function (name) {
        return server.getQueue(name);
    }
    
    this.getQueue = function (name) {
        var queue = server.getQueue(name);
        
        if (queue == null)
            return null;
 
        var mqueue = simpleremote.marshall(queue);
        mqueue.refid = name;
        
        return mqueue;
    }
    
    this.createQueue = function (name) {
        var queue = server.createQueue(name);
 
        var mqueue = simpleremote.marshall(queue);
        mqueue.refid = name;
        
        return mqueue;
    }

    this.isAsync = function (mthname) {
        return mthname === 'getMessage';
    }
}

function Message(payload)
{
    this.payload = payload;
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
