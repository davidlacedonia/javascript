## Hoisting

Variable and function declarations are moved from where they appear in the flow of the code to the top of the code.
Only the declarations themeselves are hoisted, while any assignments or other executable logic are left in place.

```js
console.log(a);
var a = 2;
```

Hoists to:

```js
var a;
console.log(a);
a = 2;
```

### Compiler

All declarations are processed first, before any part of your code is executed.

```js
var a = 2;
```

This is actually interpreted as two statements.
`var a` and `a = 2`
The first statement, the declaration, is processed during the compilation phase. The second statement, the assignment, is left in place for the execution phase.

Hoisting is per scope.

Function declarations are hoisted, but function expressions are not.

### Functions first

Functions are hoisted first, and then variables.
And duplicate declarations are ignored, so the function declaration will win.

While multiple/duplicate `var` declarations are effectively ignored, subsequent function declarations do override previous ones.

Functions declarations that appear inside of normal blocks typically hoists to the enclosing scope.
