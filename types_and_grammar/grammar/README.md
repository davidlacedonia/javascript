# Grammar

## Expression side effects

The `++` increment operator and the `--` decrement operator are both unary operators, which can be used in either postfix position or prefix position.

```js
var a = 42;

a++; // 42
a; // 43

++a; // 44
a; // 44
```

When `++a` is used in the prefix position, its side effect happens _before_ the value is returned from the expression, rather than after as with `a++`.

## Contextual rules

### else if and optional blocks

There is a hidden characteristic of the JS grammar: there is no `else if`.

```js
if (a) {
  // ...
} else if (b) {
  // ...
}
```

Is actually parsed as:

```js
if (a) {
  // ...
} else {
  if (b) {
    // ...
  }
}
```

`if` and `else` statements are allowed to omit the `{}` around their attached block if they only contain a single statement.

```js
if (a) doSomething(a);
```

## Operator precedence

`,` has the lowest precedence, every other operator will more tightly bind than `,` will.

```js
var a = 42;
var b;

b = a++, a;
a; // 43;
b; // 42
```

`&&` has higher precedence than `=`. `&&` is evaluated first and then `||`.

```js
true || false && false; // true
false && true || true; // true
```

`&&` is more precedent than `||`, and `||` is more precedent than `? :`.

```js
a && b || c ? c || b ? a : c && b : a;
```

Behaves like this:

```js
(a && b || c) ? (c || b) ? a : (c && b) : a;
```

## Associativity

```js
var a = foo() && bar();
```

This behavior is just left-to-right processing (the default behavior in JavaScript), it has nothing to do with associativity, since there is only one `&&` and thus no relevant grouping, associativity doesn't even come into play.

```js
a && b && c;
```

Will be handled as `(a && b) && c`, because `&&` is left-associative (so is `||`).

Right associativity does not mean right-to-left evaluation, it means right-to-left _grouping_.

`? :` is rigth associative, so `a ? b : c ? d : e` becomes `a ? b : (c ? d : e)`.

Another example of right associativity is the `=` operator.

```js
var a, b, c;
a = b = c = 42;
```

This is processed by first evaluating `c = 42`, then `b = ...`, and finally `a = ...`.

## ASI

Automatic Semicolon Insertion is when JavaScript assumes a `;` in certain places in your JS program even if yoy didn't put one there.

It's important to note that ASI will only take effect in the presence of a newline (aka line break). Semicolons are not inserted in the middle of a line. Only if there's nothing but a whitespace between the end of some statement and that line's newline/line break.

## Error correction

ASI is an error correction routine. A parser error, in an attempt to have the parser fail less, ASI lets it be more tolerant.

### Errors

The target of an assignment must be an identifier.

```js
var a;
42 = a; // Error
```

Function parameter names cannot be duplicated.

```js
function bar (a, b, a) { ... } // Error
```

An object literal having more than one property of the same name

```js
var a = {
  b: 42,
  b: 43,
}; // Error
```