# Functional programming

- clean code
- syntactic efficiency
- abstract
- reduction of errors

## Pure function

Always returns same results with same params
Does not change parameters, prevents side effects

## Pure ES6

- map
  Loops through elements, creating a new array, and not modifying the original one.

```js
const add = (item) => item + 1;
arr.map(add);
```

- reducer

```js
const add = (item) => item + 1;
arr.reduce(add, 0);
```
