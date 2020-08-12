# Asynchrony

## Event loop

There is a continuosly running loop, and each iteration of this loop is called a **tick**. For each tick, if an event is waiting on the queue, it's taken off and executed. These events are your function callbacks.

Your program is generally broken up into lots of small chunks, which happen one after the other in the event loop queue. And technically, other events not related directly to your program can be interleaved within the queue as well.

## Parallel theading

An event loop, breaks its work into tasks and executes them in serial, disallowing parallel access and changes to shared memory.
