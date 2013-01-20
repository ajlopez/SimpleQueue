# SimpleQueue

Simple in-memory queue for Node.js. It can be accessed by remote clients.

## Installation

Via npm on Node:

```
npm install simplequeue
```

Reference it from your program:

```js
var simplequeue = require('simplequeue');
```

## Local Usage

Create queue, put and get message:

```js
var simplequeue = require('simplequeue');
var Queue = simplequeue.Queue;
var Message = simplequeue.Message;

// ....

var queue = new Queue();
var message = new Message('my data'); // it could be an object

queue.putMessage(message);

// ....

var newmessage = queue.getMessage(); // null if no message

// now, newmessage.payload contains 'my daya'

```

There is a local Queue Server
```js
var simplequeue = require('simplequeue');
var server = new simplequeue.QueueServer();
```

Then, you can create a Queue by name
```js
var queue = server.createQueue('myqueue');
```
If the queue already exists, the original queue is returned.

To get an existent queue
```js
var queue = server.getQueue('myqueue');
```
If the queue doesn't exist, null is returned.

## Remote Usage

Server side:
```js
var localserver = new simplequeue.QueueServer();

var server = simplequeue.createRemoteServer(localserver);
server.listen(3000);
```

If you don't need a reference to the local server, it can be omitted:
```js
var server = simplequeue.createRemoteServer();
server.listen(3000);
```

Client side:
```js
var client = simplequeue.createRemoteClient();

client.on('remote', function(server) {
    server.getQueue('myqueue', function(err, queue) {
        if (err) {
            console.log(err);
            return;
        }
        
        queue.putMessage(new simplequeue.Message('my data'));
        
        // or you can get a message with a callback
        
        queue.getMessage(function(err, msg) {
            // ...
        });
    });

});

client.connect(port, host);

```

## Development

```
git clone git://github.com/ajlopez/SimpleQueue.git
cd SimpleQueue
npm install
npm test
```

## Samples

[Local Producer and Consumers](https://github.com/ajlopez/SimpleQueue/tree/master/samples/ProducerConsumer) sample shows
how to launch one producer and two consumers sharing a queue.

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleQueues) and submit
[pull requests](https://github.com/ajlopez/SimpleQueues/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

