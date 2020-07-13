# Properties

## Descriptors

We can use `Object.defineProperty()` to add a new property, or modify an existing one.

```js
Object.defineProperty(myObject, "a", {
  value: 2,
  writable: false,
  configurable: true,
  enumerable: true,
});
```

### Writable

The ability for you to change the value of a property is controlled by _writable_.
Modifications on the value will silently fail. In _stric mode_ would throw a _TypeError_.

### Configurable

When false, prevents changes using `Object.defineProperty(..)`.
Throws _TypeError_ when trying to change the descriptor definition of a nonconfigurable property.
Also prevents the ability to use the _delete_ operator to remove an existing property.

### Enumerable

Controls whether a property will show up in certain object-property enumerations, such as the _for..in_ loop. Set _enumerable_ to _false_ to keep the property from showing up in such enumerations, even though it's still completly accessible.

_NOTE:_ Its important to note that all of these approaches create a shallow immutability. That is, they affect only the object and its direct property characteristics. If an object has a reference to another object (array, object, function, etc.), the _contents_ of that object are not affected and remain mutable.

By combining _writable: false_ and _configurable: false_ you can essentially create a **constant**. Cannot be changed, redefined or deleted.

### Prevent extensions

To prevent an object from having new properties added to it, call `Object.preventExtensions(..)`

### Seal

Takes an oject and essentially calls _Object.preventExtensions(..)_ on it, but also marks all its existing properties as _configurable:false_. You cannot add any more properties, but yo also cannot reconfigure or delete any existing properties (though you can still modify their values).

### Freeze

Creates a frozen object, which means it takes an exiting object and essentially calls `Object.seal(..)` on it, but also marks all data accessor' properties as _writable: false_, so that their values cannot be changed.

## Getters and setters

Getters are properties that actually call a hidden function to retrieve a value. Setters are properties that actually call a hidden function to set a value.
When you define a property to have either a getter or a setter or both, its definition becomes an "accessor descriptor". For accesor descriptors, the value and writable characteristics of the descriptor are moot and ignored.

```js
  var myObject = {
    get a() {
      return this._a_;
    }

    set a() {
      this._a_ = val * 2;
    }
  }

  myObject.a = 2;
  myObject.a; // 4
```

## Existence

We can ask an object if it has a certain property without asking to get that properties value.

`("a" in myObject); // true`
`myObject.hasOwnProperty('a'); // true`

The _in_ operator will check to see if the propery is in the object, or if it exists at any higher level of the ProtoType chain object traversal. By contrast, _hasOwnProperty(..)_ checks to see if only myObject has the property or not.

## Enumeration

_Enumerable_ basically means 'will be included if the object's properties are iterated through'

_propertyIsEnumarable(..)_ test whether the given property name exists directly on the object and is also _enumarable:true_.
_Object.keys(..)_ returns an array of all enumarable properties, whereas _Object.getOwnPropertyNames(..)_ returns an array of all properties, enumerable or not.

## Iteration

The _for..in_ loop iterates over the list of enumerable properties on an object.

To iterate over the values ES5 added several helpers:
_forEach(..)_ will iterate over all values in the array, and it ignores any callback return values. _every(..)_ keeps going until the end or the callback returns a _false_ value, whereas _some(..)_ keeps going until the end or the callback returns a _true_ value.

ES6 adds a _for..of_ loop syntax for iterating over arrays.

```js
for (var v of myArray) { .. }
```

The _for..of_ loop asks for an iterator object, and then iterates over the successive return values from calling that iterator object's _next()_ method, once for each loop iteration.
