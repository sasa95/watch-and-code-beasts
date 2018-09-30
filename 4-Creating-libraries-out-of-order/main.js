(function () {
  var libraryStorage = {};
  var librariesOnHold = [];

  function librarySystem(libraryName, dependecies, callback) {
    if (arguments.length > 1) {
      if (Array.isArray(dependecies)) {
        // If there are some dependencies provided
        if (dependecies.length) {
          var dependeciesExist = true;
          dependeciesExist = dependecies.some(function(element) {
            return libraryStorage[element] === false
          });

          var libs = [];
          if (dependeciesExist) {
            libs = dependecies.map(function(element) {
              return libraryStorage[element]
            });

            libraryStorage[libraryName] = callback.apply(null, libs);
          } else {
            librariesOnHold.push({library: {libraryName: libraryName, dependecies: dependecies, callback: callback}});
          }

        } else {
          // If there are no dependencies provided
          libraryStorage[libraryName] = callback();
        }




      } else {
        throw new Error('Second argument of librarySystem function should be an array.')
      }
    } else {
      var createLib = false;
      var libToCreate = null;

      createLib = librariesOnHold.some(function(element) {
        if (element.library.libraryName === libraryName) {
          libToCreate = element.library;
          return true;
        }
      });

      if (!createLib) {
        return libraryStorage[libraryName];
      } else {
        var deps = libToCreate.dependecies.map(function(element) {
          return libraryStorage[element]
        });

        libraryStorage[libraryName] = libToCreate.callback.apply(null, deps);
        return libraryStorage[libraryName];
      }

    }
  }
  window.librarySystem = librarySystem;
}());




librarySystem('name', [], function () {
  return 'Gordon';
});

librarySystem('company', [], function () {
  return 'Watch and Code';
});

librarySystem('workBlurb', ['name', 'company'], function (name, company) {
  return name + ' works at ' + company;
}); 

debugger;
console.log(librarySystem('workBlurb')); // 'Gordon works at Watch and Code'
