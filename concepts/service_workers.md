# Service worker

A service worker is a type of web worker. It's essentially a JavaScript file that runs separately from the main browser thread, intercepting network requests, caching or retrieving resources from the cache, and delivering push messages

Service workers run independent of the application and so are not blocking.

Can receive push messages from a server when the app is not active. This lets your app show push notifications to the user, even when it is not open in the browser.

Can't access the DOM directly, to communicate it uses `postMessage()`

Is a programmable network proxy that lets you control how network requests from your page are handled.

Service workers enable applications to control network requests, cache those requests to improve performance, and provide offline access to cached content.

Helps by improving performance by caching resources, and making your app 'offline first'.

- Notifications API

- Push API

- Background Sync API

  Lets you defer actions until the user has stable connectivity.

- Channel messaging API
