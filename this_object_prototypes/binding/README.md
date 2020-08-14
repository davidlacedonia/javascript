## Call site

Is the location in code where a function is called, NOT where it's decalred. Is the only thing that matters for `this` binding.

### Default bingind

Standalone function invocation. Where the funciton is being called.
In `strict mode` the global object is not eligible of the default binding.

### Implicit binding

Call site has a context object.
When there is a context object for a function reference, the implicit binding rule says that it's that object that should be used for the function call's `this` binding.

### Implicitly lost

Implicitly bound function loses that binding, which usually means it falls back to the default binding of either the globat object or undefgined, depending on `strict mode`.

A more common case is using callbacks.

### Explicit binding

Using `call` and `apply`.
They both take, as their first parameter, an object to use for the `this`, and then inboke the funciton with that `this` specified. Since you are directly stating what you want the this to be, we call it explicit binding.

### Hard binding

Create a function, which internally calls `fn.call(obj)`, thereby forcibly invoking the function with the object binding for `this`. No matter how you later invoke the function, it will always manually invoke `fn` with `obj`. This binding is both explicit and strong, so we call it hard binding.

Since its such a common pattern, it's provided with a buil-in utiliy as of ES5, `Function.prototype.bind`. Which returns a new function that is hardcoded to call the original funciton with the this context set as you specified

### New binding

There is really no connection to class-oriented functionality implied by the `new` usage in JS. Constructors are just funcitons that happen to be called with the `new` operator in front of them.

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

Instead of using the four standar `this` rules, arrow-funcitons adopt the `this` binding from the enclosing (function or global) scope. The lexical binding of an arrow-function cannot be overriden (even with `new`!).
Inherit the `this` binding from its enclosing function call.
