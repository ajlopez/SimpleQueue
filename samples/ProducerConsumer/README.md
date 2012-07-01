# Producer Consumer Sample

It shows a producer and two consumers using a shared queue.

## Usage

```
node app.js
```

## Code

Referencing the library
```js
var simplequeue = require('../..');
var Queue = simplequeue.Queue;
var Message = simplequeue.Message;
```
Setting the objects
```js
var queue = new Queue();
var producer = new Producer(queue, 'Producer');
var consumer1 = new Consumer(queue, 'First Consumer');
var consumer2 = new Consumer(queue, 'Second Consumer');

producer.process();
consumer1.process();
consumer2.process();
```





