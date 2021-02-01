# Lexical scope

## Lex-time

Lexical scope is scope that is defined at lexing time. In other words, lexical scope is based on where variables and blocks of scope are authored, by you, at write time, and thus is (mostly) set in stone by the time the lexer processes your code.

## Look-ups

Scope look-ups stops once it finds the first match. The same identifier name can be specified at multiple layers of nested scope, which is called **shadowing** (the inner identifier shadows the outer identifier). Regardless of shadowing, scope look-up always starts at the innermost scope being executed at the time, and works its way outward/upward until the first match, and stops.

Global variables are automatically also peroperties of the global object (window in browsers), so its possible to reference a global variable not directly by its lexical name, but instead indirectly as a property reference of the global object.

## Cheating lexical

Cheating lexical scope leads to poorer performance.

### Eval

Takes a string as an argument and treats the contents of the string as if it had actually been authored code at that point in the program. In other words, you can programatically generate code inside of your authored code, and run the generated code as if it has been there at author time. Thus, modifiyn the lexical scope environment.

`eval` is used usually to execute dinamycally created code, as dinamically evaluating essentially static code from a string literal would provide no real benefit to just authoring the code directly.

```js
function foo(str, a) {
  eval(str);
  console.log(a, b); // 1 3
}

var b = 2;
foo("var b = 3;", 1);
```

**When used in a strict-mode program operats in its own lexical scope, which means declarations made inside of the eval() do not actually modify the enclosing scope.**

`setTimeOut()` and `setInterval()` can take a string for their respective first argument, the contents of which are evaluated as the code of a dinamycally generated function. (**legacy, and deprecated, don't do it**)

The `new Function()` function constructor similarly takes a string of code in its last argument to turn into a dinamically generated function. This syntax is slightly safer than `eval`, but it should still be avoidable in your code.

### with

Creates a new lexical scope out of thin air, from the object you pass to it.

```js
with (Math) {
  console.log(cos(2));
}
```

`with` is typically explained as a shorthand for making multiple property references against an object without repeating the object reference itself each time.
Takes an object, one that has zero or more properties, and treats that object as if it is a wholly separate lexical scope, and thus the object's properties are treated as lexically defined identifiers in that scope.
A normal var declaration inside the `with` block will not be scoped to that `with` block, but instead the containing function scope.

### Performance

The javascript engine has a number of performance optimizations, such as predetermine where all the variable and functions declarations are, so that it takes less effor to resolve identifiers during execution.
But both `eval` and `with` cheats lexical scope, so the engine has to assume that all its awareness of identifier location may be invalid. So code runs slower.
