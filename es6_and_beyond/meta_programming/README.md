# Meta programming

Meta programming is programming where the operation targets the behavior of the program itself.

Meta programming focuses on one or more of the following: code inspecting itself, code modifying itself, or code modifying defualt language behavior so other code is affected.

The goal of meta programming is to leverage the language's own intrinsic capabilities to make the rest of your code more descriptive, expressive, and/or flexible.

## Function names

The lexical binding name is what you use for things like recursion. The `name` property is what you'd use for meta programming purposes (that's typically the name used in stack traces in developers tools).

## Inferences

As of ES6, there are now inferences rules which can determine a sensible `name` property value to assign a function even if that function doesn't have a lexical name to use.

Had we given the function a lexical name like `abc = function def() { .. }`, the `name` property would of course be "def".

Here are other forms which will infer a name in ES6:

```js
baz: () => { .. }, // baz
bam: function () { ..}, // bam

export default function() { .. } // default
```

## Meta properties

Meta properties are intended to provide special meta information in the form of a property access that would otherwise not have been possible.

`new.target` is used inside a constructor call, to refer to the target constructor that `new` invoked.

The intent is to determine from inside a constructor call what the original `new` target was, generally for the purposes of introspection. You may want to have a different behavior in a constructor depending on if its directly invoked or invoked via a child class.

## Well known symbols (WKS)

### Symbol.iterator

We can define our own iterator logic for any object value by setting the `Symbol.iterator` property. The meta programming aspect is that we are defining behavior which other parts in JS (namely, operators and looping constructs) use when processing an object value we define.

```js
arr[Symbol.iterator] = function() { .. }
```

### Symbol.toString and Symbol.hasInstance

One of the most common meta programming tasks is to introspeect on a value to find out what _kind_ it is.

The `@@toStringTag` symbol on the prototype specifies a string value to use in the `[object ___]` stringification.

The `@@hasInstance` symbol is a method on the constructor function which receives the instance object value and lets you decide by returning `true` or `false` if the value should be considered an instance or not.

### Symbol.toPrimitive

The `@@toPrimitive` symbol as a property on any object value can customize that `toPrimitive` coercion by specifying a method.

```js
var arr = [1, 2, 3, 4, 5];

arr + 10; // 1, 2, 3, 4, 510

arr[Symbol.toPrimitive] = function (hint) {
  return this.reduce((prev, acc) => prev + acc, 0);
};

arr + 10; // 25
```
