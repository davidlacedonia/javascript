# Objects

## Syntax

Literal form

```js
var obj = {
  key: "value",
};
```

Constructed form

```js
var obj = new Object();
obj.key = "value";
```

Both result in the exact same sort of object.

## Type

Simple primitives:

- string
- number
- boolean
- null
- undefined
- object

It's a common misstatement that 'everything in JS is an object'.
By contrast, there are a few special object subtypes, which we can refer to as **complex primitives**.

`function` is a subtype of object, is _first class_ in that they are basically just normal objects, and so they can be handled like any other plain object.
Arrays are also a form of objects, with extra behavior.

## Built in objects

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

They are actually just built-in functions, and can be used as a constructor (`new` operator), with the result being a newly constructed object of the subtype in question.

```js
var strPrimitive = "YDKJS";
typeof strPrimitive; // string
strPrimitive instanceof String; // false

var strObject = new String("YDKJS");
typeof strObject; // 'object'
strObject instanceof String; // true
```

To perform opetations on primitives, such as checking its length, accesing its individual character content, etc., a `String` object is required. Luckily the language _automatically coerces_ a string primitive to a String object when necessary.

Objects, Arrays, Functions, and RegExps are all objects regardless of whether the literal or constructed form is used.

## Contents

The contents of an object consist of values stored at specifically named _locations_, which we call properties. This are not actually stored inside the object, is merely an appearance. Which is stored in the container are these property names, which act as pointers (technically references) to where the values are stored.

## Computed property names

In ES6 you can specify an expression, surrounded by a `[]` pair

```js
var prefix = 'foo';
var obj = {
  [prefix + 'bar'] = 'hello';
}
obj[prefix + 'bar']; // hello
```

## Arrays

Arrays are objects, so even though each index is a positive integer, you can also add properties onto the array, and so use it as a plain key/value object. This is a bad idea because arrays have behavior and optimizations specific to their intended use.
Be carefull: if you try to add a property to an array, but the property name looks like a number, it will end up instead as a numeric index, thus modifiying the array contents.

```js
var arr = ["a", "b"];
arr["2"] = "c";
arr.length; // 3
arr[2]; // 'c'
```

## Duplicating objects

`Object.assign(..)` takes a target object as its first parameter, and one or more source objects as its subsequent parameters. It iterates over all the `enumerable`, _owned keys_ on the _source_ object(s) and copies them (via assignment only) to the target. It also returns the target.

```js
var obj = Object.assign({}, myObject);
```
