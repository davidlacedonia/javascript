var Foo = {
  hello() {
    console.log("hello");
  },
};

var f1 = Object.create(Foo);
Foo.isPrototypeOf(f1); // true
Object.getPrototypeOf(f1) === Foo; // true

f2 = Object.create(f1);
Foo.isPrototypeOf(f2); // true (on prototype chain)
Object.getPrototypeOf(f2) === Foo; // false (protoype is f1)
