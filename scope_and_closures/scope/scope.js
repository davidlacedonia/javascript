(function compilation() {
  var a = 2;

  function scope() {
    console.log(a);
    var a = 4; // hoisting this to the beggining of scope, with an undefined value
  }

  console.log(a);
  scope();
})();

// LHS: c =, a = 2, b =
// RHS: = foo(2, = a, a +, + b
(function engineScopeConversation() {
  // LHS: find a and assign 2 to it
  function foo(a) {
    // RHS: go get the value of a
    // LHS: find b to assign a
    var b = a;
    return a + b; // RHS: go get the value of a and b
  }

  // LHS: find c to assign foo
  // RHS: go get the value of foo
  var c = foo(2);
})();
