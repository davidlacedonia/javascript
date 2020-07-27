# Values

## Arrays

Arrays are numerically indexed, but the tricky thing is that they also are objects that can have string keys/properties added to them.

```js
var a = [];
a[0] = 1;
a["foobar"] = "hey!";
a.length; // 1
a.foobar; // hey!
```

If `slice()` is called without any other paramenters, the default values for its parameters have the effect of duplicating the array.
In ES6 there's also a built-in utility called `Array.from(..)`

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

JavaScript has just one numeric type: **number**. This type includes both 'integer' values and fractional decimal numbers.

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

**null** is an empty value / had a value and doesn't anymore.

**undefined** is a missing value / hasn't had a value yet.

## Void operator

The expresion `void` voids out any value, so that the result of the expression is always the _undefined_ value.

```js
var a = 23;
console.log(void a); // undefined
```

## Special numbers

Any mathematic operation you perform without both operands being numbers will result in the operation failing and you will get the `NaN` value.
It stands for "not a number", but is more accurate to think of NaN as being an invalid number, failed number, or even bad bumber.

The type of NaN is number. NaN is **not reflexive**, which means is never equal to another NaN. The utility `Number.isNaN(..)` will help us.

## Special equality

`Object.is(..)` test two values for absolute equality. Shouldn't be used in cases where `==` or `===` are known to be safe. Is for special cases like: `0 === -0` or `NaN`.
