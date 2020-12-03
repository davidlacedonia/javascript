# Async flow control

## Promises

Promises provide a trustable intermediary to manage callbacks. Is an event listener.
Promises can be chained together. A Promise is a _future value_. A promise can only have one of two possible resolution outcomes: _fulfilled_ or _rejected_, with an optional single value.

### Making and using promises

```js
var p = new Promise(function (resolve, reject) {
  // ...
});
```

If you call `resolve(..)` and pass another promise, this promise simply adopts the state.

### Thenables

There are Promise-like objects which, generally, can interoperate with the Promise mechanisms, called _thenables_. Any object with a `then(..)` function on it is assumed to be a thenable.

### Promise API

`Promise.resolve(..)` creates a promise resolved to the value passed in.

```js
var p1 = new Promise.resolve(42);
```

Any value that you are not already certain is a trustable Promise -- even if it could be an immediate value -- can be normilized by passing it to `Promise.resolve(..)`.

`Promise.reject(..)` creates an immediately rejected promise.

`Promise.all([..])` reeturns a promise back which will be fulfilled if all the values fulfill, or reject immediately once the first, of any of them, rejects.

`Promise.race([..])` waits only for either the first fulfillment or rejection.

## Maps

Objects are the primary mechanism for creating unordered key/value-pair data structures, otherwise known as maps. However, the major drawback with objects-as-maps is the inability to use a non-string value as the key.

```js
var m = new Map();
var x = { id: 1 },
  y = { id: 2 };

m.set(x, "foo");
m.set(y, "bar");

m.get(x); // "foo"
m.get(y); // "bar"
```

You can't use the `[]` bracket access syntax for setting and retrieving values. But `get(..)` and `set(..)` work.

To delete an element use the `delete(..)` method.
You can clear an entire map's content with `clear()`.
To get the length of a map use the `size` property (not length).

The `Map(..)` constructor can also receive an iterable.

```js
var m2 = new Map(m.entries());
```

### Map values

To get the list of values from a map, use `values(..)`, which returns an iterator.

```js
var vals = [...m.values()];
```

To determine if a value exists in a map, use the `includes(..)` method.

### Map keys

To get the list of keys, use `keys()`, which returns an iterator over the keys in the map.
To determine if a map has a given key, use `has(..)`.

```js
map.has(key);
```

## WeakMaps

Weakmaps are a variation on Maps, which has most of the same external behavior but differs underneath in how the memory allocation (specifically its GC) works.

WeakMaps take (only) objects as keys. Those objects are _heald weakly_, which means if the object itself is GC'd, the entry in the WeakMap is also removed.

The API for WeakMap is similar, though limited. WeakMaps do not have a `size` property or `clear()` method, nor do they expose any iterators over their keys, values, or entries.
It's important to note that a WeakMap only holds its keys weakly, not its values.

```js
var s = new WeakMap();

var x = { id: 1 },
  y = { id: 2 };

m.set(x, "foo");
m.has(x); // true
```

## Sets

A Set is an a collection of unique values (duplicates are ignored).
The API for a set is mostly identical to map. The `add(..)` method takes places of the `set(..)` method, and there is no `get(..)` method. To test if a value is present, use `has(..)`.

```js
var s = new Set();

var x = { id: 1 },
  y = { id: 2 };

s.add(x).add(y);

s.size; // 2
s.has(y); // true
s.clear();
s.size(); // 0
```

Whereas a WeakMap holds its keys weakly, a WeakSet holds its values weakly.

```js
var s = new WeakSet();
```
