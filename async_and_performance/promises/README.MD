# Promises

With promises, the `then(..)` can take two functions, the first for fulfillment, and the second for rejection:

```js
add().then(successFn, errorFn);
```

Once a Promise is resolved, it stays that way forever -- it becomes an _immutable value_ at that point -- and can then be observed as many times as necessary.

## Duck typing

The way to recognize a Promise (or something that behaves like a Promise) would be to define something called a "thenable" as any object or function which has a `then(..)` method on it. It is assumed that any such values is a Promise-conforming thenable.

## Promise trust

### Calling to early

When you call `then(..)` on a Promise, even if that Promise was already resolved, the callback you provide to `then(..)` will **always** be called asynchronously.

### Calling to late

A Promise's `then(..)` registered observation callbacks are automatically scheduled when either `resolve(..)` or `reject(..)` are called by the Promise creation capability. Those scheduled callbacks will predictably be fires at the next asynchronoys moment.

When a Promise is resolved, all `then(..)` registered callbacks on it will be called, in order, immediately at the next asyncronous opportunity.

```js
p.then(function () {
  p.then(function () {
    console.log("C");
  });
  console.log("A");
});
p.then(function () {
  console.log("B");
});
/// A B C
```

### Scheduling quirks

Never rely on anything about the ordering/scheduling of callbacks across promises. In fact, a good practice is not to code in such a way where the ordering of multiple callbacks matter at all. _(because, for example, if a then has anothe promise inside, other thenables at the same level can be fired first)_

### Never calling the callback

Nothing can prevent a Promise from notifying you of its resolution (if it's resolved). If you register both fulfillment and rejection callbacks for a Promise, and the Promise gets resolved, one of the two callbacks will always be called.

What if the Promise itself never gets resolved either way?, could be solved with a higher level abstraction called a "race".

```js
function timeoutPromise(delay) {
  return new Promise(setTimeout(() => resolve(), delay));
}

Promise.race([foo(), timeoutPromise(3000)]).then(
  () => console.log("fulfillment!"),
  () => console.log("rejected by timeout!")
);
```
