# Performance

User perception of performance is every bit -- if not more! -- as important as actual measurable performance.

## Web workers

JavaScript does not currently have any features that support threaded execution. But an environment like your browser can easily provide multiple instances of the JavaScript engine, each on its own thread, and let you run a different program in each thread. Each of those separate threaded pieces of your program is called a **Web worker**. This type of parallelism is called "task parallelism", as the emphasis is on splitting up chunks of your program to run in parallel.

```js
w1 = new Worker("http://..");
```

The URL should point to the location of a JS file (not an HTML page!) which is intended to be loaded into a Worker. The browser will then spin up a separate thread and let that file run as an independent program in that thread.

Workers do not share any scope or resources with each other or the main program -- that would bring all the nightmares of threaded programming to the forefront -- but instead have a basic event messaging mechanism connecting them.

```js
w1.addEventListener("message", fn);
w1.postMessage("something cool to say");
```

To kill a Worker immediately from the program that created it, call `terminate()` on the Worker object.

## Worker environment

Inside the Worker, you do not have access to any of the main program's resources. That means you cannot access any of its global variables, nor can you access the page's DOM or other resources. Remember: it's a totally separate thread.

Some common uses for web workers:

- Processing intensive math calculations
- Sorting large data sets
- Data operations (compression, audio analysis, image pixel manipulations, etc).
- High traffic network communication

## Data transfer

In the early days of Workers, serializing all data to a string value was the only option. Thankfully, if you pass an object, so-called **"Structured cloning algorithm"**, is used to copy/duplicate the object on the other side.

An even better option, is **"Transferable Objects"**, in which the object's "ownership" is transferred, but the data itself is not moved. Any data structure that implements the Transferable interface will automatically be transferred this way.

## Shared workers

Creating a single centralized Worker that all the page instances of your site or app can share is quite usefull.

```js
var w1 = new SharedWorker("..");
```

Because a shared Worker can be connected to or from more than one program instance or page on your site, the Worker needs a way to know which program a message comes from.

```js
w1.port.addEventListener("message", handleMessages);
//
w1.port.postMessage("something cool");
```

Also the port connection must be initialized, as `w1.port.start()`

## asm.js

"asm.js" is a label for a highly optimizable subset of the JavaScript language. By carefully avoiding mechanims and patterns that are hard to optimize (garbage collection, coercion, etc.), ams.js-style code can be recognized by the JS engine and given special attention with aggressive low-level optimizations.
