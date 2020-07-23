# Types

A type is an instrinsic, built-in set of characteristics that uniquely identifies the behavior of a particular value and distinguises it from other values, both to the engine and to the developer.

## Primitive types

- null
- undefined
- boolean
- number
- string
- object
- symbol

```js
typeof undefined === "undefined";
typeof true === "boolean";
typeof 42 === "number";
typeof "42" === "string";
typeof { life: 42 } === "object";
typeof symbol() === "symbol";
```

_null is a special because typeof returns object_

## Subtypes

### Function

A function is referred to as a 'callable object', an object that has an internal `[[Call]]` property that allows it to be invoked. Also they can have properties, as length (number of formal parameters).

```js
typeof function a() {} === "function";
```

### Array

```js
typeof [1, 2, 3] === "object";
```

## Values as types

Variables don't have types, **values** have types. Variables can hold any value, at any time.

`typeof` asks 'What's the type of the value _in_ the variable?'

## undefined vs undeclared

Variables that have no value currently actually have the undefined value.

```js
var a;
typeof a; // 'undefined'
```

An **undefined** variable is one that has been declared in the accesible scope, but at the moment has no other value in it. By contrast, an **undeclared** variable is one that has not been formally declared in the accesible scope.

```js
var a;
a; // undefined
b; // ReferenceError: b is not defined
```

`typeof` returns 'undefined' even for 'undeclared' variables.

```js
typeof b; // 'undefined'
```
