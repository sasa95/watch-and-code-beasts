(function () {
  var libraryStorage = {};

  function librarySystem(libraryName, dependecies, callback) {
    if (arguments.length > 1) {
      if (Array.isArray(dependecies)) {
        if (dependecies.length) {
          var libs = dependecies.map(function (element) {
            return libraryStorage[element]
          })
          libraryStorage[libraryName] = callback.apply(null, libs);
        } else {
          libraryStorage[libraryName] = callback();
        }
      } else {
        throw new Error('Second argument of librarySystem function should be an array.')
      }
    } else {
      return libraryStorage[libraryName];
    }
  }
  window.librarySystem = librarySystem;
}());

// Test 1
librarySystem('dependency', [], function () {
  return 'loaded dependency';
});

librarySystem('app', ['dependency'], function (dependency) {
  return 'app with ' + dependency;
});

console.log(librarySystem('app')); // 'app with loaded dependency'

// Test 2
librarySystem('name', [], function () {
  return 'Gordon';
});

librarySystem('company', [], function () {
  return 'Watch and Code';
});

librarySystem('workBlurb', ['name', 'company'], function (name, company) {
  return name + ' works at ' + company;
});

console.log(librarySystem('workBlurb')); // 'Gordon works at Watch and Code'
