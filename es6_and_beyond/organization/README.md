# Organization

## Iterators

Iterators are a way of organizing ordered, sequential, pull-based consumption of data.

### Interface iterators

**Required**:

`next()`: (_method_) retrevies next `IteratorResult`

**Optional**:

`return()`: (_method_) stops iterator and returns `IteratorResult`
`throw()`: (_method_) signals error and returns `IteratorResult`

**IteratorResult**:

`value`: (_propert_), current iteration value or final return value
`done`: (_property_) boolean, indicates completion status

By general convention, calling `next(..)` on an iterator that's already been exhausted is not an error, but will simply continue to return the result `{ value: undefined, done: true}`.

### Optional return(..) and throw(..)

`return(..)` is defined as sending a signal to an iterator that the consuming code is complete and will not be pulling any more values from it. The signal can be used to notify the producer to perform any cleanup it may need to do, such as releasing/closing network, database, or file handle resources, etc.

`throw(..)` is used to signal an exception/error to an iterator. It does not necessarily imply a complete stop of the iterator as `return(..)` generally does.
`throw(..)` actually injects a thrown exception into the generetor's paused execition context, which can be caught with a `try..catch`.

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

The major difference is that executing a generator, like `foo(5, 10)` doesn't actually run the code in the generator. Instead, it produces an iterator which will control the generator to execute its code.

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

### exporting API members

```js
export function foo() {
  // ..
}

export var awesome = 42;

var bar = [1, 2, 3];
export { bar };
```

Anything you don't label with export stays private inside the scope of the module.

You can also "rename" a module member during named export.

```js
function foo() { .. }
export { foo as bar };
```

When you export something, you're exporting a binding to that thing. That means that if you change the value inside your module of a variable you already exported a binding to, even if it's already been imported, the imported binding will resolve to the current value.

```js
function foo(..) {
  // ..
}

export default foo;
```

Here you are exporting a binding to the function expression value at that moment, _not_ to the identifier foo.

```js
function foo(..) {
  // ..
}

export { foo as default };
```

In this version of the module export, the default export binding is actually the foo identifier rather than its value, so you get the earlier described behavior that later changing `foo`'s value updates what is seen on the import binding side.

The advantage of having each member individually and explicitly exported is that the engine _can_ do the static analysis and optimization.

You can also re-export another module's export, such as:

```js
export { foo, bar } from "baz";
export { foo as FOO } from "baz";
export * from "baz";
```

### importing API members

If you want to import certain specific named members of a module's API.

```js
import { foo, bar, baz } from "foo";
```

You can rename the bound identifiers imported, as:

```js
import { foo as theFooFunc } from "foo";
```

If the module just has a default export:

```js
import foo from "foo";
```

You can also import a defautl export along with other named exports.

```js
import foo, { bar } from "foo";
```

You can import the entire API to a single module:

```js
import * as foo from "foo";
```

If the module you're importing with `* as ..` has a default export, it is named `default` in the namespace specified.
All imported bindings are immutable and/or read-only.

Declarations that occur as a result of an `import` are "_hoisted_".

```js
foo();
import { foo } from "foo";
```

`import "foo"`, this form does not actually import any of the module's bindings into your scope. It loads (if not already loaded), compiles (if not already compiled), and evaluates (if not already run) the "foo" module. Is a sort of preload for a module that may be needed later.

## Classes

```js
class Foo {
  constructor(a, b) {
    this.x = a;
    this.y = b;
  }

  gimmeXY() {
    return this.x * this.y;
  }
}
```

- `class` implies creating a (special) function of the name `Foo`.
- `constructor(..)` identifies the signature, as well as its body contents.
- Class methods use the same "concise method" syntax available to object literals.
- Unlike object literals, there are no commas separating members in a class body, in fact, they are not even allowed

The `Foo(..)` call _must_ be made with `new`.
`class Foo` is not hoisted, so you must declare a `class` before you can instantiate it.

Another way of thinking about `class`, which I find more convenient, is as a _macro_ that is used to automatically populate a `prototype` object. Optionally, it also wires up the `[[Prototype]]` relationship if using `extends`.

### extends and super

ES6 classes also have syntax sugar for establishing the `[[Prototype]]` delegation link between two function prototypes, using the class-oriented familiar terminology `extend`.

```js
class Bar extends Foo {
  constructor(a, b, c) {
    super(a, b);
    this.z = c;
  }

  gimmeXYZ() {
    return super.gimmeXY() * this.z;
  }
}
```

`super` automatically refers to the "parent constructor". In a method, it refers to the "parent object", such that you can then make a property/method access off it, such as `super.gimmeXY()`.
`Bar extends Foo` of course means to link the `[[Prototype]]` of `Bar.prototype` to `Foo.prototype`.

### Subclass constructor

Constructors are not required for classes or subclasses. The default subclass constructor automatically calls the parent constructor, and passes along any arguments.

```js
constructor (...args) {
  super(...args);
}
```

### Extending natives

One of the most heralded benefits to the new `class` and `extend` design is the ability to subclass the built-in natives, like `Array`.

```js
class MyCoolArray extends Array {
  first() {
    return this[0];
  }
  last() {
    return this[this.length];
  }

  var a = new MyCoolArray(1, 2, 3);
  a.length; // 3
  a; // [1, 2, 3]
  a.first(); // 1
  a.last(); // 3
}
```
