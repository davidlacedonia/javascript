// "use strict"; // this would prevent eval to modify the enclosing scope

/**
 * Eval.
 */
function foo(str, a) {
  // eval takes the stringified declaration of b, and assignment of 3 to it
  // modifing the lexical scope of foo, and shadowing 'b = 2'
  eval(str);
  console.log(a, b);
}

var b = 2;

foo("var b = 3", 1); // 1, 3
