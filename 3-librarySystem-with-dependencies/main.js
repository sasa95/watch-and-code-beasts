(function () {
  var libraryStorage = {};

  function librarySystem(libraryName, callback) {
    if (arguments.length > 1) {
      libraryStorage[libraryName] = callback();
    } else {
      return libraryStorage[libraryName];
    }
  }

  window.librarySystem = librarySystem;
}());

librarySystem('app', function() {
  return 'app';
});

console.log(librarySystem('app')); // 'app'
