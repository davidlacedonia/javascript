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
