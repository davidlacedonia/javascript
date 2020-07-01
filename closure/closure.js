/**
 * bar has lexical scope access to the inner of foo (closure)
 */
function foo() {
  var inner = "inner";

  function bar() {
    console.log(inner);
  }

  return bar;
}

const bar = foo();
bar();

/**
 * Loop will print 5 times the number 5
 * because the lexical scope of timeout, access the same i variable
 */
function loop() {
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}
loop();

/**
 * Solving the timeout problem, creating a new closure
 * which holds the desired value of i
 */
function closuredLoop() {
  for (var i = 0; i < 5; i++) {
    (function iife() {
      var j = i; // creating a variable j only for this scope iteration
      setTimeout(() => {
        console.log(j);
      }, i * 1000);
    })();
  }
}
closuredLoop();

/**
 * Solving the timeout problem, using let (block scoped)
 */
function letLoop() {
  for (let i = 6; i < 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}
letLoop();
