// IIFE
(function foo() {
  console.log("foo!");
  // foo() // recursion
})();
console.log(foo);

// Anonymus IIFE
(function () {
  console.log("anonymus");
  //canot be called itself
})();
