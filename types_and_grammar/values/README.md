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

JavaScript strings are immutable, wile arrays are quite mutable.
So none of the string methods that alter its content can modify in-place, but rather must create and return new strings.

```js
c = a.toUpperCase();
a === c; //false
a; // 'foo'
c; // 'FOO'
```

## Numbers

JavaScript has just one numeric type: **number**. This type includes both 'integer' values and fractional decimal numbers.

Be carefull with the `.` operator. Since its a valid nuemric character, it will first be interpreted as part of the number literal, if possible, instead of being interpreted as a property accessor.

```js
// invalid syntax
42.toFixed(3); // SyntaxError

// valid syntax
(42).toFixed(3); // "42.000"
0.42.toFixed(3); // "0.420"
42..toFixed(3); // "42.000"
```
