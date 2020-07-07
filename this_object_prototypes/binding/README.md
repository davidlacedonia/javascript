## Call site

Is the location in code where a function is called, NOT where it's decalred. Is the only thing that matters for _this_ binding.

### Default bingind

Standalone function invocation. Where the funciton is being called.
In _strict mode_ the global object is not eligible of the default binding.

### Implicit binding

Call site has a context object.
When there is a context object for a function reference, the implicit binding rule says that it's that object that should be used for the function call's _this_ binding.

### Implicitly lost

Implicitly bound function loses that binding, which usually means it falls back to the default binding of either the globat object or undefgined, depending on _strict mode_.

A more common case is using callbacks.

### Explicit binding

Using _call_ and _apply_.
They both take, as their first parameter, an object to use for the _this_, and then inboke the funciton with that _this_ specified. Since you are directly stating what you want the this to be, we call it explicit binding.

### Hard binding

Create a function, which internally calls _fn.call(obj)_, thereby forcibly invoking the function with the object binding for _this_. No matter how you later invoke the function, it will always manually invoke _fn_ with _obj_. This binding is both explicit and strong, so we call it hard binding.

Since its such a common pattern, it's provided with a buil-in utiliy as of ES5, _Function.prototype.bind_. Which returns a new function that is hardcoded to call the original funciton with the this context set as you specified
