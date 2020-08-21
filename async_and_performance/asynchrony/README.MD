# Asynchrony

## Event loop

There is a continuosly running loop, and each iteration of this loop is called a **tick**. For each tick, if an event is waiting on the queue, it's taken off and executed. These events are your function callbacks.

Your program is generally broken up into lots of small chunks, which happen one after the other in the event loop queue. And technically, other events not related directly to your program can be interleaved within the queue as well.

## Parallel theading

An event loop, breaks its work into tasks and executes them in serial, disallowing parallel access and changes to shared memory.

## Run to completion

Because of JavaScript's single-threading, the code inside functions is atomic, which means that once a function starts running, the entirety of its code will finish before any of the code in another function can run, or vice versa.

## Inversion of control

When you take part of your program and give over control of its execution to another third party. There's an unspoken 'contract' that exists between your code and the third party utility, a set of things you expect to be maintained.

```js
ajax("..", function () {
  //..
});
```

## Failing to pass along any parameters/environment

If you don't explicitly resolve with a value either way, the value is `undefined`. If you call `resolve(..)` or `reject(..)` with multiple parameters, all subsequent parameters beyond the first will be silently ignored.

## Swallowing any errors/exceptions

If at any point in the creation of a Promise, or in the observation of its resolution, a JS exception error occurs, such as a `TypeError` or `ReferenceError`, that exception will be caught, and it will force the Promise in question to become rejected.

## Trustable promise

If you pass an immediate, non-Promise, non-thenable value to `Promise.resolve(..)`. you get a promise that's fulfilled with that value.

`Promise.resolve(..)` will accept any thenable, and will unwrap it to its non-thenable value. But you get back from `Promise.resolve(..)` is a real, genuine Promise in its place, **one that you can trust**. If what you passed in is already a genuione Promise, you just get it right back.

## Trust built

Promises are a pattern that augment callbacks with trustable semantics, so that the behavior is more reason-able and more reliable. By uninverting the _inversion of control_ of callbacks, we place the control with a trustable system (Promises) that was designed specifically to bring sanity to our async.

## Chain flow

Every time you call `then(..)` on a Promise, it creates and returns a new Promise, which we can _chain_ with.
Whatever value you return from the `then(..)` call's fulfillment callback (the first parameter) is automatically set as the fulfillment of the chained Promise.

```js
var p = Promise.resolve(2);

p.then(function (v) {
  console.log(v);
  return v * 2;
}).then(function (v) {
  console.log(v); // 42
});
```

`Promise.resolve(..)` directly returns a received genuine Promise, or it unwraps the value of a received thenable -- and keeps going recursively while it keeps unwrapping thenables.

Of course, the value passing from step to step is optional. If you don't return an explicit value, an implicit `undefined` is assumed, and the promises still chain together the same way.

```js
request("..")
  .then(function (res) {
    return request("..");
  })
  .then(function (res) {
    console.log(res);
  });
```

If you call `then(..)` on a promise, and you only pass a fulfillment handler to it, an assumed rejection handler is substituted. The assumed rejection handler simply rethrows the error.

If a proper valid function is not passed as the fulfillment handler parameter to `then(..)`, there's also a default handler substituted, and it passes whatever value it receives along to the next step.

## Error handling

`try..catch` is synchronous only, so it fails to help in async code patterns.
Instead use "split callbacks" style, there's one callback for fulfillment and one for rejection.

```js
var p = Promise.reject("oops");
p.then(
  function fulfilled() {
    // never gets here
  },
  function rejected(err) {
    console.log(err);
  }
);
```

## Pit of despair

To avoid losing an error to the silence of a forgotten/discarded Promise, some developers have claimed that a 'best practice' for Promise chains is to always end your chain with a final `catch(..)`.

```js
p.then().catch(handleErrors);
```
