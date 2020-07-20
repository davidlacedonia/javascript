# Prototypes

## [[Prototype]]

An internal property that objects have, which is simply a reference to another object.

The default _[[Get]]_ operation proceeds to follow the _[[Prototype]]_ link of the object if it cannot find the requested property on the object directly.

```js
var anotherObject = {
  a: 2,
};

var myObject = Object.create(anotherObject);
myObject.a; // 2
```

At the top of every normal [[Prototype]] chain is the built-in _Object.prototype_. All normal objects in JavaScript "descend from" the _Object.prototype_ object.

## Class functions

In JavaScript you don't create multiple instances of a class. You can create multiple objects that are _[[Prototype]]-linked_ to a common object. But by defaut, no copying occurs, and thus these objects don't end up totally separate and disconnected from each other, but rather, quite linked.

JavaScript creates a link between two objects, where one object can essentially _delegate_ property/functions access to another object. **Delegation** is a much more accurate term for JavaScript's object-linking mechanism.

## Constructor

Functions themselves are not constructors. However, when you put the _new_ keyword in front of a normal function call, that makes that function call a 'constructor call'. In fact, _new_ sort of hijacks any normal function and calls it in a fashion that constructs an object, in adition to whatever else it was going to do.

```js
function nothingSpecial() {
  console.log("nothing special");
}

var a = new nothingSpecial(); // nothing special
a; // {}
```

## Prototypal inheritance

ES6 adds a _Object.setPrototypeOf(..)_ helper utiliy, which does the trick in a standar and predictable way.

_Object.create_ creates a "new" object out of thin air, and links that new object's internal **[[Prototype]]** to the object you specify.

```js
// pre ES6
Bar.prototype = Object.create(Foo.prototype);

// ES6+
Object.setPrototypeOf(Bar.prototype, Foo.prototype);
```

## Inspecting 'class' relationships

The **instanceof** operator takes a plain object as its lefthand operand and a funtion as its righthand operand. The question _instanceof_ answers is: in the entire _[[Prototype]]_ chain of _a_, does the object arbitrarily pointed to by _Foo.prototype_ ever appear?

```js
a instanceof Foo;
```

The second and much cleaner approach to _[[Prototype]]_ reflection is:

```js
Foo.prototype.isPrototypeOf(a);
```

We can also directly retrieve the _[[Prototype]]_ of an object.

```js
Object.getPrototypeOf(a);
```

## Object links

The _[[Prototype]]_ mechanisms is an internal link that exists on one object that references some other object.
This linkage is exercised when a property/method reference is made against the first object, and no such property/method exists. In that case, the _[[Prototype]]_ linkage tells the engine to look for the property/method on the linked-to object. In turn, if that object cannot fulfill the lookup, its _[[Prototype]]_ is followed, and so on. This series of links between objects forms what is called the 'prototype chain'

### Creating links

`Object.create(..)` creates a new object linked to the object we specified, which gives us all the power (delegation) of the _[[Prototype]]_ mechanisms.

We don't need classes to create meaningful relationships between two objects.
