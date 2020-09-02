# Performance

User perception of performance is every bit -- if not more! -- as important as actual measurable performance.

## Web workers

JavaScript does not currently have any features that support threaded execution. But an environment like your browser can easily provice multiple instances of the JavaScript engine, eachon its own thread, and let you run a different program in each thread. Each of those separate threaded pieces of your program is called a **Web worker**. This type of parallelism is called "task parallelism", as the emphasis is on splitting up cunks of your program to run in parallel.

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
