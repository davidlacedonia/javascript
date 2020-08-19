function foo() {
  return new Promise((resolve, reject) => {
    // promise never resolves
  });
}

function timeoutPromise(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("timeout rejection");
    }, delay);
  });
}

/**
 * Using a timeout promise and Race,
 * to catch if foo() never gets resolved
 */
Promise.race([foo(), timeoutPromise(3000)]).then(
  () => console.log(res),
  (err) => console.log(err)
);
