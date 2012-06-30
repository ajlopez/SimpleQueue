
var simpleremote = require('simpleremote');

function Queue() 
{
    this.messages = [];
    this.first = 0;
    this.next = 0;
}

Queue.prototype.putMessage = function(msg)
{
    console.log('new message');
    this.messages[this.next++] = msg;
}

Queue.prototype.getMessage = function()
{
    if (this.first == this.next)
        return null;
        
    var message = this.messages[this.first];
    delete this.messages[this.first];
    this.first++;
    
    return message;
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
    console.log('createQueue ' + name);
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
            
        return { refid: name, methods: [ 'getMessage', 'putMessage' ] };
    }
    
    this.createQueue = function(name) {
        var queue = self.server.createQueue(name);
        console.log('queue created');
        return { refid: name, methods: [ 'getMessage', 'putMessage' ] };
    }
}

function Message(payload)
{
    this.payload = payload;
}

exports.Queue = Queue;
exports.Message = Message;
exports.QueueServer = QueueServer;

exports.createRemoteServer = function(server) {
    server = server || new QueueServer();
    return simpleremote.createRemoteServer(new RemoteQueueServer(server));
}

exports.createRemoteClient = function() {
    return simpleremote.createRemoteClient();
}

