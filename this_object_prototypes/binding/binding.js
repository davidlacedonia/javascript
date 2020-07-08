/**
 * Default binding.
 *
 * In strict mode the global object is not eligible.
 */
(function defaul() {
  function foo() {
    console.log(this.a);
  }

  var a = 2;
  foo(); // undefined
})();

/**
 * Implicit binding.
 *
 * Call site is obj.
 */
(function implicit() {
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 2,
    foo: foo,
  };

  obj.foo(); //2
})();

/**
 * Implicitly lost.
 *
 * Call site is the eligible global object
 */
(function implicitlyLost() {
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 3,
    foo: foo,
  };

  var bar = obj.foo; // bar is just another reference to foo
  bar(); // undefined
})();

/**
 * Implicitly lost using callbacks.
 */
(function implicitlyLostCb() {
  function foo() {
    console.log(this.a);
  }

  function doFoo(fn) {
    fn();
  }

  var obj = {
    a: 3,
    foo: foo,
  };

  doFoo(obj.foo); // undefined
})();

/**
 * Explicit binding
 */
(function explicit() {
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 4,
  };

  foo.call(obj); // 4
})();

/**
 * Hard binding.
 */
(function hard() {
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 5,
  };

  function bar() {
    foo.call(obj);
  }

  setTimeout(bar, 400); // 5
})();

/**
 * Hard binding using bind
 */
(function hardBind() {
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 5,
  };

  var fn = foo.bind(obj);
  fn(); // 5
})();

/**
 * New binding.
 *
 * The new constructed object is set as the _this_
 */
(function newBinding() {
  function foo(a) {
    this.a = a;
  }

  const bar = new foo(6);
  console.log(bar.a); // 6
})();
