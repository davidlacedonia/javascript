# Coercion

Converting a value from one type to another is often called 'type casting' when done explicitly, and 'coercion' when done implicitly (_forced by the rules of how a value is used_).

Type coercion is a runtime conversion for dynamically typed languages.

## toString

For regular objects (unless you specifiy your own) the default `toString()` will return the internal `[[Class]]`, like for instance `[object Object]`.
Arrays have an overriden default toString() that concatenates all of its values.

```js
let a = {};
let b = [1, 2];
a.toString(); // [object Object]
b.toString(); // "1,2"
```

## toNumber

`true` becomes `1` and `false` becomes `0`. `undefined` becomes `NaN`, but `null` becomes `0`.
Objects will first be converted to their primitive value equivalent, and the resulting value (if a primitive but not already a number) is coerced to a number.

## toBoolean

JS has actual keywords `true` and `false`. It's a common misconception that the values `1` and `0` are identical to `true`/`false`. You can coerce `1` to `true`, or `0` to `false` (and vice versa).

```js
1 == true; // true
```

### Falsy values

Narrow list of values that will coerce to false when coerced to a boolean value:

- `undefined`
- `null`
- `false`
- `+0, -0, and NaN`
- `""`

## Explicit coercion

### String <-> Numbers

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

When parsing `parseInt`, if you pass a non-string, the value you pass will automatically be coerced to a `string` first.

### Boolean

`Boolean(..)` is an explict way of forcing the 'ToBoolean' coercion.
Just like the `+` unary coerces a value to a number, the unary `!` negate operator explictly coerces a value to a `boolean`. The most common way is to use double-negate operator `!!`, to flip the parity back to the original.

Any of these `ToBoolean` coercions would happen implictly without the `Boolean(..)` or `!!`, if used in a boolean context such as an `if (..)`.

## Implicit coercion

Refers to type of conversions that are hidden, that implicitly ocucur from other actions.

_Goal_: reduce verbosity, boilerplate, and/or unnecessery implementation details that clutters up on our code with noise that distracts from the more important intent.

### Strings <-> Numbers

The `+` algorithm will concatenate if either operand is either already a `string`, or if the following steps produce a `string` representation. It first calls the `ToPrimitive` abstract operation on the value, which then calls the `[[DefaultValue]]` algorithm.
The `valueOf()` operation on the `array` will fail to produce a simple primitive, so it then falls to a `toString()` representation.

The `-` is defined only for numeric substraction, so `a - 0` forces `a`'s values to be coerced to a `number`. While far less common, `a * 1` or `a / 1` would accomplish the same result, as those operators are also only defined for numeric operations.

### Boolean

What sort of expressions require/force (implicitly) a `boolean` coercion?

1. The test expression in a `if (..)` statement.
2. The second clause in a `for (..; ..; ..)` header.
3. The test expression in a `while(..)` and `do..while(..)` loops.
4. The test expression (first clause) in `? :` ternary expressions.
5. The lefthand operand on the `||` and `&&` operators.

## Operators || and &&

They don't actually result in a _logic_ value (aka `boolean`). They result in the value of one (and only one) of their two operands.

```js
var a = 42;
var b = "abc";
var c = null;

a || b; // 42
a && b; // 'abc'

c || b; // 'abc'
c && b; // null
```

Both performs and `boolean` test on the first operand. If the operand is not already `boolean`, a normal `ToBoolean` coercion occurs. For the `||` if `true`, the expression results in the value of the first operand. If the test is `false`, results in the second operand. Inversely, for the `&&` operand, if `true`, results in the value of the second operand. And if `false`, results in the value of the first operand.

## Lose equals == vs strict equals ===

`==` allows coercion in the equality comparision and `===` disallows coercion.
If you are comparing values of different types, ask yourself, when comparing these two values, do I want coercion or not?

When using `==` on different types, one or both of the values will need to be implictly coerced.

### string to numbers

If type `x` is `Number`, and type `y` is `String`, return the result of the comparision `x = ToNumber(y)`.
If type `x` is `String`, and type `y` is `Number`, return the result of the comparision `ToNumber(x) = y`.

```js
var a = 42;
var b = "42";

a === b; // false
a == b; // true
```

### anything to boolean

If type `x` is `Boolean`, return the result of the comparision `ToNumber(x) === y`.
If type `y` is `Boolean` return the result of the comparision `x == ToNymber(y)`.

```js
var x = true;
var y = "42";

x == y; // false
```

`ToNumber(true)` is parsed to `1`. `1 == '42'` so, then `'42'` is parsed to `42`. And `1 == 42` is false.

**Never, ever**, under any circumstances, use `== true` or `== false`. Ever.

### nulls to undefineds

`null` and `undefined`, when compared with `==` lose equality, equate to each other, and no other values on the entire language.

```js
var a = null;
var b;

a == b; // true
a == null; // true
b == null; // true

if (a == null) { ... }
```

### objects to nonobjects

If type `x` is either `String` or `Number` and type `y` is `Object`, return the result of the comparision `x = ToPrimitive(y)`.
If type `x` is `Object` and type `y` is either `String` or `Number`, return the result of the comparision `ToPrimitive(x) = y`.

```js
var a = 42;
var b = [42];

a == b; // true
```

## safely using implict coercion

If either side of the comparision can have `true` or `false` values, don't ever, EVER use `==`.
If either side of the comparision can have `[]`, `''`, or `0` values, seriously consider not using `==`.

## Abstract relational comparision (<, >, <=, =>)

The algorithm first calls `ToPrimitive` coercion on both values, and if the return result of either call is not a `string`, then both values are coerced to `number` values using the `ToNumber` operation rules, and compared numerically.

```js
var a = [42];
var b = ["43"];

a < b; // true
b < a; // false
```

However, if both values are `string`s for the `<` comparision, simple lexicographic comparision on the characters is performed (character by character).

```js
var a = ["42"];
var b = ["043"];

a < b; // false
```
