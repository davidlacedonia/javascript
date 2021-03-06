# Syntax

## let declarations

We can now create declarations which are bound to any block, called _block scoping_. This means all we need is a pair of `{ .. }` to create a scope. Instead of using `var`, which always declares variables attached to the enclosing function scope, use `let`.

```js
var a = 2;
{
  let a = 3;
  console.log(a); // 3
}

console.log(a); // 2
```

Unlike traditional `var` declared variables, which are attached to the entire enclosing function scope regardless of where they appear, `let` declarations attach to the block scope but are not initialized until they appear in the block.

```js
{
  console.log(a); // undefined
  console.log(b); // ReferenceError!

  var a;
  let b;
}
```

`let` declarations must all be at the top of the scope. They totally avoids the accidental errors of accessing too early. It also makes it more _explicit_ when you look at the start of a block, any block, what variables it contains.

## let + for

The `let i` in the `for` header declares an i not just fot the `for` loop itself, but it redeclares a new `i` for each iteration of the loop. That means that closures created inside the loop iteration close over those per-iteration variables the way you'd expect.

## const declarations

It's a variable that's read-only after its intial value is set.

```js
{
  const a = 2;
  console.log(a); // 2

  a = 3; // TypeError
}
```

A `const` declaration must have an explicit initialization. If you wanted a _constant_ with the `undefined` value, you'd have to declare a `const a = undefined` to get it.
The value is not frozen, just the assignment of it. If the value is complex, such as an object or array, the contents of the value can still be modified.

```js
{
  const a = [1, 2, 3];
  a.push(4);
  console.log(a); // [1, 2, 3, 4]

  a = 42; // TypeError!
}
```

The `a` variable doesn't actually hold a _constant_ array, it holds a _constant_ reference to the array, the array itself is freely mutable.

## Spread / rest

```js
foo(...[1, 2, 3]);
```

When `...` is used in front of an array (actually, any iterable), it acts to "spread" it out into its individual values. `...` acts to give us a simpler syntactic replacement for the `apply(..)` method.

`...` can be used to spread out/expand a value in other contexts as well, such as inside another array declaration.

```js
var b = [1, ...a, 5];
```

In this usage, `...` is basically replacing `concat(..)`.

The other common usage of `...` can be seen as almost the opposite, instead of spreading a value out, the `...` gathers a set of values together into an array.

```js
function foo(x, y, ...z) {
  // ...
}
```

The `...z` in this snippet is essentially saying: "gather the _rest_ of the arguments (if any) into an array called `z`".

## Default parameter values

You can only omit arguments on the end (rigthhand side) by simply passing fewer arguments than "expected", but you cannot omit arguments in the middle or at the beginning of the arguments list. It's just not possible.

But you can pass `undefined`, which means missing.

```js
function foo(x = 11, y = 31) {
  // ...
}
```

## Default value expressions

Function default values can be more than just simply values; they can be any valid expression, even a function call. The default value expressions are lazily evaluated, meaning they're only run if and when they're needed -- that is, when a parameter's argument is omitted or is `undefined`. It's a subtle detail, but the formal parameters in a function declaration are in their own scope -- think of it as a scope bubble wrapped around just the `(..)` of the function declaration.

## Destructuring

```js
var { x, y, z } = bar();
```

When you use object destructuring assignment -- that is, putting the `{ .. }` object literal looking syntax on the lefthand side of the `=` operator -- you invert that `target: source` pattern.

```js
var { x: bam, y: baz, z: bap } = bar();
```

The syntactic pattern here is `source: target`.

## Not just declarations

Destructuring is a general assignment operation, not just a declaration.

```js
var a, b, c, x, y, z;

[a, b, c] = foo();
({ x, y, z }) = bar());
```

The variables can already be declared, and then the destructuring only does assignments.

You can solve the traditional "swap two variables" task without a temporary variable;

```js
var x = 10,
  y = 20;
[x, y] = [y, x];
```

## Too many, too few, just enough

With both array destructuring assignment and object destructuring assignment, you do not have to assign all the values that are present.

```js
var [, b] = foo();
var { x, z } = bar();
```

`...` can perform the same behaviour in destructuring assigments.

```js
var a = [2, 3, 4];
var [b, ...c] = a;

console.log(b, c); // 2 [3, 4]
```

## Default value assignment

Both forms of destructuring can offer a default value option for an assignment

```js
var [a = 3, b = 4] = foo();
var { x, y: YY = 20 } = bar();
```

## Nested destructuring

You can destructure nested values

```js
var a1 = [1, [2, 3, 4], 5];
var o1 = { x: { y: { z: 6 } } };

var [a, [b, c, d], e] = a1;
var {
  x: {
    y: { z: w },
  },
} = o1;

console.log(a, b, c, d, e); // 1 2 3 4 5
console.log(w); // 6
```

