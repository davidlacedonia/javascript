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
