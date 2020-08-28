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

## Multiple iterators

Each time you construct an _iterator_, you are implictly constructing an instance of the generator which that iterator will control.

## Generating values

An _iterator_ is a well-defined interface for stepping through a series of values from a producer. The JS interface for iteratores, is to call `next()` each time you want the next value from the producer.

The `next()` call returns an object with two properties: `done` is a `boolean` value signaling the iterator's complete status; `value` holds the iteration value.

ES6 also adds the `for..of` loop, which means that a standar iterator can automatically be consumed with native loop syntax.

The `for..of` loop automatically calls `next()` for each iteration -- it doesn't pass any values in to the `next()` -- and it will automatically terminate on receiving a `done:true`

Many built-in data structures in JS, like `array`'s also have default _iterators_:

```js
var a = [1, 3, 5, 7];

for (var v of a) {
  console.log(v);
}
```

### Iterables

_Iterable_ is an `object` that **contains** an _iterator_ that can iterate over its values.

The way to retrieve an _iterator_ from an _iterable_ is that the _iterable_ must have a function on it, with the name being the special ES6 symbol value `Symbol.iterator`. When this function is called, it returns an _iterator_.

The `for..of` loop automatically calls its `Symbol.iterator` function to construct an _iterator_.

```js
var a = [1, 3, 5, 7, 9];
var it = a[Symbol.iterator]();
it.next().value; // 1
it.next().value; // 3
it.next().value; // 5
```

## Generator iterator

`for (var v of something()) { .. }`: we didn't just reference `something` as a value, but instead called the `*something()` generator to get its _iterator_ for the `for..of` loop to use. `something()` call produces an iterator, but the `for..of` loop wants an _terable_, so the generator's _iterator_ algo has a `Symbol.iterator` function on it.

## Stopping the generator

`*something()` generator was basically left in a suspended state forever after the `break` in the loop was called. But there's a hidden behavior that takes care of that for you. **Abnormal completion**, of the `for..of` loop -- generally caused by a `break`, `return`, or an uncaught exception -- sends a signal to the generator's _iterator_ for it to terminate.
Technically, the `for..of` loop also sends this signal to the _iterator_ at the normal completion of the loop.

While a `for..of` loop will automatically send this signal, you may wish to send the signal manually to an _iterator_; you do this by calling `return(..)`.

If you specify a `try..finally` clause inside the generator, it will always be run even when the generator is externally completed. This is useful if you need to clean up resources.

```js
function* something() {
  try {
    // ...
  } finally {
    console.log("cleaning up");
  }
}

var it = something();
for (var v of it) {
  if (v > 500) {
    conosle.log(it.return("hello world").value);
  }
}
// 1 9 33 105 321 969
// cleaning up!
// hello world
```

## Iterating generators asynchronously

```js
function foo(x, y) {
  ajax("..", function (err, data) {
    if (err) it.throw(err);
    else it.next(data);
  });
}

function* main() {
  try {
    var text = yield foo(11, 31);
  } catch (err) {
    console.log(err);
  }
}

var it = main();
it.next();
```

## Synchronous error handling

The awesome part is that this `yield` pausing also allows the generator to `catch` an error. The `yield`-pause nature of generators means that not only do we get synchronous-looking `return` values from async function calls, but we can also synchronously `catch` errors from those async function calls.
