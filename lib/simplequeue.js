
function Queue() 
{
    this.messages = [];
    this.first = 0;
    this.next = 0;
}

Queue.prototype.putMessage = function(msg)
{
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
    if (this.queues[name])
        return this.queues[name];
    
    var queue = new Queue();
    this.queues[name] = queue;

    return queue;
}

function Message(payload)
{
    this.payload = payload;
}

exports.Queue = Queue;
exports.Message = Message;
exports.QueueServer = QueueServer;

