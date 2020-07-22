# Introspection

Inspecting an instance to find out what kind of object it is.

The primary goal of type instrospection with class instances is to reason about the structure/capabilities of the object based on how it was created.

## Duck typing

"If it looks like a duck, and it quacks like a duck, it must be a duck."

```js
if (a1.something) {
  a1.something();
}
```

_You should only use this approach on controlled conditons._

## Is prototype of

OLOO approach:

```js
Foo.isPrototypeOf(Bar); // true
Object.getPrototypeOf(Bar) === Foo; // true
```
