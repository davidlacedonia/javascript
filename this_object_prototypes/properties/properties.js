/**
 * Iteration over enumerable properties.
 *
 * C is not enumerable so will not be logged on the for..in loop
 */
(function iteration() {
  var myObject = {
    a: "A",
    b: "B",
  };

  Object.defineProperty(myObject, "c", {
    value: "C",
    enumerable: false,
  });

  console.log(myObject["c"]);
  for (var i in myObject) {
    console.log(i);
  }
})();
