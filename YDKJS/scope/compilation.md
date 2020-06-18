# Compilation

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

**LHS:**: Find to assign to it
Look-up is done when a variable appears on the lefthand side of an assignment operation.
(Who's the target of the assignment?)
For example: trying to find the variable container itself, so that it can assign.
```js
  a = 2;
```

**RHS:** Find to get the value
Is done when a variable appears on the righthand side of an assignment operation.
(Who's the source of the assignment?)
For example: means 'go get the value of...'
```js
  console.log(a)
```

__Note: the subtle but important difference is that Compiler handels both the declaration and the value definition during code-generation.__

