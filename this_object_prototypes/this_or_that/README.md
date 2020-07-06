# THIS

It's a special identifier keyword that's automatically defined in the scope of every function. Provides a more elegant way of implicitly passing along an object reference.

_this_ does not refers, in any way, to the function's lexical scope.
You cannot use a _this_ reference to look something up in a lexical scope. It is not possible. There is no bridge.

_this_ is not an author-time binding but a runtime binding. It is contextual based on the conditions of the function's invocation. _this_ binding has nothing to do with where a function is declared, but has instead everything to do with the manner in which the function is called.
When a function is invoked, an activation record, otherwise known as an **execution context**, is created. One of the properties of this record is the _this_ reference, which will be used for the duration of that function's execution.
