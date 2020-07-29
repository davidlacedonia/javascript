# Natives

- `String()`
- `Number()`
- `Boolean()`
- `Array()`
- `Object()`
- `Function()`
- `RegExp()`
- `Date()`
- `Error()`
- `Symbol()`

They are actually built-in functions.

The result of the constructor form of value creation is an object wrapper around the primitive value. They are subtypes of the object type.

## Boxing wrappers

Primitive values don't have properties or methods, so to access `.length` or `.toString()` you need an object wrapper around the value. Thankfully, JS will automatically **box** (aka wrap) the primitive value to fulfill such accesses.

## Unboxing

If you have an object wrapper and you want to get the underlying primitive value out, you can use the `valueOf()` method.

```js
var a = new Number(23);
a.valueOf(); // 23
```

Unboxing can also happen implicitly, when using an object wrapper value in a way that requires the primitive values. (**coercion**).

## Natives as constructors

There is no logical reason to use the constucted form on objects, arrays, etc.

The `Date(..)` and `Error(..)` native constructors are much more useful than the other natives, because there is no literal form for either.

The main reason you'd want to create an error object is that it captures the currenct execution stack context into the object. (typically used with `throw`).

## Symbol

Symbols are special 'unique' (not strictly guaranteed) values that can be used as properties objects with little fear of any collision. Primarily designed for special built-in behaviors of ES6.
Can be used as property names, but you cannot set or access the actual value of a symbol.

There are several predefined symbols, such as `Symbol.create`, `Symbol.iterator`, etc.
And they can be created.

```js
var mysym = Symbol("my own symbol");
var a = {};
a[mysym] = "foobar";
```

Using them for private or special properties is likely their primary use case.

## Native prototypes

Each of the built-in native constructors has its own `.prototype` object. This objects contain behavior unique to their particular object subtype. For example, all strin gobjects, and by extension (via boxing) string primitives, have access to default behavior as methods defined on the `String.prototype` object. Such as, `indexOf(..)`, `charAt(..)`, etc.

## Prototypes as defaults

`Function.prototype` being an empty function, `RegExp.prototype` being an empty regex, and `Array.prototype` being an empty array make them all nice default values to assign to variables if those variables wouldn't already have had a value of the proper type.

One minor side benefit of this approach is that the .prototypes are already created and built-in.
Be careful not to use `Array.prototype` as a default value that will subsequently be modified.
