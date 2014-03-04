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
var sq = require('simplequeue');

// ....

var queue = sq.createQueue();
queue.putMessage('my data');

// ....

var newmessage = queue.getMessageSync(); // null if no message

// now, newmessage contains 'my daya'

// put another message

queue.putMessage('my new data');

// ....

// get the message with a callback

queue.getMessage(function (err, msg) {
    // now msg contains 'my new data'
});

```

There is a local Queue Server
```js
var sq = require('simplequeue');
var server = new sq.createQueueServer();
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
var localserver = sq.createQueueServer();

var server = sq.createRemoteServer(localserver);
server.listen(3000);
```

If you don't need a reference to the local server, it can be omitted:
```js
var server = sq.createRemoteServer();
server.listen(3000);
```

Client side:
```js
var client = sq.createRemoteClient();

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

- [Local Producer and Consumers](https://github.com/ajlopez/SimpleQueue/tree/master/samples/ProducerConsumer)
Sample demostrating how to launch one producer and two consumers sharing a queue.
- [Distributed Producers and Consumers](https://github.com/ajlopez/SimpleQueue/tree/master/samples/DistributedProducerConsumer)
Using a central queue server from distributed producers and consumers.

## Versions

- 0.0.1: Published.
- 0.0.2: Published. 
More factory methods exposed, instead of direct 'classes'. 
It uses a new version of SimpleRemote (0.0.3)
- 0.0.3: Published. Engine range update; it uses SimpleRemote 0.0.4
- 0.0.4: Published. Using SimpleRemote 0.0.5

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleQueues) and submit
[pull requests](https://github.com/ajlopez/SimpleQueues/pulls) � contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

