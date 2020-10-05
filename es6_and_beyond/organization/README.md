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
