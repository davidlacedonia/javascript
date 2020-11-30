# Now and future

## Transpiling

Roughly, the idea is to use a special tool to transform your ES6 code into equivalent matches that work in ES5 environments.
Transpilers perfom these transformations for you, usually in a build workflow step similar to how/when you perform linting, minification, etc.

## Shims/Polyfills

Not all new ES6 features need a transpiler. Polyfills (aka shims) are a pattern for defining equivalent behavior from a newer environment into an older environment when possible. Syntax cannot be polyfilled, but APIs often can be.

For example:

```js
if (!Object.is) {
  Object.is = function () {
    // ...
  };
}
```
