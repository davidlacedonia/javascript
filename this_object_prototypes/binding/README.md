## Call site

Is the location in code where a function is called, NOT where it's decalred. Is the only thing that matters for _this_ binding.

### Default bingind

Standalone function invocation. Where the funciton is being called.
In _strict mode_ the global object is not eligible of the default binding.

### Implicit binding

Call site has a context object.
When there is a context object for a function reference, the implicit binding rule says that it's that object that should be used for the function call's _this_ binding.

### Implicitly lost

Implicitly bound function loses that binding, which usually means it falls back to the default binding of either the globat object or undefgined, depending on _strict mode_.

A more common case is using callbacks.

### Explicit binding

Using _call_ and _apply_.
They both take, as their first parameter, an object to use for the _this_, and then inboke the funciton with that _this_ specified. Since you are directly stating what you want the this to be, we call it explicit binding.

### Hard binding

Create a function, which internally calls _fn.call(obj)_, thereby forcibly invoking the function with the object binding for _this_. No matter how you later invoke the function, it will always manually invoke _fn_ with _obj_. This binding is both explicit and strong, so we call it hard binding.

Since its such a common pattern, it's provided with a buil-in utiliy as of ES5, _Function.prototype.bind_. Which returns a new function that is hardcoded to call the original funciton with the this context set as you specified

### New binding

There is really no connection to class-oriented functionality implied by the _new_ usage in JS. Constructors are just funcitons that happen to be called with the _new_ operator in front of them.

What happens when a function is invoked with the _new_ keyword:

1. A brand new object is created.
2. Is prototype linked.
3. Is set as the _this_ binding for _that_ function call.
4. Returns the newly constructed object.

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2);
console.log(bar.a); //2
```

By calling foo with _new_ in front of it, we've constructed a new object and set that new object as the _this_ for the new call of foo.

## Precedence

To determine _this_ we can follow this order of precedence:

1. Is the function called with _new_ **(new binding)**? If so, _this_ is the newly constructed object.

```js
var bar = new foo();
```

2. Is the function called with _call_ or _apply_ **(explicit binding)**, even hidden inside a _bind_ **hard binding**? If so, _this_ is the explicitly specified object.

```js
var bar = foo.call(obj2);
```

3. Is the function called with a context **(implicit binding)**? If so, _this_ is _that_ context object.

```js
var bar = obj1.foo();
```

4. Otherwise, default the _this_ **(default binding)**. If in _strict mode_, pick _undefined_, otherwise pick the global object.

```js
var bar = foo();
```

### Lexical this (arrow functions)

Instead of using the four standar _this_ rules, arrow-funcitons adopt the _this_ binding from the enclosing (function or global) scope. The lexical binding of an arrow-function cannot be overriden (even with _new_!).
Inherit the _this_ binding from its enclosing function call.
