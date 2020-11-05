# Functions as scopes

## Functions as expressions

Enclosing functions inside parenthesis treats the functions as a standar declaration. The function is treated as a function-expresion.

```js
  (function foo(){ .. })
  console.log(foo); // foo is not defined
```

Hides the name `foo` inside itself, which means it dos not pollute the enclosing scope unnecesarily.

## Anonymus vs named

Function expressions can be anonymus, but function declarations cannot omit the name.

Drawbacks of anonymus functions:

- no useful name to display in stack traces, which makes debugging more difficult.
- incapability to refer to itself (recursion)
- less readable/understandle code

The best practice is to always name your functions expressions.

## IIFE

Inmediatly invoked function expressions.
We can execute the function by adding another () on the end

```js
 (function foo() { .. })()
```
