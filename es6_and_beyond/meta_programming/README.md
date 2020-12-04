# Meta programming

Meta programming is programming where the operation targets the behavior of the program itself.

Meta programming focuses on one or more of the following: code inspecting itself, code modifying itself, or code modifying default language behavior so other code is affected.

The goal of meta programming is to leverage the language's own intrinsic capabilities to make the rest of your code more descriptive, expressive, and/or flexible.

## Function names

The lexical binding name is what you use for things like recursion. The `name` property is what you'd use for meta programming purposes (that's typically the name used in stack traces in developers tools).

## Inferences

As of ES6, there are now inferences rules which can determine a sensible `name` property value to assign a function even if that function doesn't have a lexical name to use.

Had we given the function a lexical name like `abc = function def() { .. }`, the `name` property would of course be "def".

Here are other forms which will infer a name in ES6:

```js
var obj = {
  baz: () => { .. }, // baz
  bam: function () { .. }, // bam
};

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

One of the most common meta programming tasks is to introspect on a value to find out what _kind_ it is.

The `@@toStringTag` symbol on the prototype specifies a string value to use in the `[object _]` stringification.

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

### Symbol.isConcatSpreadable

The `@@isConcatSpreadable` symbol can be defined as a boolean property, on any object, to indicate if it should be _spread out_ if passed to an array `concat(..)`.

## Proxies

A proxy is a special kind of object you create that "wraps" -- or sits in front of -- another normal object. You can register special handlers (_aka traps_) on the proxy object which are called when various operations are performed against the proxy.

```js
var obj = { a: 1 },
  handlers = {
    get(target, key, context) {
      console.log("accesing: ", key);
      return Reflect.get(target, key, context);
    },
  },
  pobj = new Proxy(obj, hanlders);
```

We "forward" the operation onto `obj` via `Reflect.get(..)`.

Here is a list of handlers you can define on a proxy for a _target_ object/function, and how/when they are triggered:

`get(..)`, `set(..)`, `deleteProperty(..)`, `apply(..)`, `construct(..)`, `getOwnPropertyDescriptor(..)`, `defineProperty(..)`, `getPrototypeOf(..)`, `setPrototypeOf(..)`, `preventExtensions(..)`, `isExtensible(..)`, `ownKeys(..)`, `enumerate(..)`, `has(..)`.

## Reflect API

The `Reflect` object is a plain object, that holds static functions which correspond to various meta programming tasks that you can control. These functions correspond one-to-one with the handler methods (_traps_) that Proxies can define. These utilities in general behave the same as their `Object.*` counterparts.

## Property ordering

This ordering is only guranteed for `Reflect.ownKeys(..)`, `Object.getOwnPropertyNames(..)` and `Object.getOwnPropertySymbols(..)`.

1. Enumerate any owned properties that are integer indexes, in ascending numeric order.
2. Enumerate the rest of the owned string property names in creating order.
3. Enumerate owned symbol properties in creation order.

```js
o[Symbol("c")] = "yay";
o[2] = true;
o[1] = true;
o.b = "awesome";
o.a = "cool";

Reflect.ownKeys(o); // [1, 2, 'b', 'a', Symbol(c)]
Object.getOwnPropertyNames(o); // [1, 2, 'b', 'a']
```

By contrast, `Reflect.enumarate(..)`, `Object.keys(..)`, `for..in`, and `JSON.stringify(..)`, the ordering is implementation dependent and not controllede by specification.

## Feature testing

It's a test that you run to determine if a feature is available or not. Is a meta programming technique, to test the environment your program runs in to then determine how your program should behave.

The most common is checking for the existance of an API and if it's not present, defining a polyfill.

```js
if (!Number.isNaN) {
  Number.isNaN = function (x) {
    return x !== x;
  };
}
```
