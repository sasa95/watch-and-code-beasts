(function () {
  var libraryStorage = {};
  var librariesOnHold = [];

  function librarySystem(libraryName, dependecies, callback) {
    if (arguments.length > 1) {
      if (Array.isArray(dependecies)) {
        if (dependecies.length) {
          var dependeciesMissing = false;
          dependeciesMissing = dependecies.some(function (element) {
            return libraryStorage[element] === undefined;
          });

          if (dependeciesMissing) {
            librariesOnHold.push({ libraryName: libraryName, dependecies: dependecies, callback: callback });
          } else {
            var libs = dependecies.map(function (element) {
              return libraryStorage[element]
            });
            libraryStorage[libraryName] = callback.apply(null, libs);
          }
        } else {
          libraryStorage[libraryName] = callback();
        }
      } else {
        throw new Error('Second argument of librarySystem function should be an array.')
      }
    } else {
      if (librariesOnHold.length > 0) {
        var createLib = false;
        var libToCreate = null;
  
        createLib = librariesOnHold.some(function (element, index) {
          if (element.libraryName === libraryName) {
            libToCreate = element;
            librariesOnHold.splice(index, 1);
            return true;
          }
        });
        var depsMissing = 0;
        if (createLib) {
          var deps = libToCreate.dependecies.map(function (element) {
            if (!libraryStorage[element]) {
              depsMissing ++;
            }
            return libraryStorage[element]
          });
          
          if (depsMissing) {
            libraryStorage[libraryName] = undefined;
          } else {
            libraryStorage[libraryName] = libToCreate.callback.apply(null, deps);
          }
        }
      }
      return libraryStorage[libraryName];
    }
  }
  window.librarySystem = librarySystem;
}());
