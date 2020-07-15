# Class

## JavaScript classes

Classes are just one of several common design patterns.
Classes we have in JS are just syntactic sugar, and can be a bit different from classes in other languages.
It's an **optional** pattern in software design, and we have the choice to use them or not.

There are no "classes" in JavaScript to instantiate, only objects. And objects don't get copied to other objects, they get linked together. When faking inheritance, functions cannot really be duplicated, so what you end up with instead is a duplicated reference to the same shared function object. If you modify one of the shared function objects, both would be affected via the shared reference.