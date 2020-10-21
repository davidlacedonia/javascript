# API Additions

## Array

### Array.of

`Array.of(..)` replaces `Array(..)` as the preferred funciton-form constructor for arrays, because `Array.of(..)` does not have that special single-number-argument-case.

```js
var b = Array.of(3);
b.length; // 1
b[0]; // 3
```

### Array.from

ES6 `Array.from(..)` method can be a more understandable and graceful.

```js
var arr = Array.from(arrLike);
var arrCopy = Array.from(arr);
```

If you pass an array-like as the first argument to `Array.from(..)`, it behaves basically the same as `slice()` or `apply(..)` does, which is that it simply loops over the value, accessing numericallly named properties from 0 up to whatever the value of length is.

Never produces empty slots.

```js
Array.from(emptySlotsArr);
// [undefined, undefined, "foo", undefined]
```

You should never intentionally work with empty slots, as it will almost certainly lead to strange/unpredictable behavior in your program.

### Mapping

`Array.from(..)` second argument, if provided, is a mapping callback. It also takes a third argument, that if set will specify the `this` binding for the callback passed as the second argument.

### copyWithin

`copyWithin(..)` copies a portion of an array to another location in the same array, overwriting whatever was there before.
The arguments are _target_ (the index to copy to), _start_ (the inclusive index to start the copying from), and optionally _end_ (the exclusive index to stop copying). If any of the arguments are negative, they are taken to be relative from the end of the array.
Copying simply stops when the end of the array is reached.

```js
[1, 2, 3, 4, 5].copyWithin(3, 0); // [1, 2, 3, 1, 2]
```
