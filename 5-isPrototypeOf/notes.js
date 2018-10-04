var dog = {
    fetch: function() {
        console.log('fetch');
    }
};

var myDog = Object.create(dog);
myDog.name = 'Alexis';

var randomDog = Object.create(dog);
randomDog.name = 'Hey';

Object.getPrototypeOf(myDog) === dog //true
Object.getPrototypeOf(randomDog) === dog //true

var defaultObjectPrototype = Object.getPrototypeOf(dog);
Object.getPrototypeOf(defaultObjectPrototype); // null

/////////////////////////////////////////////////////////
function Dog(name) {
    this.name = name;
}

Dog.prototype.fetch = function() {
    console.log('fetch');
}

var testDog = new Dog('test dog');
console.log('this is a test dog', testDog);

myDog = new Dog('Alexis');
randomDog = new Dog('Hey');

Object.getPrototypeOf(myDog) === Dog.prototype;