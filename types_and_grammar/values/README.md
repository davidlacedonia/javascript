# Values

## Arrays

Arrays are numerically indexed, but the tricky thing is that they also are objects that can have `string` keys/properties added to them.

```js
var a = [];
a[0] = 1;
a["foobar"] = "hey!";
a.length; // 1
a.foobar; // hey!
```

If `slice()` is called without any other paramenters, the default values for its parameters have the effect of duplicating the array.
In ES6 there's also a built-in utility called `Array.from(..)`

```js
const duplicatedArray = Array.from([1, 2, 3]);
```

## Strings

JavaScript strings are **immutable**, while arrays are quite mutable.
So none of the string methods that alter its content can modify in-place, but rather must create and return new strings.

```js
c = a.toUpperCase();
a === c; //false
a; // 'foo'
c; // 'FOO'
```

## Numbers

JavaScript has just one numeric type: **number**. This type includes both _integer_ values and _fractional decimal_ numbers.

Be carefull with the `.` operator. Since its a valid numeric character, it will first be interpreted as part of the number literal, if possible, instead of being interpreted as a property accessor.

```js
// invalid syntax
42.toFixed(3); // SyntaxError

// valid syntax
(42).toFixed(3); // "42.000"
0.42.toFixed(3); // "0.420"
42..toFixed(3); // "42.000"
```

## Special values

`null` is an empty value, or had a value and doesn't anymore.

`undefined` is a missing value, or hasn't had a value yet.

## Void operator

The expresion `void` voids out any value, so that the result of the expression is always the _undefined_ value.

```js
var a = 23;
console.log(void a); // undefined
```

## Special numbers

Any mathematic operation you perform without both operands being numbers will result in the operation failing and you will get the `NaN` value.
It stands for "not a number", but is more accurate to think of `NaN` as being an invalid number, failed number, or even bad bumber.

The type of `NaN` is number. `NaN` is **not reflexive**, which means is never equal to another `NaN`. The utility `Number.isNaN(..)` will help us.

```js
Number.isNaN(2 * "a"); // true
```

## Special equality

`Object.is(..)` test two values for absolute equality. Shouldn't be used in cases where `==` or `===` are known to be safe. Is for special cases like: `0 === -0` or `NaN`.

## Value versus reference

In JavaScript there are no pointers, and references work a bit diferently. A reference in JS points at a (shared) value, so if you have 10 different references, they are all always distinct references to a single shared value. None of them are references/pointers to each other.

The **type** of the value _solely_ controls whether that value will be assigned by value-copy or by refence-copy.

Simple values (primitives) are _always_ assigned/passed by **value-copy**: null, undefined, string, number, boolean and symbol.

Compound values, objects (including arrays) and functions, always create a copy of the **reference** on assignment or passing.

```js
// value-copy
var a = 2;
var b = a;
b++;
a; // 2
b; // 3

// reference-copy
var c = [1, 2, 3];
var d = c;
d.push(4);
c; // [1, 2, 3, 4]
d; // [1, 2, 3, 4]
```
