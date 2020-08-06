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
