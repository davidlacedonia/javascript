## Functions as scopes

### Functions as expressions

Enclosing functions inside parenthesis treats the functions as a standar declaration. The function is treated as a function-expresion.

```js
  (function foo(){ .. })
```

Hides the name __foo__ inside itself, which means it dos not pollute the enclosing scope unnecesarily.

### Anonymus vs named

Function expressions can be anonymus, but function declarations cannot omit the name.

Drawbacks of anonymus functions:
* no useful name to display in stack traces, which makes debugging more dificult.
* incapability to refer to itself (recursion)
* less readable/understandle code

The best practice is to always name your functions expressions.

### IIFE

Inmediatly invoked function expressions.
We can execute the function by adding another () on the end

```js
 (function foo() { .. })()
```