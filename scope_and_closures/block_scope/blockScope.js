for (var i = 5; i < 10; i++) {
  console.log(i);
}
console.log(i); // var i is function scoped
// so is accesible its accesible on the enclosing scope... here

for (let j = 5; j < 10; j++) {
  console.log(j);
}
try {
  console.log(j); // Reference error, let j is block scoped
} catch (err) {
  console.log(err);
}

function foo() {
  var n = 100;
  console.log(n);
}

try {
  console.log(n); // var n is function scoped, so its not accesible outside of foo
} catch (err) {
  console.log(err);
}
