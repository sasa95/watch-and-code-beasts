function runWithDebugger(myFunction, args) {
  debugger;
  if (Array.isArray(args)) {
    myFunction.apply(null, args);
    return;
  }

  if (typeof args === 'string' || typeof args === 'number') {
    myFunction(args);
    return;
  }

  throw new Error('Second argument of runWithDebugger function has incorrect type. '
    + 'It should be an array, string or number.');
}

function sayHiTo(name) {
  console.log('hi ' + name);
}

function sayFullName(first, last) {
  console.log(first + ' ' + last);
}

function logNumber(number) {
  console.log(number);
}

function addNumbers(x, y) {
  var z = x + y;
  console.log(z);
}

runWithDebugger(sayHiTo, 'sasha'); // => 'hi sasha'
runWithDebugger(sayHiTo, ['gordon']); // => 'hi gordon'
runWithDebugger(sayFullName, ['gordon', 'zhu']); // => 'gordon zhu'
runWithDebugger(logNumber, 100); // => 100
runWithDebugger(addNumbers, [2, 4]); // => 6
runWithDebugger(addNumbers, undefined); // => error
runWithDebugger(addNumbers, null); // => error
runWithDebugger(addNumbers, true); // => error
