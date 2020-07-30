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

Narrow list of values that will coerce to false when coercerd to a boolean value:

- `undefined`
- `null`
- `false`
- `+0, -0, and NaN`
- `""`
