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