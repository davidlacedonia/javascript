# Modules

## Revealing module

An outer function that returns an object exposing inner functions. Keeping others hidden and private.
The object returned its like a public API.
Without the execution of the outer function, the creation of the inner scope and the closures would not work.

There are two requirements for the module pattern to be exercised.

1. There must be an outer enclosing function, and it must be invoked at least once.
2. The enclosing function must return back at lest one inner function, so that the inner function has closure over the private scope, and can access and/or modify that private state.

A slight variation on this pattern is when you only care to have one instance, a singleton of sorts.

```js
function coolModule() {
  var something = "cool";

  function doSomething() {
    console.log(something);
  }

  return { doSomething }; // exposing doSomething
}

var api = coolModule();
api.doSomething();
```

## Future modules

ES6 treats a file as a separate module. Each module can both import other modules or specific API members, as well export their own public API members.
ES6 modules APIs are static, since the compiler knows that, it can check during compilation that a rederence to a member of an imported module's API actually exists. If the API reference doesn't exist, the compiler throws an early error at compile time, rather than waiting for the traditional dynamic runtime resolution.
