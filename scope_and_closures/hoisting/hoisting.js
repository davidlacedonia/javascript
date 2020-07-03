{
  a = 2;
  var a; // hoisted to the top
  console.log(a);

  /**
   * Translates to
   *
   * var a;
   * a = 2;
   * console.log(a) // 2
   */
}

{
  console.log(b);
  var b = 2; // hoists declaration to the top, but the assignment happens later

  /**
   * Translates to
   *
   * var b;
   * console.log(b) // undefined
   * b = 2;
   */
}

{
  foo();

  // var foo;
  // this is a syntax error because the function declaration is hoisted first
  // so in strict mode duplicate declarations throw the error
  // SyntaxError: Identifier 'foo' has already been declared

  function foo() {
    console.log(1);
  }

  foo = function () {
    console.log(2);
  };
}

{
  foo(); // b

  function foo() {
    console.log('a');
  }

  function foo() {
    console.log('b');
  }

  // subsequent function declarations override previous ones.
}
