
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

function Message(payload)
{
    this.payload = payload;
}

exports.Queue = Queue;
exports.Message = Message;