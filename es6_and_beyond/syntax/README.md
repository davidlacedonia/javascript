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
  var b;
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

  a = 3; // TypeError!
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

The `a` variable doesn't actually hold a _constant_ array, it holds a _constant_ reference to the array; the array itself is ffreely mutable.

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

The other common usage of `...` can be seen as almost the opposite; instead of spreading a value out, the `...` gathers a set of values together into an array.

```js
function foo(x, y, ...z) {
  // ...
}
```

The `...z` in this snippet is essentially saying: "gather the _rest_ of the arguments (if any) into an array called `z`."

## Default parameter values

You can only omit arguments on the end (rigthhand side) by simply passing fewer arguements than "expected", but you cannot omit arguments in the middle or at the beginning of the arguments list. It's just not possible.

But you can pass `undefined`, '_undefined_' means missing.

```js
function foo(x = 11, y = 31) {
  //...
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
