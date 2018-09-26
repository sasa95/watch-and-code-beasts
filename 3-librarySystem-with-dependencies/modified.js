(function () {
  var libraryStorage = {};

  function librarySystem(libraryName, dependecies, callback) {
    if (arguments.length > 1) {
      if (Array.isArray(dependecies) && dependecies.length > 0) {
        // do something
        libraryStorage[libraryName] = callback.call(null, libraryStorage[dependecies[0]]);

      } else {
        libraryStorage[libraryName] = callback();
      }
    } else {
      return libraryStorage[libraryName];
    }
  }

  window.librarySystem = librarySystem;
}());

librarySystem('dependency', [], function () {
  return 'loaded dependency';
});

librarySystem('app', ['dependency'], function (dependency) {
  return 'app with ' + dependency;
});

console.log(librarySystem('dependency')); // 'loaded dependency'
console.log(librarySystem('app')); // 'app with loaded dependency'