It can be a simple way to flatten an object

```js
var app = { model: { user: "david" } };
var {
  model: { user },
} = app;
```

## Object literal extensions

### Concise properties

If you need to define a property that is the same name as a lexical identifier, you can shorten it from `x: x` to `x`.

```js
var x = 2,
  y = 3,
  o = {
    x,
    y,
  };
```

### Concise methods

Functions attached to properties in object literals also have a concise form

```js
var o = {
  x() {
    // ...
  },
  something: function something() {
    // ...
  },
};
```

### Concisely unnamed

The second function here provides a super convenient lexical identifier that will always point to the function itself, giving us the perfect reference for recursion, event binding/unbinding, etc.

Concise methods imply anonymous function expressions. They are short and sweet, and nice convenience. But you should only use them if you're never going to need them to do recursion or event binding/unbinding.

## Computed property names

ES6 allows you to specify an expression that should be computed, whose result is the property name assigned.

```js
var o = {
  [prefix + "foo"]: function () {
    // ..
  },
};
```

Any valid expression can appear inside the `[ .. ]` that sits in the property name position.

## Setting [[Prototype]]

Sometimes it will be helpful to assign the `[[ProtoType]]` of an object at the same time you are declaring its object literal.

```js
var o2 = {
  __proto__: o1,
};
```

For setting the `[[ProtoType]]` of an existing object, you can use the ES6 utility `Object.setPrototypeOf(..)`.

## Object super

```js
var o1 = {
  foo(): {
    console.log('o1');
  }
}

var o2 = {
  foo(): {
    super.foo();
    console.log('o2');
  }
}

Object.setPrototypeOf(o2, o1);
o2.foo(); // o1
          // o2
```

`super` here would basically be the `Object.setPrototypeOf(o2)` -- resolves to `o1` of course -- which is how it finds and calls `o1.foo()`.

## Template literals

The ` back tick as the delimiter. These string literals do allow basic string interpolation expressions to be embedded.

```js
var greeting = `Hello ${name}`;
```

One really nice benefit of interpolated string literals is they are allowed to split accross multiple lines.

## Tagged template literals

```js
function foo(strings, ...values) {
  console.log(strings);
  console.log(values);
}

var desc = "awesome";
foo`Everything is ${desc}`;
// ["Everything is"]
// ["awesome"]
```

It's esesentially a special kind of function call that doesn't need the `( .. )`.
The first argument -- we called it `strings` is an array of all the plain strings.
The arguments gathered into our values array are the result of the already-evaluated interpolation expressions found in the string literal.

## Raw strings

ES6 comes with a built-in function that can be used as a string literal tag: `String.raw(..)`. It simply passes through the raw versions of the `strings`.

## Arrow functions

Inside arrow functions, the `this` binding is not dynamic, but is instead lexical.

## for .. of Loops

ES6 adds a `for..of` loop, which loops over the set of values produced by an _iterator_.

The value you loop over with `for..of` must be an _iterable_, or it must be a value which can be coerced/boxed to an object that is an iterable. An iterable is simply an object that is able to produce an iterator, which the loop then uses.

```js
var a = ["a", "b", "c", "d", "e"];

for (var idx in a) {
  console.log(idx); // 0 1 2 3 4
}

for (var val of a) {
  console.log(val); // 'a' 'b' 'c' 'd' 'e'
}
```

`for..in` loops over the keys/indexes in the `a` array, while `for..of` loops over the values in `a`.

`for..of` loops can be prematurely stopped, just like other loops, with `break`, `continue`, `return`, and throw exceptions. In any ot these cases, the iterator's `return(..)` function is automatically called (if one exists) to let the itetor perform clenaup tasks, if necessary.

```js
let arr = [1, 2, 3, 4, 5];
for (let value of arr) {
  console.log(value);

  if (value === 3) {
    return () => {
      console.log("cleaning");
    };
  }
}
```

## Symbol

A new primitive.

```js
var sym = Symbol("some optional description");
typeof sym; // "symbol"
```

The description, if provided is solely used for the stringification representation of the symbol.

The internal value of a symbol itself -- referred to as its `name`-- is hidden from the code and cannot be obtained. You can think of this symbol value as an automatically generated, unique string value.

The main point of a symbol is to create a string-like value that can't collide with any other value. So for example, consider using a symbol as a constant representing an event name.

```js
const EVT_LOGIN = Symbol("event.login");
```

The benefit here is that `EVT_LOGIN` holds a value that cannot be duplicated by any other value, so it is impossible for there to be any confusion of which event is being dispatched or handled.

## Symbol as object properties

If a symbol is used as a property/key of an object, it's stored in an special way that the property will not show up in a normal enumeration of the object's properties.
You can always seet it in the `Object.getOwnPropertySymbols(..)` enumeration.
