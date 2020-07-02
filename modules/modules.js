/**
 * Module
 */
function coolModule() {
  var something = "cool";

  function doSomething() {
    console.log(something);
  }

  return { doSomething }; // exposing doSomething
}

var api = coolModule();
api.doSomething();

/**
 * Singleton module
 */
var singleton = (function singletonModule() {
  var another = "another";
  function doAnother() {
    console.log(another);
  }
  return { doAnother };
})();
singleton.doAnother();
