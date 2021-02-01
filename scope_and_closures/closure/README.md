# Closure

Closure happen as a result of writing code that relies on lexical scope.

Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

Closure lets the function continue to access the lexical scope it was defined in at author time.

Whatever facility we use to transport an inner function outside of its lexical scope, it will maintain a scope reference to where it was originaly declared, and wherever we execute him, that closure will be exercised.

```js
function foo() {
  var protectedValue = "inner";
  function bar() {
    console.log(protectedValue);
  }
  return bar;
}

const bar = foo();
bar(); // inner
```

Whenever and wherever you treat functions as first-class values and pass them around, you are likely to see those functions exercising closure.

## let

let essentially turns a block scope into a scope that we can close over.
