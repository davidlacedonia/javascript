function foo() {
  function bar(a) {
    // this assignments, overwrites the i declared on the for loop
    i = 10;
    console.log(a);
  }

  for (var i = 0; i < 10; i++) {
    bar(i * 2);
  }
}

foo();

// this can be solved, by declareing anothe variable inside of bar
