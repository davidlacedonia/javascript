# Async flow control

## Promises

Promises provide a trustable intermediary to manage callbacks. Is an event listener.
Promises can be chained together. A Promise is a _future value_. A promise can only have one of two possible resolution outcomes: _fulfilled_ or _rejected_, with an optional single value.

### Making and using promises

```js
var p = new Promise(function (resolve, reject) {
  // ...
});
```

If you call `resolve(..)` and pass another promise, this promise simply adopts the state.

### Thenables

There are Promise-like objects which, generally, can interoperate with the Promise mechanisms, called _thenables_. Any object with a `then(..)` function on it is assumed to be a thenable.

### Promise API

`Promise.resolve(..)` creates a promise resolved to the value passed in.

```js
var p1 = new Promise.resolve(42);
```

Any value that you are not already certain is a trustable Promise -- even if it could be an immediate value -- can be normilized by passing it to `Promise.resolve(..)`.

`Promise.reject(..)` creates an immediately rejected promise.

`Promise.all([..])` reeturns a promise back which will be fuilfilled if all the values ulfill, or reject immediately once the first of any of them rejects.

`Promise.race([..])` waits only for either the first fulfillment or rejection.
