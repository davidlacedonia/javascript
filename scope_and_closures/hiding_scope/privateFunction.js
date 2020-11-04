function doSomething(a) {
  // hiding doSomethingElse inside the scope of doSomething
  function doSomethingElse(a) {
    return a - 1;
  }

  var b;
  b = a + doSomethingElse(a * 2);
  console.log(b * 3);
}

doSomething(2);
doSomethingElse(1); // ReferenceError

(function () {
  function scope() {
    var hiddenVariable = 123;
    function logHiddenVariable() {
      console.log(hiddenVariable);
    }
    logHiddenVariable();
  }

  scope(); // 123
  console.log(hiddenVariable); // ReferenceError
})();
