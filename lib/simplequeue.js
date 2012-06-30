
function Queue() 
{
    this.messages = [];
    this.first = 0;
    this.next = 0;
}

Queue.prototype.putMessage = function(msg, cb)
{
    this.messages[this.next++] = msg;
    
    if (cb)
        cb(undefined, true);
}

Queue.prototype.getMessage = function(cb)
{
    if (this.first == this.next) {
        if (cb)
            cb(undefined, null);
        return;
    }
        
    var message = this.messages[this.first];
    delete this.messages[this.first];
    this.first++;
    
    if (cb)
        cb(undefined, message);
}

function QueueServer()
{
    this.queues = {};
}

QueueServer.prototype.getQueue = function(name, cb) 
{
    if (cb)
        cb(undefined, this.queues[name]);
};

QueueServer.prototype.createQueue = function(name, cb)
{
    if (this.queues[name]) {
        if (cb)
            cb("Queue already exists");
            
        return;
    }
    
    var queue = new Queue();
    this.queues[name] = queue;
    
    if (cb)
        cb(undefined, queue);
}

function Message(payload)
{
    this.payload = payload;
}

exports.Queue = Queue;
exports.Message = Message;
exports.QueueServer = QueueServer;

