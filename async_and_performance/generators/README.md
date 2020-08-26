# Generators

## Breaking run-to-completion

Is a new type of function that does not behave with the run-to-completion behavior.

```js
var it = foo();

it.next();
x;
bar();
x;
it.next();
```

- The `it = foo()` operation does not execute the `foo()` generator yet, but it merely constructs an iterator that will control its execution.
- The first `it.next()` starts the generator
- `foo()` pauses at the `yield` statement.
- The final `it.next()` call resumed the `foo()` generator from where it was paused.

## Input and output

```js
function* foo(x, y) {
  return x * y;
}

var it = foo(6, 7);
var res = it.next();
res.value; // 42
```

The `foo()` generator hasn't actually run yet as it would have with a function. Instead,
we're just creating an _iterator_ object, which we assign to the variable it, to control the `foo()` generator.

The result of that `next(..)` call is an object with a `value` property on it holding whatever value was returned from `foo()`. In other words, `yield` caused a value to be sent out from the generator during the middle of its execution, kind of like an intermediate `return`.

## Iteration messaging

```js
function* foo(x) {
  var y = x * (yield);
  return y;
}

var it = foo(6);
it.next();
var res = it.next(7);
res.value; // 42
```

`foo()` runs across a `yield` expression, and at that point request the calling code to provide a result value for the yield expression. Next we call `it.next(7)`, which is passing the `7` value back in to _be_ that result of the paused `yield` expression.

Messages can go in both directions. `yield` as an expression can send out messages in response to `next(..)` calls, and `next(..)` can send values to a paused `yield` expression.

```js
function* foo(x) {
  var y = x * (yield "hello");
  return y;
}

var it = foo(6);
var res = it.next();
res.value; // 'hello'
res = it.next(7);
res.value; // 42
```

Only a paused `yield` could accept such a value passed by a `next(..)`.
`return` is certainly not any more required in generators that in regular functions.
