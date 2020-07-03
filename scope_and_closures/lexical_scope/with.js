function foo(obj) {
  with (obj) {
    a = 2;
  }
}

var o1 = {
  a: 3,
};

var o2 = {
  b: 3,
};

foo(o1); // reassings a, with the value 2
console.log(o1.a); // 2

// as 'a' its not found on the o2 scope, LHS ocurred
// not finding the a variable, and creating it on the global object (window.a)
foo(o2);
console.log(o2.a); // undefined
console.log(a); // 2 Oops, leaked global!
