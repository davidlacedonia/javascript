/**
 * Missconception of _this_ mechanism.
 */
(function this_1() {
  var count = 0;
  function foo() {
    console.log(this.count);
    this.count++; // points to a global variable, and not the function itself
  }

  for (var i = 0; i < 5; i++) {
    foo();
  }

  console.log(count);
})();

/**
 * Proper use of _this_.
 *
 * Using the mechanism _call_
 * _call_ can be used to invoke a method with an owner
 * object as an argument (parameter)
 */
(function this_2() {
  var data = {
    count: 0,
  };

  function foo() {
    console.log(this.count);
    this.count++;
  }

  for (var i = 0; i < 5; i++) {
    foo.call(data); // _call_ ensures _this_ points at the object _data_
  }
})();
