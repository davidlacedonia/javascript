const getValuesOfObject = (object) => {
  const entries = Object.entries(object);
  return entries.map((entry) => entry[1]);
};

const axis = {
  x: 1,
  y: 0,
  z: 3,
};
const result = getValuesOfObject(axis);
console.log(result);

const reverseString = (string) => string.split("").reverse().join("");
console.log(reverseString("javascript"));

const obj = {
  a: 1,
  b: 2,
  getA() {
    console.log(this.a);
    return this;
  },
  getB() {
    console.log(this.b);
  },
};

obj.getA().getB();

const array = [4, 5];
Array.prototype.print = function () {
  let result = "";
  this.forEach((value, index) => {
    if (index > 0) {
      result = result.concat(", ");
    }
    result = result.concat(value);
  });
  return result;
};
console.log(array.print());
