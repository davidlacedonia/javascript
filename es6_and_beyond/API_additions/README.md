# API Additions

## Array

### Array.of

`Array.of(..)` replaces `Array(..)` as the preferred function-form constructor for arrays, because `Array.of(..)` does not have that special single-number-argument-case.

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

```js
Array.from([1, 2, 3], (value) => value * 100); // [100, 200, 300]
```

### copyWithin

`copyWithin(..)` copies a portion of an array to another location in the same array, overwriting whatever was there before.
The arguments are _target_ (the index to copy to), _start_ (the inclusive index to start the copying from), and optionally _end_ (the exclusive index to stop copying). If any of the arguments are negative, they are taken to be relative from the end of the array.
Copying simply stops when the end of the array is reached.

```js
[1, 2, 3, 4, 5].copyWithin(3, 0); // [1, 2, 3, 1, 2]
```

### fill(..)

Filling an existing array entirely (or partially) with a specified value is natively supported as of ES6 with the `Array#fill(..)` method.

```js
Array(4).fill(undefined); // [undefined, undefined, undefined, undefined]
```

Optionally takes _start_ and _end_ parameters which indicate a subset portion of the array to fill.

### find(..)

Works basically the same as `some(..)`, except that once the callback returns a `true`/truthy value, the actual array value is returned.

```js
a.find(function matcher(v) {
  return v == "2";
});
```

### findIndex(..)

Use `indexOf(..)` if you need the index of a strict match, or `findIndex(..)` if you need the index of a more customized match.

```js
points.findIndex(function matcher(point) {
  return point.x === 3 || point.x === 6;
});
```

## Object

### Object.is(..)

The `Object.is(..)` static function makes a value comparisons in an even more strict fashion than the `===` comparison. In cases where you are trying to strictly identify a `NaN` or `-0` value, `Object.is(..)` is now the preferred option.

```js
Object.is(x, x);
```

### Object.getOwnPropertySymbols(..)

`Object.getOwnPropertySymbols(..)` retrieves only the symbol properties directly on an object.

### Object.setPrototypeOf(..)

`Object.setPrototypeOf(a, b)` utily sets the `[[Prototype]]` of an object for the puropses of _behavior delegation_.

### Object.assign(..)

`Object.assign(..)` the first argument is the _target_, and any other arguments passed are the _sources_, which will be processed in listed order. For each source, its enumerable and own keys, not symbols, are copied as if by plain `=` assignment. `Object.assign(..)` returns the target object.

Non-enumerable properties, and non-owned properties are all excluded from the assignment.

## Number

### Number.isNaN(..)

Global `isNaN(..)` utility has been broken since its inception, in that it returns `true` for things that are not numbers, not just for the actual `NaN` value, because it coerces the argument to a number type. ES6 adds a fixed utility `Number.isNaN(..)`.

### Number.isFinite(..)

`Number.isFinite(..)` omits the coercive behavior.

```js
isfinite("42"); // true
Number.isFinite("42"); // false
```

### Number.isInteger(..)

```js
Number.isInteger(4.2); // false
```

ES6 also degines a `Number.isSafeInteger(..)` utiliy, which checks to make sure the value is both an integer and within the range of `Number.MIN_SAFE_INTEGER`-`Number.MAX_SAFE_INTEGER`.

## String

### repeat(..)

You can repeat a string as:

```js
"foo".repeat(3);
```

### String inspection functions

Three new methods for searching/inspection have been added: `startsWith(..)`, `endsWith(..)` and `includes(..)`.

```js
palindrome.startsWith("on", 5);
palindrome.endsWith("no", 10);
palindrome.includes("on");
```
