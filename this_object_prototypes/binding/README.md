# Binding

## Call site

Is the location in code where a function is called, **not** where it's declared. Is the only thing that matters for `this` binding.

### Default bingind

Standalone function invocation. Where the function is being called.
In `strict mode` the global object is not eligible of the default binding.

```js
(function def() {
  function foo() {
    console.log(this.a);
  }

  var a = 2;
  foo(); // undefined
})();
```

### Implicit binding

Call site has a context object.
When there is a context object for a function reference, the implicit binding rule says that it's that object that should be used for the function call's `this` binding.

```js
(function implicit() {
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 2,
    foo: foo,
  };

  obj.foo(); //2
})();
```

### Implicitly lost

Implicitly bound function loses that binding, which usually means it falls back to the default binding of either the globat object or undefined, depending on `strict mode`.

A more common case is using callbacks.

```js
(function implicitlyLost() {
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 3,
    foo: foo,
  };

  var bar = obj.foo; // bar is just another reference to foo
  bar(); // undefined
})();
```

### Explicit binding

Using `call` and `apply`.
They both take, as their first parameter, an object to use for the `this`, and then invoke the function with that `this` specified. Since you are directly stating what you want the this to be, we call it explicit binding.

```js
(function explicit() {
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 4,
  };

  foo.call(obj); // 4
})();
```

### Hard binding

Create a function, which internally calls `fn.call(obj)`, thereby forcibly invoking the function with the object binding for `this`. No matter how you later invoke the function, it will always manually invoke `fn` with `obj`. This binding is both explicit and strong, so we call it hard binding.

Since its such a common pattern, it's provided with a buil-in utiliy as of ES5, `Function.prototype.bind`. Which returns a new function that is hardcoded to call the original function with the this context set as you specified

```js
(function hard() {
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 5,
  };

  function bar() {
    foo.call(obj);
  }

  setTimeout(bar, 400); // 5
})();
```

### New binding

There is really no connection to class-oriented functionality implied by the `new` usage in JS. Constructors are just functions that happen to be called with the `new` operator in front of them.

What happens when a function is invoked with the `new` keyword:

1. A brand new object is created.
2. Is prototype linked.
3. Is set as the `this` binding for `that` function call.
4. Returns the newly constructed object.

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2);
console.log(bar.a); //2
```

By calling foo with `new` in front of it, we've constructed a new object and set that new object as the `this` for the new call of foo.

## Precedence

To determine `this` we can follow this order of precedence:

1. Is the function called with `new` **(new binding)**? If so, `this` is the newly constructed object.

```js
var bar = new foo();
```

2. Is the function called with `call` or `apply` **(explicit binding)**, even hidden inside a `bind` **hard binding**? If so, `this` is the explicitly specified object.

```js
var bar = foo.call(obj2);
```

3. Is the function called with a context **(implicit binding)**? If so, `this` is `that` context object.

```js
var bar = obj1.foo();
```

4. Otherwise, default the `this` **(default binding)**. If in `strict mode`, pick `undefined`, otherwise pick the global object.

```js
var bar = foo();
```

### Lexical this (arrow functions)

Instead of using the four standard `this` rules, arrow-functions adopt the `this` binding from the enclosing (function or global) scope. The lexical binding of an arrow-function cannot be overriden (even with `new`!).
Inherit the `this` binding from its enclosing function call.
