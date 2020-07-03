## Lexing

Any snippet of JavaScript has to be compiled before (usually right before!) it's executed.

The first thing Compiller will do with this program is perform **lexing** to break it down into tokens, which it will then parse into a tree.

For example:

```js
var a = 2;
```

1. First Compiler encounters **var a** and asks Scope to see if a variable **a** already exists for that particular scope. If so, it's ignored and moves on. Otherwise it is created on the scope collection.
2. Then, the Engine asks Scope if there is a variable **a** to handle the assignment **= 2**. If so, Engine uses that variable, if not, looks **elsewhere (Nested scope)**
If the Engine eventually finds the variable, it assings the value 2 to it, if not the Engine will raise an error.

## LHS/RHS

**LHS:** Find to assign to it.
Look-up is done when a variable appears on the lefthand side of an assignment operation.
Can ocurr weither with the = operator or by passing arguments (assign to) function parameters.
(Who's the target of the assignment?)
For example: trying to find the variable container itself, so that it can assign.
```js
  a = 2;
```

**RHS:** Find to get the value.
Is done when a variable appears on the righthand side of an assignment operation.
(Who's the source of the assignment?)
For example: means 'go get the value of...'
```js
  console.log(a)
```

_Note: the subtle but important difference is that Compiler handels both the declaration and the value definition during code-generation._

## Nested scope

If a variable cannot be found in the immediate scope, Engine consults the next outercontaining scope, continuing until is found or until the outermost (a.k.a., global) scope has been reached.

## Errors

There is a difference betweeen LHS and RHS.
They behave differently in the circumstance where the variable has not yet been declared (not found in any scope).

It the look-up fails to ever find a variable:

RHS: results in a _ReferenceError_ being throw by the engine.
LHS: creates the variable in the global scope (if not in Strict Mode).

Strict Mode was added in ES5, and it disallows the automatic/implicit global variable creation. So in this case, the Engine would throw a ReferenceError similiarly to the RHS case.

