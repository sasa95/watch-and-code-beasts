(function () {
  var libraryStorage = {};
  var librariesOnHold = [];

  function librarySystem(libraryName, dependecies, callback) {
    debugger;
    if (arguments.length > 1) {
      if (Array.isArray(dependecies)) {
        // If there are some dependencies provided
        if (dependecies.length) {
          var dependeciesMissing = false;
          dependeciesMissing = dependecies.some(function(element) {
            return libraryStorage[element] === undefined;
          });

          if (dependeciesMissing) {
            librariesOnHold.push({libraryName: libraryName, dependecies: dependecies, callback: callback});
          } else {
            var libs = dependecies.map(function(element) {
              return libraryStorage[element]
            });
            libraryStorage[libraryName] = callback.apply(null, libs);
            
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

      createLib = librariesOnHold.some(function(element, index) {
        if (element.libraryName === libraryName) {
          libToCreate = element;
          librariesOnHold.splice(index, 1);
          return true;
        }
      });

      if (createLib) {
        var deps = libToCreate.dependecies.map(function(element) {
          return libraryStorage[element]
        });
        libraryStorage[libraryName] = libToCreate.callback.apply(null, deps);
        return libraryStorage[libraryName];
      } else {
        return libraryStorage[libraryName];
      }
    }
  }
  window.librarySystem = librarySystem;
}());


librarySystem('workBlurb', ['name', 'company'], function (name, company) {
  return name + ' works at ' + company;
}); 

librarySystem('name', [], function () {
  return 'Gordon';
});

librarySystem('app', ['dependency'], function(dependency) {
  return 'app with ' + dependency;
});

librarySystem('company', [], function () {
  return 'Watch and Code';
});

librarySystem('dependency', [], function() {
  return 'loaded dependency';
});



console.log(librarySystem('app')); // 'app with loaded dependency'

console.log(librarySystem('workBlurb')); // 'Gordon works at Watch and Code'
