# Coercion

Converting a value from one type to another is often called 'type casting' when done explicitly, and 'coercion' when done implicitly (forced by the rules of how a value is used).

Type coercion is a runtime conversion for dynamically typed languages.

## toString

For regular objects (unless you specifiy your own) the default `toString()` will return the internal `[[Class]]`, like for instance `[object Object]`.
Arrays have an overriden default toString() that concatenates all of its values.

## toNumber

`true` becomes `1` and `false` becomes `0`. `undefined` becomes `NaN`, but `null` becomes `0`.
Objects will first ve converted to their primitive value equivalent, and the resulting value (if a primitive but not already a number) is coerced to a number.

## toBoolean

JS has actual keywords `true` and `false`. It's a common misconception that the values `1` and `0` are identical to `true`/`false`. You can coerce `1` to `true`, or `0` to `false` (and vice versa).

### Falsy values

Narrow list of values that will coerce to false when coerced to a boolean value:

- `undefined`
- `null`
- `false`
- `+0, -0, and NaN`
- `""`

## Explicit coercion

### String <> Numbers

`String(..)` coerces from any other value to a primitve `string` value.
`Number(..)` coerces from any other value to a primitive `number` value.

Also, there are other ways to explicitly convert these values: `foo.toString()` and `+foo`;

```js
var foo = 23;
var bar = "42";
foo.toString(); // '23'
+bar; // 42
```

### Date to number

Another common use of the unary `+` operator is to coerce a `Date` object into a `number`, because the result is the Unix timestamp.

```js
var foo = +new Date();
+foo; // 1408369986000
```

_note: the `()` set on a constructor call (a function called with `new`) is optional only if there are no arguments to pass_

### Numeric strings

```js
var a = "42";
var b = "42px";

Number(a); // 42
parseInt(a); // 42

Number(b); // NaN
parseInt(b); // 42
```

Parsing a numeric value out of a string is _tolerant_ of non-numeric characters, it just stops parsing left-to-right when encountered. Whereas coercion is not tolerant and fails, resulting in the `NaN` value.

When parsing (`parseInt`), if you pass a non-string, the value you pass will automatically be coerced to a `string` first.

## Boolean

`Boolean(..)` is a en explict way of forcing the 'ToBoolean' coercion.
Just like the `+` unary coerces a value to a number, the unary `!` negate operator explictly coerces a value to a `boolean`. The most common way is to use double-negate operator `!!`, to flip the parity back to the original.

Any of these `ToBoolean` coercions would happen implictly without the `Boolean(..)` or `!!`, if used in a boolean context such as an `if (..)`.
