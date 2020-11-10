# this

Binding made for each function invocation, based entirely on its call-site.

It's a special identifier keyword that's automatically defined in the scope of every function. Provides a more elegant way of implicitly passing along an object reference.

`this` does not refers, in any way, to the function's lexical scope.
You cannot use a `this` reference to look something up in a lexical scope. It is not possible. There is no bridge.

`this` is not an author-time binding but a runtime binding. It is contextual based on the conditions of the function's invocation. `this` binding has nothing to do with where a function is declared, but has instead everything to do with the manner in which the function is called.

When a function is invoked, an activation record, otherwise known as an **execution context**, is created. One of the properties of this record is the `this` reference, which will be used for the duration of that function's execution.
