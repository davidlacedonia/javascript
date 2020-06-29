// IIFE
(function foo() {
  console.log("foo!");
  // foo() // recursion
})();

// Anonymus IIFE
(function () {
  console.log("anonymys");
  //canot be called itself
})();
