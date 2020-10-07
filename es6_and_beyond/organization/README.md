# Organization

## Iterators

Iterators are a way of organizing ordered, sequential, pull-based consumption of data.

### Interface iterators

**Required**:

`next()`: (method) retrevies next `IteratorResult`

**Optional**:

`return()`: (method) stops iterator and returns `IteratorResult`
`throw()`: (method) signals error and returns `IteratorResult`

**IteratorResult**:

`value`: (propert), current iteration value or final return value
`done`: (property) boolean, indicates completion status

By general convention, calling `next(..)` on an iterator that's already been exhausted is not an error, but will simply continue to return the result `{ value: undefined, done: true}`.

### Optional return(..) and throw(..)

`return(..)` is defined as sending a signal to an iterator that the consuming code is complete and will not be pulling any more values from it. The signal can be used to notify the producer to perform any cleanup it may need to do, such as releasing/closing network, database, or file handle resources, etc.

`throw(..)` is used to signal an exception/error to an iterator. It does not necessarily imply a complete stop of the iterator as `return(..)` generally does.
`throw(..)` actually injects a thrown exception into the generetor's paused execition context, which can be caught with a `tru..catch`.

By general convention, an iterator should not produce any more results after having called `return(..)` or `throw(..)`.

### Iterator loop

If an iterator is also an iterable, it can be used directly with the `for..of` loop. You make an iterator an iterable by giving it a `Symbol.iterator` method that simply returns the iterator itself.

```js
var it = {
  [Symbol.iterator]() { return this; },

  next() { .. },
}

it[Symbol.iterator]() === it; // true
```

### Iterator consumption

Array destructuring can partially or completely consume an iterator.

```js
var it = a[Symbol.iterator]();

var [x, y] = it; // takes the first two elements
var [z, ...w] = it; // third, and rest all at once
```

## Generators

A generator can pause itself in mid-execution, and can be resumed either right away or a later time. Moreover, each pause/resume cycle in mid-execution is an opportuniy for two-way messaging passing, where the generator can return a value, and the controlling code that resumes it can send a value back in.

### Syntax

The generator function is declared with this new syntax

```js
function* foo() {
  // ..
}
```

The major differce is that executing a generator, like `foo(5, 10)` doesn't actually run the code in the generator. Instead, it produces an iterator which will control the generator to execute its code.

### yield

Generator also have a new keyword you can use inside them, to signal the pause point: `yield`.

`yield` is not just a pause point. It's an expression that sends out a value when pausing the generator.

The `yield` expression not only sends a value, but also receives.

```js
function* foo() {
  var x = yield 10;
  console.log(x);
}
```

When you resume the generator, using the `it.next(..)`, whatever value you resume with will replace/complete the whole `yield 10` expression.

### yield \* delegation

The completion value of the `yield * ..` expression comes from the return value from the delegated-to iterator.

### Iterator control

Generators are controlled by iterators

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}
```

We already know we can consume an iterator, even one attached to a generator like `*foo()`, with a `for..of` loop

```js
for (var of foo()) {
  console.log(v);
}
// 1 2 3
```

It's appropriate to think of generators as controlled, progressive code execution.

### Early completion

The iterator attached to a generator supports the optional `return(..)` and `throw(..)` methods.

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}

var it = foo();
it.next(); // { value: 1, done: false }
it.return(42); // { value: 42, done: true }
it.next(); // { value: undefined, done: true }
```

`return(x)` is kind of like forcing a `return x` to be processed at exactly that moment, such that you get the specified value right back.

Once a generator is completed, either normally or early as shown, it no longer processes any code or returns any values.

The purpose is that it can perhaps do any cleanup tasks. Identical to a normal function pattern, the main way to accomplish this is to use a `finally` clause.

```js
function* foo() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log("clean up!");
  }
}
```

### Early abort

Instead of calling `return(..)`, you can call `throw(..)`. Calling `throw(..)` is essentially like injecting `throw x` at the pause point.

### Error handling

Error handling with generators can be expressed with `try..catch`, which works in both inbound and outbound directions.

```js
function* foo() {
  try {
    yield 1;
  } catch (err) {
    console.log(err);
  }

  yield 2;
  throw "Hello";
}

var it = foo();
it.next(); // { value: 1, done: false }
try {
  it.throw("hi"); // hi
  // { value: 2, done: false }
  it.next();
  console.log("never gets here");
} catch (err) {
  console.log(err); // Hello
}
```

## Modules

ES6 modules are singletons. That is, there's only one instance of the module, which maintains its state. Every time you import that module into another module, you get a reference to the one centralized instance.
