# Currying

Functions that returns another function, until all parameters are provided.

It lets you partially apply functions, and then pass these partially applied function around to higher order function such as map or filter.

Giving you the advantage of reuse, chaining calls, etc.

```js
fetchFromServer()
  .then(JSON.parse)
  .then(get('posts'))
  .then(map(get('title')));
```

Creatign closures, the returned function has access to previous parameters.

## Curried add

```js
const sum = (a) => (b) => a + b;
sum(1)(2); // 3
```
