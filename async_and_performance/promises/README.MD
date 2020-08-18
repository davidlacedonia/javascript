# Promises

With promises, the `then(..)` can take two functions, the first for fulfillment, and the second for rejection:

```js
add().then(successFn, errorFn);
```

Once a Promise is resolved, it stays that way forever -- it becomes an _immutable value_ at that point -- and can then be observed as many times as necessary.
