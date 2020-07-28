# Natives

- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()

They are actually built-in functions.

The result of the constructor form of value creation is an object wrapper around the primitive value. They are subtypes of the object type.

## Boxing wrappers

Primitive values don't have properties or methods, so to access `.length` or `.toString()` you need an object wrapper around the value. Thankfully, JS will automatically **box** (aka wrap) the primitive value to fulfill such accesses.
